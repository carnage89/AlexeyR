import type { Express } from "express";
import { createServer, type Server } from "http";
import https from "https";
import { storage } from "./storage";
import {
  insertSiteContentSchema,
  insertServiceSchema,
  insertPortfolioItemSchema,
  insertPricingPlanSchema,
  insertContactSubmissionSchema
} from "@shared/schema";
import { z } from "zod";

// Telegram integration function
async function sendToTelegram(formData: { name: string; email: string; message: string }) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("Telegram configuration missing");
  }

  const telegramMessage = `🔥 *Новая заявка с сайта!*

👤 *Имя:* ${formData.name}
📧 *Email:* ${formData.email}
💬 *Сообщение:*
${formData.message}

⏰ *Время:* ${new Date().toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}`;

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const telegramData = JSON.stringify({
    chat_id: CHAT_ID,
    text: telegramMessage,
    parse_mode: 'Markdown'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(telegramData)
      }
    };

    const req = https.request(telegramUrl, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode === 200 && result.ok) {
            resolve(result);
          } else {
            reject(new Error(`Telegram API error: ${result.description || 'Unknown error'}`));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse Telegram response: ${parseError}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Telegram API request failed: ${error.message}`));
    });

    req.write(telegramData);
    req.end();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Site Content Routes
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllSiteContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:section", async (req, res) => {
    try {
      const content = await storage.getSiteContent(req.params.section);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.put("/api/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const { content } = req.body;

      const updated = await storage.updateSiteContent(section, content);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  // Services Routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid service data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create service" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid service data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // Portfolio Routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await storage.getAllPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio items" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const validatedData = insertPortfolioItemSchema.parse(req.body);
      const item = await storage.createPortfolioItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid portfolio data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create portfolio item" });
    }
  });

  app.put("/api/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPortfolioItemSchema.partial().parse(req.body);
      const item = await storage.updatePortfolioItem(id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid portfolio data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update portfolio item" });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      await storage.deletePortfolioItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete portfolio item" });
    }
  });

  // Pricing Routes
  app.get("/api/pricing", async (req, res) => {
    try {
      const plans = await storage.getAllPricingPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pricing plans" });
    }
  });

  app.post("/api/pricing", async (req, res) => {
    try {
      const validatedData = insertPricingPlanSchema.parse(req.body);
      const plan = await storage.createPricingPlan(validatedData);
      res.status(201).json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid pricing data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create pricing plan" });
    }
  });

  app.put("/api/pricing/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPricingPlanSchema.partial().parse(req.body);
      const plan = await storage.updatePricingPlan(id, validatedData);
      res.json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid pricing data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update pricing plan" });
    }
  });

  app.delete("/api/pricing/:id", async (req, res) => {
    try {
      await storage.deletePricingPlan(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pricing plan" });
    }
  });

  // Contact Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      // Send to Telegram
      try {
        await sendToTelegram(validatedData);
      } catch (telegramError) {
        console.error("Failed to send to Telegram:", telegramError);
        // Don't fail the whole request if Telegram fails
      }

      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create contact submission" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Admin Authentication
  app.post("/api/admin/auth", async (req, res) => {
    try {
      const { password } = req.body;

      // Use environment variable or fallback to default
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

      if (password === adminPassword) {
        res.json({ success: true, token: "admin-authenticated" });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}