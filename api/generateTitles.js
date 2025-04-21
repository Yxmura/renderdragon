import { GoogleGenerativeAI } from '@google/generative-ai';

// Increased default timeout to 45 seconds
const withTimeout = (promise, timeout = 45000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ message: 'Server misconfiguration: missing API key' });
  }

  const { description, creativity } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Video description is required' });
  }

  if (creativity === undefined || typeof creativity !== 'number' || creativity < 0 || creativity > 100) {
    return res.status(400).json({ message: 'Creativity level is required and must be a number between 0 and 100' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-04-17' });

    // Added examples of successful Minecraft titles directly into the prompt
    const prompt = `Generate 3 YouTube video titles for a video described as "${description}". Consider examples of past successful Minecraft titles like "I Survived 100 Days in HARDCORE Minecraft", "Building the ULTIMATE Secret Base", "Exploring The DEEPEST Cave in Minecraft", "The Rarest Item I've Ever Found!", "My First Time Beating The Ender Dragon". The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return only a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}]. Do not include any other text or formatting outside the JSON.`;

    const temperatureValue = Math.max(0.1, Math.min(1, creativity / 100));
    const generationConfig = {
      temperature: temperatureValue,
      topP: temperatureValue,
      maxOutputTokens: 200, // Keep this relatively low to encourage faster responses
    };

    const result = await withTimeout(
      model.generateContent(prompt, generationConfig)
      // No need to pass 30000 if the default is changed above
    );

    const response = result.response;
    if (!response) {
        throw new Error("AI response object is null or undefined");
    }
    const text = response.text();

    if (!text) {
        throw new Error("AI response text is empty");
    }

    let generatedTitles;
    try {
      // Robust cleaning for various markdown formats the model might use
      const cleanedText = text
        .replace(/```json\s*\n/g, '') // Remove ```json and following newline
        .replace(/```/g, '')       // Remove any remaining ```
        .trim();                  // Trim whitespace

      generatedTitles = JSON.parse(cleanedText);

      if (!Array.isArray(generatedTitles) || !generatedTitles.every(item =>
        typeof item === 'object' && item !== null && 'title' in item && typeof item.title === 'string' && 'type' in item && typeof item.type === 'string'
      )) {
        console.error('AI response validation failed. Raw response:', text);
        throw new Error("AI response is not in the expected JSON array format");
      }

    } catch (err) {
      console.error('Failed to process AI response:', err);
      console.error('Raw AI response (before cleaning):', text);
      return res.status(500).json({
        message: 'Failed to process AI response',
        error: err.message,
        rawResponse: text
      });
    }

    const suggestions = generatedTitles.map((title, i) => ({
      id: String(i + 1),
      title: title.title,
      type: title.type,
    }));

    return res.status(200).json({ titles: suggestions });

  } catch (error) {
    console.error('Generation error:', error);

    if (error.message === 'Request timed out') {
      // This specific error message is caught and returns 504
      return res.status(504).json({
        message: 'The request took too long to complete. Please try again.',
        error: error.message
      });
    }

    // Other errors return 500
    const errorMessage = error.message || 'Failed to generate titles due to an internal error';
    return res.status(500).json({
      message: errorMessage,
      error: error.message
    });
  }
}