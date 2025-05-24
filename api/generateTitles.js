import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://renderdragon.org",
    "X-Title": "Renderdragon",
  },
});

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY is not set");
    return new Response(JSON.stringify({ message: "Server misconfiguration: missing API key" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { description, creativity } = body;

    if (!description) {
      return new Response(JSON.stringify({ message: "Video description is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (creativity === undefined || typeof creativity !== "number" || creativity < 0 || creativity > 100) {
      return new Response(JSON.stringify({ 
        message: "Creativity level is required and must be a number between 0 and 100" 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const prompt = `Generate 3 Minecraft YouTube titles for: "${description}". Examples: "I Survived 100 Days in HARDCORE", "The ULTIMATE Secret Base", "The Rarest Item Ever!". Creativity: ${creativity}/100. Format: JSON array [{title, type}]. Types: creative|descriptive|emotional|trending. Around 60-70 chars including spaces`;

    const temperatureValue = Math.max(0.1, Math.min(1, creativity / 100));

    const messages = [
      {
        role: "system",
        content: "You are a YouTube title generation expert. Respond with a JSON array containing exactly 3 objects with 'title' and 'type' properties.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-preview-05-20",
      messages,
      temperature: temperatureValue,
      max_tokens: 200,
    });

    const text = completion.choices[0].message.content;
    if (!text) {
      throw new Error("AI returned empty response");
    }

    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    let parsedData;
    
    try {
      parsedData = JSON.parse(cleanedText);
      if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null && 'titles' in parsedData && Array.isArray(parsedData.titles)) {
        parsedData = parsedData.titles;
      } else if (!Array.isArray(parsedData)) {
        throw new Error("AI response is not a valid JSON array or object with 'titles' array.");
      }
    } catch (e) {
      console.error("JSON parsing error:", e.message);
      console.error("Problematic AI response text:", cleanedText);
      throw new Error(`Failed to parse AI response as JSON: ${e.message}`);
    }

    const titles = parsedData.map((title, i) => ({
      id: String(i + 1),
      title: title.title,
      type: title.type,
    }));

    return new Response(JSON.stringify({ titles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Generation error:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const status = error.status || 500;
    
    return new Response(JSON.stringify({
      message: "Failed to generate titles",
      error: errorMessage
    }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}