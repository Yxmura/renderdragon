import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ message: 'Server misconfiguration: missing API key' });
  }

  const { description, keywords, creativity } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Video description is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate 3 YouTube video titles for a video described as "${description}". Incorporate these keywords: ${keywords || 'none'}. The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}]`;

    const generationConfig = {
      temperature: creativity / 100,
      topP: creativity / 100,
      topK: 50, 
    };

    const result = await model.generateContent(prompt, generationConfig);
    const response = result.response;
    const text = response.text();

    let generatedTitles;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      generatedTitles = JSON.parse(cleanedText);

      if (!Array.isArray(generatedTitles) || !generatedTitles.every(item => typeof item === 'object' && item !== null && 'title' in item && 'type' in item)) {
        throw new Error("AI response is not a valid array of title objects.");
      }

    } catch (err) {
      console.error('Failed to parse or validate AI response:', err);
      console.error('Raw AI response:', text);
      return res.status(500).json({
        message: 'Failed to parse or validate AI response',
        error: err.message,
        rawResponse: text,
      });
    }

    const suggestions = generatedTitles.map((title, i) => ({
      id: String(i),
      title: title.title,
      type: title.type,
    }));

    return res.status(200).json({ titles: suggestions });
  } catch (error) {
    console.error('Gemini API error:', error);
    const errorMessage = error.message || 'Failed to generate titles';
    const apiErrorDetails = error.candidates && error.candidates[0]?.finishReason ? `. Finish reason: ${error.candidates[0].finishReason}` : '';
    return res.status(500).json({ message: `${errorMessage}${apiErrorDetails}`, error: error.message });
  }
}
