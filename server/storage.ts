import { db } from "./db";
import { messages, users, siteContent, type InsertMessage, type Message, type User, type InsertUser, type SiteContent } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteContent(section: string): Promise<SiteContent | undefined>;
  getAllSiteContent(): Promise<SiteContent[]>;
  upsertSiteContent(section: string, content: unknown): Promise<SiteContent>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.createdAt);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSiteContent(section: string): Promise<SiteContent | undefined> {
    const [row] = await db.select().from(siteContent).where(eq(siteContent.section, section));
    return row;
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent);
  }

  async upsertSiteContent(section: string, content: unknown): Promise<SiteContent> {
    const existing = await this.getSiteContent(section);
    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ content, updatedAt: new Date() })
        .where(eq(siteContent.section, section))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(siteContent)
      .values({ section, content })
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
