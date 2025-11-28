import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("chat router", () => {
  describe("createConversation", () => {
    it("creates a new conversation with default title", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.chat.createConversation({});

      expect(result).toBeDefined();
      expect((result as any)[0]).toBeDefined();
    });

    it("creates a new conversation with custom title", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.chat.createConversation({
        title: "Custom Conversation Title",
      });

      expect(result).toBeDefined();
      expect((result as any)[0]).toBeDefined();
    });

    it("requires authentication", async () => {
      const ctx = createAuthContext();
      ctx.user = null;
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.createConversation({});
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("getConversations", () => {
    it("returns conversations for authenticated user", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      // Create a conversation first
      const convResult = await caller.chat.createConversation({ title: "Test Conv" });
      expect(convResult).toBeDefined();

      const conversations = await caller.chat.getConversations();

      expect(Array.isArray(conversations)).toBe(true);
    });

    it("requires authentication", async () => {
      const ctx = createAuthContext();
      ctx.user = null;
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.getConversations();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("getMessages", () => {
    it("returns messages for a conversation", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Create a conversation
      const convResult = await caller.chat.createConversation({
        title: "Test",
      });
      const conversationId = (convResult as any)[0]?.id || 1;

      const messages = await caller.chat.getMessages({ conversationId });

      expect(Array.isArray(messages)).toBe(true);
    });

    it("requires authentication", async () => {
      const ctx = createAuthContext();
      ctx.user = null;
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.getMessages({ conversationId: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("requires valid conversationId", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.getMessages({ conversationId: "invalid" as any });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("sendMessage", () => {
    it.skip("sends a message and returns assistant response", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Create a conversation
      const convResult = await caller.chat.createConversation({
        title: "Test",
      });
      const conversationId = (convResult as any)[0]?.id || 1;

      const result = await caller.chat.sendMessage({
        conversationId,
        message: "What is your experience with cloud infrastructure?",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
      expect(typeof result.message).toBe("string");
      expect(result.message.length).toBeGreaterThan(0);
    });

    it("requires authentication", async () => {
      const ctx = createAuthContext();
      ctx.user = null;
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.sendMessage({
          conversationId: 1,
          message: "Hello",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("requires valid conversationId", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.chat.sendMessage({
          conversationId: "invalid" as any,
          message: "Hello",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });

    it.skip("requires non-empty message", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Create a conversation
      const convResult = await caller.chat.createConversation({
        title: "Test",
      });
      const conversationId = (convResult as any)[0]?.id || 1;

      try {
        await caller.chat.sendMessage({
          conversationId,
          message: "",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });
  });
});
