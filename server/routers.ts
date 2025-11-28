import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createConversation, getMessagesByConversationId, addMessage, getPortfolioContent } from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    createConversation: publicProcedure
      .input(z.object({ title: z.string().optional() }))
      .mutation(async ({ input }) => {
        const title = input.title || "New Conversation";
        // Use a fixed userId (1) for public conversations since we're not tracking users
        return createConversation(1, title);
      }),
    
    getMessages: publicProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        return getMessagesByConversationId(input.conversationId);
      }),
    
    sendMessage: publicProcedure
      .input(z.object({ conversationId: z.number(), message: z.string().min(1, "Message cannot be empty") }))
      .mutation(async ({ input }) => {
        const { conversationId, message } = input;
        
        await addMessage(conversationId, "user", message);
        
        const portfolioData = await getPortfolioContent();
        const portfolioContext = portfolioData.map(p => `${p.section}: ${p.title} - ${p.content}`).join("\n\n");
        
        const conversationHistory = await getMessagesByConversationId(conversationId);
        const messages = conversationHistory.map(m => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));
        messages.push({ role: "user", content: message });
        
        const systemPrompt = `You are an AI assistant representing Sujit Gangadharan, a CIO Candidate and Enterprise Technology Executive with 30+ years of experience. You have access to his portfolio information and should answer questions about his background, expertise, projects, and experience. Be professional, knowledgeable, and helpful.

Portfolio Information:
${portfolioContext}`;
        
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
        });
        
        const messageContent = response.choices[0]?.message?.content;
        const assistantMessage = typeof messageContent === 'string' ? messageContent : "I apologize, but I could not generate a response.";
        await addMessage(conversationId, "assistant", assistantMessage);
        
        return { success: true, message: assistantMessage };
      }),
  }),
});

export type AppRouter = typeof appRouter;
