import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

export const config = {
  runtime: 'nodejs18.x'
};

// Helper to format duration
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
  formats: Array<{
    itag: number;
    container: string;
    qualityLabel?: string;
    audioQuality?: string;
    mimeType?: string;
  }>;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Safely extract query params
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid URL parameter' });
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    // Add more realistic headers and log cookies if available
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    };
    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }

    let info;
    try {
      info = await ytdl.getInfo(url, {
        requestOptions: { headers }
      });
    } catch (err: any) {
      console.error('ytdl.getInfo error:', err);
      // Return the actual error message and status if available
      if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message || 'Failed to fetch video info', details: err });
      }
      return res.status(500).json({ error: err.message || 'Failed to fetch video info', details: err });
    }

    const response: VideoInfo = {
      title: info.videoDetails.title,
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      formats: info.formats.map(format => ({
        itag: format.itag,
        container: format.container,
        qualityLabel: format.qualityLabel,
        audioQuality: format.audioQuality,
        mimeType: format.mimeType
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching video info:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message, details: error });
    }
    return res.status(500).json({ error: 'Failed to fetch video information', details: error });
  }
};

export default handler;