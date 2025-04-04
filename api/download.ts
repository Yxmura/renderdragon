import { VercelRequest, VercelResponse } from '@vercel/node';
import ytdl from 'ytdl-core';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url } = req.query; // Only need the URL here

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const guessedFormat = req.query.format as string | undefined;
    const filename = guessedFormat ? `${info.videoDetails.title}.${guessedFormat.split('/')[1]}` : info.videoDetails.title;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    ytdl(url).pipe(res); // Remove the 'format' option here
  } catch (error) {
    console.error('Error downloading:', error);
    return res.status(500).json({ error: 'Failed to download video' });
  }
};