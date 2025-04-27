import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

interface DownloadQuery {
  url: string;
  format: string;
  quality: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Safely extract query params
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
  const format = Array.isArray(req.query.format) ? req.query.format[0] : req.query.format;
  const quality = Array.isArray(req.query.quality) ? req.query.quality[0] : req.query.quality;

  if (!url || !format || !quality) {
    return res.status(400).json({ error: 'Missing parameters (url, format, or quality)' });
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.youtube.com/',
    };
    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }
    const info = await ytdl.getInfo(url, {
      requestOptions: { headers }
    });

    const selectedFormat = info.formats.find(f =>
      (f.container === format || f.mimeType?.includes(format)) &&
      (f.qualityLabel === quality || f.audioQuality === quality)
    );

    if (!selectedFormat) {
      return res.status(404).json({ error: 'Requested format and quality not found.' });
    }

    const videoDetails = info.videoDetails;
    const filename = `${videoDetails.title}.${selectedFormat.container || 'mp4'}`;
      
    res.setHeader('Content-Type', selectedFormat.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

    const downloadStream = ytdl(url, {
      format: selectedFormat,
      requestOptions: { headers }
    });

    // Handle download stream errors
    downloadStream.on('error', (error: Error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        if (error.message.includes('410')) {
          res.status(410).json({ 
            error: 'Video no longer available',
            details: 'The requested video has been removed or is no longer accessible'
          });
        } else {
          res.status(500).json({ 
            error: error.message || 'Error during download',
            details: error.stack
          });
        }
      }
    });

    // Handle stream end
    downloadStream.on('end', () => {
      console.log('Download completed:', filename);
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('YouTube API error:', error);
    
    if (error instanceof Error) {
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
    }

    return res.status(500).json({ 
      error: 'Failed to process video download',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default handler;