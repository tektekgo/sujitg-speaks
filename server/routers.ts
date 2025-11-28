import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createConversation, getMessagesByConversationId, addMessage, getPortfolioContent, getAllTalks, getTalkById, getAllEvents, createBookingInquiry, getAllBookingInquiries, updateBookingInquiryStatus, getAllTestimonials } from "./db";
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
        
        // Get talks data for speaking context
        const talksData = await getAllTalks();
        const talksContext = talksData.map(t => `Talk: ${t.title} - ${t.subtitle}\nAbstract: ${t.abstract}\nKey Takeaways: ${t.keyTakeaways}\nAudience Fit: ${t.audienceFit}`).join("\n\n");
        
        const conversationHistory = await getMessagesByConversationId(conversationId);
        const messages = conversationHistory.map(m => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));
        messages.push({ role: "user", content: message });
        
        const systemPrompt = `You are an AI assistant representing Sujit Gangadharan, a VP of DevOps & Infrastructure Automation and professional speaker with 30+ years of enterprise technology experience. You specialize in helping organizers find the right talk for their event and answering questions about Sujit's speaking expertise, background, and professional experience.

Speaking Expertise:
${talksContext}

Professional Background:
${portfolioContext}

When asked about booking, speaking engagements, or event planning, provide helpful guidance based on Sujit's talks and experience. Be professional, knowledgeable, and enthusiastic about speaking opportunities.`;
        
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

  talks: router({
    list: publicProcedure.query(async () => {
      return getAllTalks();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getTalkById(input.id);
      }),
  }),

  events: router({
    list: publicProcedure.query(async () => {
      return getAllEvents();
    }),
  }),

  booking: router({
    submit: publicProcedure
      .input(z.object({
        eventName: z.string().min(1, "Event name is required"),
        date: z.string().min(1, "Date is required"),
        format: z.enum(["keynote", "talk", "panel", "workshop"]),
        audience: z.string().min(1, "Audience description is required"),
        budget: z.string().optional(),
        contactEmail: z.string().email("Valid email is required"),
        contactName: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createBookingInquiry({
          eventName: input.eventName,
          date: input.date,
          format: input.format,
          audience: input.audience,
          budget: input.budget,
          contactEmail: input.contactEmail,
          contactName: input.contactName,
          message: input.message,
          status: "pending",
        });
        return { success: true, inquiryId: result[0]?.id };
      }),
    
    list: publicProcedure.query(async () => {
      return getAllBookingInquiries();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getAllBookingInquiries(); // Return all for now (no auth)
      }),
    
    updateStatus: publicProcedure
      .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "declined"]) }))
      .mutation(async ({ input }) => {
        return updateBookingInquiryStatus(input.id, input.status);
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => {
      return getAllTestimonials();
    }),
  }),
});

export type AppRouter = typeof appRouter;
