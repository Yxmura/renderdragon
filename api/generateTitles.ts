import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const withTimeout = <T>(promise: Promise<T>, timeout = 60000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request: Request): Promise<Response> {
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ message: "Server misconfiguration: missing API key" }),
      { status: 500 }
    );
  }

  let body: { description?: string; creativity?: number };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), {
      status: 400,
    });
  }

  const { description, creativity } = body;

  if (!description) {
    return new Response(JSON.stringify({ message: "Video description is required" }), {
      status: 400,
    });
  }

  if (
    creativity === undefined ||
    typeof creativity !== "number" ||
    creativity < 0 ||
    creativity > 100
  ) {
    return new Response(
      JSON.stringify({
        message: "Creativity must be a number between 0 and 100",
      }),
      { status: 400 }
    );
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
                    title: { type: Type.STRING },
                    type: { type: Type.STRING },
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
    if (!text) throw new Error("AI returned empty response");

    const titles = JSON.parse(
      text.replace(/```json\s*\n?/, "").replace(/```$/, "").trim()
    ).map((item: { title: string; type: string }, i: number) => ({
      id: String(i + 1),
      title: item.title,
      type: item.type,
    }));

    return new Response(JSON.stringify({ titles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        message: err.message || "Failed to generate titles",
        error: err.message,
      }),
      { status: err.message === "Request timed out" ? 504 : 500 }
    );
  }
}