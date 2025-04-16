import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { description, keywords, creativity } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Video description is required' });
  }

  try {
    const prompt = `Generate 5 YouTube video titles for a video described as "${description}". Incorporate these keywords: ${keywords || 'none'}. The creativity level is ${creativity} (0-100, where 0 is factual and 100 is highly creative). Each title should have a 'type' (creative, descriptive, emotional, or trending). Return a JSON array of objects in the format: [{title: "Title text", type: "creative | descriptive | emotional | trending"}]`;

    const completion = await openai.completions.create({
      engine: 'text-davinci-003', // or 'gpt-3.5-turbo' with chat completions (requires different call)
      prompt,
      max_tokens: 200,
      temperature: creativity / 100,
      n: 1,
      stop: null,
    });

    const rawText = completion.choices[0].text.trim();

    // Parse AI response JSON safely
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

    // Add IDs and placeholder metrics
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
