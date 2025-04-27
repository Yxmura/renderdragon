import { VercelRequest, VercelResponse } from '@vercel/node';
import ytdl from 'ytdl-core';

// Helper to format duration (optional, but good for display)
function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const videoUrl = req.query.url as string;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    const videoInfo = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url, // Get the largest thumbnail
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds, 10)),
      author: info.videoDetails.author.name,
      options: info.formats
        .filter(format => format.container && format.mimeType) // Filter out formats without container/mimeType
        .map(format => ({
          id: format.itag.toString(), // Use itag as a unique ID
          label: `${format.container || 'unknown'} - ${format.qualityLabel || format.audioQuality || 'unknown'}`,
          format: format.container || 'unknown',
          quality: format.qualityLabel || format.audioQuality || 'unknown',
          size: format.contentLength ? `${(parseInt(format.contentLength, 10) / (1024 * 1024)).toFixed(2)} MB` : undefined,
          mimeType: format.mimeType, // Keep mimeType for filtering on the frontend if needed
        })),
    };

    res.status(200).json(videoInfo);

  } catch (error: unknown) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: (error as Error).message || 'Error fetching video info' });
  }
}
