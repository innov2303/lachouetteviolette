import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, requireAuth } from "./auth";
import { seedDefaultContent } from "./seed-content";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("Format non supporte"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);
  await seedDefaultContent();

  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadsDir, path.basename(req.path));
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    next();
  });

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

  app.post("/api/preinscriptions", async (req, res) => {
    try {
      const { insertPreinscriptionSchema } = await import("@shared/schema");
      const input = insertPreinscriptionSchema.parse(req.body);
      const preinscription = await storage.createPreinscription(input);
      res.status(201).json(preinscription);
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

  app.get("/api/preinscriptions", requireAuth, async (_req, res) => {
    try {
      const data = await storage.getPreinscriptions();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Internal server error" });
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

  app.post("/api/upload", requireAuth, upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoye" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.delete("/api/upload/:filename", requireAuth, (req, res) => {
    const filePath = path.join(uploadsDir, path.basename(req.params.filename));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.json({ message: "Fichier supprime" });
  });

  return httpServer;
}
