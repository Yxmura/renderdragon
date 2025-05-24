import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { Request, Response } from 'express';

interface GenerateTitlesRequestBody {
  description: string;
  creativity: number;
}

interface GeneratedTitle {
  title: string;
  type: 'creative' | 'descriptive' | 'emotional' | 'trending';
}

interface TitlesResponse {
  titles: Array<{
    id: string;
    title: string;
    type: 'creative' | 'descriptive' | 'emotional' | 'trending';
  }>;
}

// Custom error interface for OpenAI/OpenRouter errors
interface OpenAIClientError extends Error {
  status?: number;
  response?: {
    status: number;
    data: unknown;
    headers?: Record<string, string>;
  };
  error?: unknown;
  cause?: unknown;
}

const withTimeout = <T>(promise: Promise<T>, timeout = 60000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://renderdragon.org",
    "X-Title": "Renderdragon",
  },
});

export default async function handler(
  req: Request,
  res: Response
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY is not set");
    return res
      .status(500)
      .json({ message: "Server misconfiguration: missing API key" });
  }

  const { description, creativity } = req.body as GenerateTitlesRequestBody;

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
      message:
        "Creativity level is required and must be a number between 0 and 100",
    });
  }

  try {
    const prompt = `Generate 3 Minecraft YouTube titles for: "${description}". Examples: "I Survived 100 Days in HARDCORE", "The ULTIMATE Secret Base", "The Rarest Item Ever!". Creativity: ${creativity}/100. Format: JSON array [{title, type}]. Types: creative|descriptive|emotional|trending. Around 60-70 chars including spaces`;

    const temperatureValue = Math.max(0.1, Math.min(1, creativity / 100));

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You are a YouTube title generation expert. Respond with a JSON array containing exactly 3 objects with 'title' and 'type' properties.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const completion = await withTimeout(
      openai.chat.completions.create({
        model: "google/gemini-2.5-flash-preview-05-20",
        messages: messages,
        temperature: temperatureValue,
        max_tokens: 200,
      })
    );

    const text = completion.choices[0].message.content;
    if (!text) {
      throw new Error("AI returned empty response");
    }

    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    let parsedData: GeneratedTitle[] | { titles: GeneratedTitle[] };
    try {
      parsedData = JSON.parse(cleanedText);
      if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null && 'titles' in parsedData && Array.isArray(parsedData.titles)) {
        parsedData = parsedData.titles;
      } else if (!Array.isArray(parsedData)) {
         throw new Error("AI response is not a valid JSON array or object with 'titles' array.");
      }
    } catch (e: unknown) {
      if (e instanceof SyntaxError) {
        console.error("JSON parsing error:", e.message);
        console.error("Problematic AI response text:", cleanedText);
        throw new Error("Failed to parse AI response as JSON: " + e.message);
      } else {
        console.error("Unexpected error during JSON parsing:", e);
        throw new Error("An unexpected error occurred during JSON parsing.");
      }
    }

    const titles: TitlesResponse['titles'] = (parsedData as GeneratedTitle[]).map((title, i) => ({
      id: String(i + 1),
      title: title.title,
      type: title.type,
    }));

    return res.status(200).json({ titles });
  } catch (error: unknown) {
    console.error("Generation error:", error);
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error as object), 2));

    if (error instanceof Error && error.message === "Request timed out") {
      return res.status(504).json({
        message: "Timeout exceeded, please try again later.",
        error: error.message,
      });
    }

    const openAIError = error as OpenAIClientError;

    if (openAIError.response) {
      return res.status(openAIError.response.status).json({
        message: `API error: ${openAIError.message}`,
        error: openAIError.message,
        details: openAIError.response.data,
      });
    } else if (openAIError.status) {
      return res.status(openAIError.status).json({
        message: `OpenAI SDK error: ${openAIError.message}`,
        error: openAIError.message,
        details: openAIError.error || null,
      });
    } else if (error instanceof Error) {
      return res.status(500).json({
        message: "Failed to generate titles",
        error: error.message,
        details: openAIError.cause || null,
      });
    } else {
      return res.status(500).json({
        message: "Failed to generate titles",
        error: "An unknown error occurred",
        details: String(error),
      });
    }
  }
}