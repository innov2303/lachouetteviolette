import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ 
  id: true, 
  createdAt: true 
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true, updatedAt: true });
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;

export const heroContentSchema = z.object({
  subtitle: z.string(),
  title: z.string(),
  buttonText: z.string(),
});

export const galleryContentSchema = z.object({
  sectionLabel: z.string(),
  title: z.string(),
  titleHighlight: z.string(),
  description: z.string(),
  description2: z.string(),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string(),
  })),
});

export const teamContentSchema = z.object({
  sectionLabel: z.string(),
  title: z.string(),
  description: z.string(),
  members: z.array(z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string(),
  })),
});

export const projectContentSchema = z.object({
  sectionLabel: z.string(),
  title: z.string(),
  description: z.string(),
  pillars: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  approachTitle: z.string(),
  approachText: z.string(),
  inspirationTitle: z.string(),
  inspirationText: z.string(),
});

export const contactContentSchema = z.object({
  sectionLabel: z.string(),
  title: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  hours: z.string(),
  closedDays: z.string(),
});

export type HeroContent = z.infer<typeof heroContentSchema>;
export type GalleryContent = z.infer<typeof galleryContentSchema>;
export type TeamContent = z.infer<typeof teamContentSchema>;
export type ProjectContent = z.infer<typeof projectContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
