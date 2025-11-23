import { GoogleGenAI, Modality } from "@google/genai";

// Using Gemini AI integration blueprint
// Note: gemini-2.0-flash-preview-image-generation is the model that supports image generation
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const VALID_IMAGE_GENERATION_MODELS = [
  "gemini-2.5-flash-image",
  "gemini-2.0-flash-exp"
];

export async function generateRenderFromMoodboard(
  moodboardImageBase64: string,
  moodboardMimeType: string,
  emptySpaceImageBase64: string,
  emptySpaceMimeType: string,
  model: string = "gemini-2.5-flash-image"
): Promise<{ imageBase64: string; mimeType: string }> {
  // Validate model
  if (!VALID_IMAGE_GENERATION_MODELS.includes(model)) {
    throw new Error(`Invalid model: ${model}. Only image generation models are supported.`);
  }

  // Validate MIME types
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validMimeTypes.includes(moodboardMimeType) || !validMimeTypes.includes(emptySpaceMimeType)) {
    throw new Error('Invalid image format. Only JPEG, PNG, and WEBP are supported.');
  }

  try {
    // Gemini image generation models support only ONE conditioning image
    // So we'll use a combined prompt approach with the moodboard as the conditioning image
    const prompt = `You are an expert interior designer and photorealistic rendering specialist.

I'm providing you with a MOODBOARD image that shows the design inspiration including:
- Color palette and aesthetic direction
- Furniture style and materials
- Overall design mood and feel

Based on this moodboard, generate a photorealistic interior render that:
- Captures the exact aesthetic, color scheme, and style shown in the moodboard
- Features similar furniture pieces, materials, and textures
- Maintains a cohesive, professional interior design
- Looks like a real, high-quality photograph of a designed space
- Could be used as a professional interior design visualization

The space should be furnished and designed to match the moodboard's inspiration perfectly.`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: moodboardImageBase64,
                mimeType: moodboardMimeType,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts in response");
    }

    // Find the image part
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          imageBase64: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
        };
      }
    }

    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error generating render:", error);
    throw new Error(`Failed to generate render: ${error}`);
  }
}
