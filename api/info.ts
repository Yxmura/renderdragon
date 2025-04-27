import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const videoUrl = req.query.url as string;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  // placeholder to see if it works
  res.status(200).json({
    title: "Test Video",
    thumbnail: "https://via.placeholder.com/150",
    duration: "1m 0s",
    author: "Test Author",
    options: [
      { id: "1", label: "mp4 - 720p", format: "mp4", quality: "720p" },
      { id: "2", label: "mp3 - 128kbps", format: "mp3", quality: "128kbps" },
    ],
  });
}