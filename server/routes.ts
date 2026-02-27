import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, requireAuth } from "./auth";
import { seedDefaultContent } from "./seed-content";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);
  await seedDefaultContent();

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/messages", requireAuth, async (_req, res) => {
    try {
      const msgs = await storage.getMessages();
      res.json(msgs);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/content", async (_req, res) => {
    try {
      const allContent = await storage.getAllSiteContent();
      const contentMap: Record<string, unknown> = {};
      for (const row of allContent) {
        contentMap[row.section] = row.content;
      }
      res.json(contentMap);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/content/:section", async (req, res) => {
    try {
      const row = await storage.getSiteContent(req.params.section);
      if (!row) return res.status(404).json({ message: "Section not found" });
      res.json(row.content);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/content/:section", requireAuth, async (req, res) => {
    try {
      const updated = await storage.upsertSiteContent(req.params.section, req.body);
      res.json(updated);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
