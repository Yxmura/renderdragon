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

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const info = await ytdl.getInfo(url);

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

  const downloadStream = ytdl(url, { format: selectedFormat });

  // Handle download stream errors
  downloadStream.on('error', (error) => {
    console.error('Download stream error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error.message || 'Error during download',
        details: error.stack
      });
    }
  });

  // Handle stream end
  downloadStream.on('end', () => {
    console.log('Download completed:', filename);
  });

  downloadStream.pipe(res);
};

export default createServerHandler(handler);
