import { db } from "./db";
import { messages, preinscriptions, users, siteContent, pageVisits, type InsertMessage, type Message, type InsertPreinscription, type Preinscription, type User, type InsertUser, type SiteContent, type PageVisit } from "@shared/schema";
import { eq, gte, sql } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  createPreinscription(data: InsertPreinscription): Promise<Preinscription>;
  getPreinscriptions(): Promise<Preinscription[]>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteContent(section: string): Promise<SiteContent | undefined>;
  getAllSiteContent(): Promise<SiteContent[]>;
  upsertSiteContent(section: string, content: unknown): Promise<SiteContent>;
  trackVisit(path: string, source: string, isAdmin: boolean): Promise<void>;
  getVisitsByDay(since: Date): Promise<{ date: string; count: number }[]>;
  getVisitsBySource(since: Date): Promise<{ source: string; count: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.createdAt);
  }

  async createPreinscription(data: InsertPreinscription): Promise<Preinscription> {
    const [row] = await db.insert(preinscriptions).values(data).returning();
    return row;
  }

  async getPreinscriptions(): Promise<Preinscription[]> {
    return await db.select().from(preinscriptions).orderBy(preinscriptions.createdAt);
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

  async trackVisit(path: string, source: string, isAdmin: boolean): Promise<void> {
    await db.insert(pageVisits).values({ path, source, isAdmin });
  }

  async getVisitsByDay(since: Date): Promise<{ date: string; count: number }[]> {
    const rows = await db
      .select({
        date: sql<string>`to_char(visited_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM-DD')`,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(pageVisits)
      .where(gte(pageVisits.visitedAt, since))
      .groupBy(sql`to_char(visited_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(visited_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM-DD')`);
    return rows;
  }

  async getVisitsBySource(since: Date): Promise<{ source: string; count: number }[]> {
    const rows = await db
      .select({
        source: pageVisits.source,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(pageVisits)
      .where(gte(pageVisits.visitedAt, since))
      .groupBy(pageVisits.source)
      .orderBy(sql`count(*) desc`);
    return rows;
  }
}

export const storage = new DatabaseStorage();
