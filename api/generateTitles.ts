import OpenAI from "openai";

// Increased timeout to 60 seconds for slower connections
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY is not set");
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
    const prompt = `Generate 3 Minecraft YouTube titles for: "${description}". Examples: "I Survived 100 Days in HARDCORE", "The ULTIMATE Secret Base", "The Rarest Item Ever!". Creativity: ${creativity}/100. Format: JSON array [{title, type}]. Types: creative|descriptive|emotional|trending. Around 60-70 chars including spaces`;
    
    const temperatureValue = Math.max(0.1, Math.min(1, creativity / 100));

    const completion = await withTimeout(
      openai.chat.completions.create({
        model: "google/gemini-2.5-flash-preview-05-20",
        messages: [
          {
            role: "system",
            content: "You are a YouTube title generation expert. Respond with a JSON array containing exactly 3 objects with 'title' and 'type' properties.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: temperatureValue,
        max_tokens: 200,
      })
    );

    const text = completion.choices[0].message.content;
    if (!text) {
      throw new Error("AI returned empty response");
    }

    // Clean up the response text and ensure it's valid JSON
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
      if (!Array.isArray(parsedData)) {
        // If we got an object with a titles array
        parsedData = parsedData.titles || [];
      }
    } catch (e) {
      console.error("JSON parsing error:", e);
      throw new Error("Failed to parse AI response as JSON");
    }

    const titles = parsedData.map((title, i) => ({
      id: String(i + 1),
      title: title.title,
      type: title.type,
    }));

    return res.status(200).json({ titles });
  } catch (error) {
    console.error("Generation error:", error);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    
    if (error.message === "Request timed out") {
      return res.status(504).json({
        message: "Timeout exceeded, please try again later.",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to generate titles",
      error: error.message || "Unknown error",
      details: error.response?.data || error.cause || null,
    });
  }
}
