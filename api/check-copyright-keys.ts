
import { createServerHandler } from '../src/utils/api';

export default createServerHandler(async (req, res) => {
  const youtubeApiKey = process.env.VITE_YOUTUBE_API_KEY;
  const contentIdApiKey = process.env.VITE_CONTENT_ID_API_KEY;
  const audioDbApiKey = process.env.VITE_AUDIO_DB_API_KEY;
  
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
