import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ message: 'Server misconfiguration: missing API key' });
  }

  const { description, keywords, creativity } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Video description is required' });
  }

  try {
    const prompt = `Generate 5 YouTube video titles for a video described as "${description}". Incorporate these keywords: ${keywords || 'none'}. The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates YouTube video titles.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: creativity / 100,
      n: 1,
    });

    const rawText = completion.choices[0].message.content.trim();

    let generatedTitles;
    try {
      generatedTitles = JSON.parse(rawText);
    } catch (err) {
      console.error('Failed to parse AI response:', err);
      console.error('Raw AI response:', rawText);
      return res.status(500).json({
        message: 'Failed to parse AI response',
        error: err.message,
        rawResponse: rawText,
      });
    }

    const suggestions = generatedTitles.map((title, i) => ({
      id: String(i),
      title: title.title,
      type: title.type,
      clicks: Math.floor(Math.random() * 100),
      ctr: +(Math.random() * 15).toFixed(1),
    }));

    return res.status(200).json({ titles: suggestions });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ message: 'Failed to generate titles', error: error.message });
  }
}
