import ytdl from 'ytdl-core';
import { createServerHandler } from '../src/utils/api';

export const config = {
  runtime: 'nodejs18.x'
};

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

  const { url, format, quality } = req.query;

  if (!url || !format || !quality) {
    return res.status(400).json({ error: 'Missing parameters (url, format, or quality)' });
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
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        }
      }
    });

    // Handle download stream errors
    downloadStream.on('error', (error) => {
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
      error: 'Failed to process video download',
      details: error.message
    });
  }
};

export default createServerHandler(handler);
