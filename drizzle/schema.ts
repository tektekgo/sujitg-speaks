import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Define enums first
export const userRole = pgEnum("userRole", ["user", "admin"]);
export const messageRole = pgEnum("messageRole", ["user", "assistant"]);

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRole("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const conversations = pgTable("conversations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).default("New Conversation").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

export const messages = pgTable("messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  conversationId: integer("conversationId").notNull(),
  role: messageRole("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export const portfolioContent = pgTable("portfolioContent", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  section: varchar("section", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PortfolioContent = typeof portfolioContent.$inferSelect;
export type InsertPortfolioContent = typeof portfolioContent.$inferInsert;

export const talks = pgTable("talks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }).notNull(),
  abstract: text("abstract").notNull(),
  keyTakeaways: text("keyTakeaways").notNull(), // JSON array as string
  audienceFit: text("audienceFit").notNull(),
  formatOptions: text("formatOptions").notNull(), // JSON array as string
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Talk = typeof talks.$inferSelect;
export type InsertTalk = typeof talks.$inferInsert;

export const events = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  location: varchar("location", { length: 255 }),
  talkId: integer("talkId"),
  coverage: text("coverage"), // URL or description
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

export const bookingInquiries = pgTable("bookingInquiries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  format: varchar("format", { length: 100 }).notNull(), // keynote, talk, panel, workshop
  audience: text("audience").notNull(), // description of audience
  budget: varchar("budget", { length: 100 }),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactName: varchar("contactName", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending, confirmed, declined
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertBookingInquiry = typeof bookingInquiries.$inferInsert;

export const testimonials = pgTable("testimonials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  quote: text("quote").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
