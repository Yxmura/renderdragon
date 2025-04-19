import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: 'Server misconfiguration: missing API key' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();

    // Filter models that support the 'generateContent' method
    const supportedModels = models.models.filter(model =>
      model.supportedGenerationMethods.includes('generateContent')
    );

    return res.status(200).json({
      message: "Available models supporting generateContent:",
      models: supportedModels.map(model => ({
        name: model.name,
        displayName: model.displayName,
        supportedGenerationMethods: model.supportedGenerationMethods,
        inputTokenLimit: model.inputTokenLimit,
        outputTokenLimit: model.outputTokenLimit,
      }))
     });
  } catch (error) {
    console.error('Error listing models:', error);
    return res.status(500).json({ message: 'Failed to list models', error: error.message });
  }
}
