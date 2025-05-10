import { GoogleGenAI, Type } from "@google/genai";

// Increased timeout to 60 seconds for slower connections
const withTimeout = <T>(promise: Promise<T>, timeout = 60000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ message: "Server misconfiguration: missing API key" });
  }

  const { description, creativity } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Video description is required" });
  }

  if (
    creativity === undefined ||
    typeof creativity !== "number" ||
    creativity < 0 ||
    creativity > 100
  ) {
    return res.status(400).json({
      message: "Creativity level is required and must be a number between 0 and 100",
    });
  }

  try {
    const prompt = `Generate 3 YouTube video titles for a video described as "${description}". Consider examples of past successful Minecraft titles like "I Survived 100 Days in HARDCORE Minecraft", "Building the ULTIMATE Secret Base", "Exploring The DEEPEST Cave in Minecraft", "The Rarest Item I've Ever Found!", "My First Time Beating The Ender Dragon". The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return only a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}]. Do not include any other text or formatting outside the JSON.`;
    const temperatureValue = Math.max(0.1, Math.min(1, creativity / 100));

    const response = await withTimeout(
      ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        config: {
          temperature: temperatureValue,
          topP: temperatureValue,
          maxOutputTokens: 200,

          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              titles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                    },
                    type: {
                      type: Type.STRING,
                    },
                  },
                  propertyOrdering: ["title", "type"],
                },
              },
            },
          },
        },
        contents: [prompt],
      })
    );

    const text = response.text;
    if (!text) {
      throw new Error("AI returned empty or invalid response");
    }

    const titles = JSON.parse(
      text
        .replace(/```json\s*\n/g, "")
        .replace(/```/g, "")
        .trim()
    ).map((title, i) => ({
      id: String(i + 1),
      title: title.title,
      type: title.type,
    }));

    return res.status(200).json({ titles });
  } catch (error) {
    console.error("Generation error:", error);

    if (error.message === "Request timed out") {
      return res.status(504).json({
        message: "Timeout exceeded, please try again later.",
        error: error.message,
      });
    }

    const errorMessage =
      error.message || "Failed to generate titles due to an internal error";
    return res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
}
