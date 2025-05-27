import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const hcaptchaSecretKey = process.env.HCAPTCHA_SECRET_KEY;

async function verifyHCaptcha(token) {
  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${hcaptchaSecretKey}&response=${token}`
  });
  const data = await response.json();
  return data.success;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!process.env.GEMINI_API_KEY || !process.env.HCAPTCHA_SECRET_KEY) {
    console.error("Missing required environment variables");
    return new Response(JSON.stringify({ message: "Server misconfiguration" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { description, creativity, hcaptchaToken } = body;

    // Verify invisible hCaptcha first
    const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    if (!isHCaptchaValid) {
      return new Response(JSON.stringify({ 
        message: "Captcha verification required",
        requireCaptcha: true 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const generationConfig = {
      temperature: Math.max(0.1, Math.min(1, creativity / 100)),
      maxOutputTokens: 200,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig,
    });

    const text = result.response.text();
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