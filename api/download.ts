import { VercelRequest, VercelResponse } from '@vercel/node';
import ytdl from 'ytdl-core';
import contentDisposition from 'content-disposition';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const videoUrl = req.query.url as string;
  const format = req.query.format as string; // Container (e.g., 'mp4', 'webm')
  const quality = req.query.quality as string; // Quality label (e.g., '1080p', '128k')

  if (!videoUrl || !format || !quality) {
    return res.status(400).json({ error: 'Missing parameters (url, format, or quality)' });
  }

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // Get video info again to find the correct format based on query parameters
    const info = await ytdl.getInfo(videoUrl);

    // Find the format that matches the requested format and quality
    const selectedFormat = info.formats.find(f =>
      (f.container === format || f.mimeType?.includes(format)) &&
      (f.qualityLabel === quality || f.audioQuality === quality) // Match quality or audio quality
    );

    if (!selectedFormat) {
      return res.status(404).json({ error: 'Requested format and quality not found.' });
    }

    // Get video details for filename
    const videoDetails = info.videoDetails;
    const filename = `${videoDetails.title}.${selectedFormat.container || 'mp4'}`; // Default to mp4 if container is missing

    // Set headers for download
    res.setHeader('Content-Disposition', contentDisposition(filename));
    res.setHeader('Content-Type', selectedFormat.mimeType || 'application/octet-stream'); // Use actual mime type if available

    // Stream the video directly to the response
    ytdl(videoUrl, { format: selectedFormat })
      .pipe(res);

    } catch (error: unknown) {
      console.error('Download error:', error);
      res.status(500).json({ error: (error as Error).message || 'Error during download' });
    }
}
