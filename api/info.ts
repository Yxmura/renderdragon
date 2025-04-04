import { VercelRequest, VercelResponse } from '@vercel/node';
import ytdl from 'ytdl-core';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    const options = [
        ...formats.map(format => ({
          id: format.itag.toString(),
          label: `${format.qualityLabel || 'Unknown Quality'} - ${format.mimeType?.split(';')[0] || 'Unknown Format'}`,
          format: format.mimeType?.split(';')[0] || 'unknown',
          quality: format.qualityLabel || 'unknown',
          size: format.contentLength ? `${(parseInt(format.contentLength) / (1024 * 1024)).toFixed(2)} MB` : undefined,
        })),
        ...audioFormats.map(format => ({
          id: format.itag.toString() + '-audio',
          label: `${format.audioBitrate}kbps - ${format.mimeType?.split(';')[0] || 'Unknown Format'} (Audio Only)`,
          format: format.mimeType?.split(';')[0] || 'unknown',
          quality: `${format.audioBitrate}kbps`,
          size: format.contentLength ? `${(parseInt(format.contentLength) / (1024 * 1024)).toFixed(2)} MB` : undefined,
        })),
      ];

    res.status(200).json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: formatTime(info.videoDetails.lengthSeconds),
      author: info.videoDetails.author.name,
      options: options,
    });
  } catch (error) {
    console.error('Error fetching info:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
};

function formatTime(seconds: string | number): string {
    const secs = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const sec = secs % 60;
  
    const formattedHrs = hrs > 0 ? `${hrs}:` : '';
    const formattedMins = `${mins < 10 ? '0' : ''}${mins}:`;
    const formattedSecs = `${sec < 10 ? '0' : ''}${sec}`;
  
    return `${formattedHrs}${formattedMins}${formattedSecs}`;
  }