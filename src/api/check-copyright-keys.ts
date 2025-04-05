
import { createServerHandler } from 'utils/api';

export default createServerHandler(async (req, res) => {
  // In a real implementation, this would check if the API keys exist
  // For this demo, we'll just check if the environment variables are set
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const contentIdApiKey = process.env.CONTENT_ID_API_KEY;
  const audioDbApiKey = process.env.AUDIO_DB_API_KEY;
  
  const keysAvailable = !!(youtubeApiKey && contentIdApiKey && audioDbApiKey);
  
  return res.json({
    keysAvailable,
    missingKeys: !keysAvailable ? [
      !youtubeApiKey ? 'YOUTUBE_API_KEY' : null,
      !contentIdApiKey ? 'CONTENT_ID_API_KEY' : null,
      !audioDbApiKey ? 'AUDIO_DB_API_KEY' : null
    ].filter(Boolean) : []
  });
});
