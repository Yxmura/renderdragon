import ytdl from 'ytdl-core';
import { createServerHandler } from '../src/utils/api';

export const config = {
  runtime: 'nodejs18.x'
};

// Helper to format duration
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        }
      }
    });

    if (!info || !info.videoDetails) {
      return res.status(404).json({ error: 'Video information not available' });
    }

    const videoInfo = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds, 10)),
      author: info.videoDetails.author.name,
      options: info.formats
        .filter(format => format.container && format.mimeType)
        .map(format => ({
          id: format.itag.toString(),
          label: `${format.container || 'unknown'} - ${format.qualityLabel || format.audioQuality || 'unknown'}`,
          format: format.container || 'unknown',
          quality: format.qualityLabel || format.audioQuality || 'unknown',
          size: format.contentLength ? `${(parseInt(format.contentLength, 10) / (1024 * 1024)).toFixed(2)} MB` : undefined,
          mimeType: format.mimeType,
        })),
    };

    return res.status(200).json(videoInfo);
  } catch (error) {
    console.error('YouTube API error:', error);
    
    // Handle specific YouTube API errors
    if (error.message.includes('410')) {
      return res.status(410).json({ 
        error: 'Video no longer available',
        details: 'The requested video has been removed or is no longer accessible'
      });
    }
    
    if (error.message.includes('Status code:')) {
      const statusCode = parseInt(error.message.match(/Status code: (\d+)/)?.[1] || '500', 10);
      return res.status(statusCode).json({ 
        error: 'YouTube API error',
        details: error.message 
      });
    }

    return res.status(500).json({ 
      error: 'Failed to fetch video information',
      details: error.message
    });
  }
};

export default createServerHandler(handler);
