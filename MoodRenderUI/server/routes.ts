import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateRenderFromMoodboard } from "./lib/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/generate", async (req, res) => {
    try {
      const { moodboardImage, emptySpaceImage, model } = req.body;

      if (!moodboardImage || !emptySpaceImage) {
        return res.status(400).json({ 
          error: "Both moodboard and empty space images are required" 
        });
      }

      // Extract MIME type and base64 data from data URLs
      const moodboardMatch = moodboardImage.match(/^data:(image\/\w+);base64,(.+)$/);
      const emptySpaceMatch = emptySpaceImage.match(/^data:(image\/\w+);base64,(.+)$/);

      if (!moodboardMatch || !emptySpaceMatch) {
        return res.status(400).json({
          error: "Invalid image format. Please upload valid PNG, JPEG, or WEBP images."
        });
      }

      const moodboardMimeType = moodboardMatch[1];
      const moodboardBase64 = moodboardMatch[2];
      const emptySpaceMimeType = emptySpaceMatch[1];
      const emptySpaceBase64 = emptySpaceMatch[2];

      const result = await generateRenderFromMoodboard(
        moodboardBase64,
        moodboardMimeType,
        emptySpaceBase64,
        emptySpaceMimeType,
        model || "gemini-2.5-flash-image"
      );

      res.json({
        success: true,
        imageData: `data:${result.mimeType};base64,${result.imageBase64}`,
      });
    } catch (error) {
      console.error("Error in /api/generate:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to generate render" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
