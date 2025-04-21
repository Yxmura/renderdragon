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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-04-17' });

    const prompt = `Generate 3 YouTube video titles for a video described as "${description}". The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}].The current year is 2025 and here are some great titles that worked well in the past for inspiration: [#1 Bedwars Player | Keyboard & Mouse ASMR, Using OG Minecraft Traps To See If They Still Work, I Survived 100 Days on an ISLAND in Minecraft Hardcore, How to Claim Minecraft Yearn Cape in 6 Minutes, 
I Created Minecraft's Strongest Civilization, I Survived 100 Days Building an UNDERGROUND BASE in Minecraft Hardcore, How I Survived the Lifesteal SMP, I Secretly used GUNS in Minecraft..., 10 HIGH LEVEL Tips & Tricks for Minecraft Bedwars! (2024 Guide), Can I Beat 100 Players For $10,000?, I Got Hunted by Minecraft Bounty Hunters, My Perfect Cozy Start in Hardcore Minecraft!, Dominating the BWCS Quarter Finals, I Hit 3400⭐ in Bedwars with gamerboy80, Bedwars Showdown vs The Best Bedwars Youtubers, The Most Stacked Bedwars Game Ever I Became The Most ANNOYING Bedwars Player, 2,000 ELO (#1) | Ranked Bedwars Montage]`;

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
