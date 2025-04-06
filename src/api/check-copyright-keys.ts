
import { createServerHandler } from '../utils/api';

export default createServerHandler(async (req, res) => {
  // In a real implementation, this would check if the API keys exist
  // For this demo, we'll just check if the environment variables are set
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const contentIdApiKey = import.meta.env.VITE_CONTENT_ID_API_KEY;
  const audioDbApiKey = import.meta.env.VITE_AUDIO_DB_API_KEY;
  
  const keysAvailable = !!(youtubeApiKey && contentIdApiKey && audioDbApiKey);
  
  return res.json({
    keysAvailable,
    missingKeys: !keysAvailable ? [
      !youtubeApiKey ? 'VITE_YOUTUBE_API_KEY' : null,
      !contentIdApiKey ? 'VITE_CONTENT_ID_API_KEY' : null,
      !audioDbApiKey ? 'VITE_AUDIO_DB_API_KEY' : null
    ].filter(Boolean) : []
  });
});
