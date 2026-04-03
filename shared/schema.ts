import { pgTable, text, serial, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ 
  id: true, 
  createdAt: true 
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export const preinscriptions = pgTable("preinscriptions", {
  id: serial("id").primaryKey(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  address: text("address").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  familySituation: text("family_situation").notNull(),
  familySituationOther: text("family_situation_other"),
  employment: text("employment").notNull(),
  childName: text("child_name").notNull(),
  childBirthdate: text("child_birthdate").notNull(),
  hasSiblings: text("has_siblings"),
  onWaitingList: text("on_waiting_list"),
  startDate: text("start_date").notNull(),
  scheduleDays: text("schedule_days").notNull(),
  expectations: text("expectations"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPreinscriptionSchema = createInsertSchema(preinscriptions).omit({
  id: true,
  createdAt: true,
});

export type Preinscription = typeof preinscriptions.$inferSelect;
export type InsertPreinscription = z.infer<typeof insertPreinscriptionSchema>;

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

export const familiarisationStepSchema = z.object({
  day: z.string(),
  title: z.string(),
  description: z.string(),
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
  familiarisationSteps: z.array(familiarisationStepSchema).optional(),
  inspirationTitle: z.string(),
  inspirationText: z.string(),
});

export const dayHoursSchema = z.object({
  day: z.string(),
  hours: z.string(),
});

export const contactContentSchema = z.object({
  sectionLabel: z.string(),
  title: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  schedule: z.array(dayHoursSchema),
});

export const availabilitySlotSchema = z.object({
  date: z.string(),
  days: z.array(z.string()),
});

export const availabilityContentSchema = z.object({
  enabled: z.boolean(),
  message: z.string(),
  slots: z.array(availabilitySlotSchema),
});

export const pageVisits = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  source: text("source").notNull().default("direct"),
  isAdmin: boolean("is_admin").notNull().default(false),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export type PageVisit = typeof pageVisits.$inferSelect;

export const socialLinksContentSchema = z.object({
  facebook: z.string(),
  instagram: z.string(),
});

export type AvailabilityContent = z.infer<typeof availabilityContentSchema>;
export type SocialLinksContent = z.infer<typeof socialLinksContentSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;
export type GalleryContent = z.infer<typeof galleryContentSchema>;
export type TeamContent = z.infer<typeof teamContentSchema>;
export type ProjectContent = z.infer<typeof projectContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
