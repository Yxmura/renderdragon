import ytdl from 'ytdl-core';
import contentDisposition from 'content-disposition';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const videoUrl = req.query.url;
  const format = req.query.format;
  const quality = req.query.quality;

  if (!videoUrl || !format || !quality) {
    return res.status(400).json({ error: 'Missing parameters (url, format, or quality)' });
  }

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    const selectedFormat = info.formats.find(f =>
      (f.container === format || f.mimeType?.includes(format)) &&
      (f.qualityLabel === quality || f.audioQuality === quality)
    );

    if (!selectedFormat) {
      return res.status(404).json({ error: 'Requested format and quality not found.' });
    }

    const videoDetails = info.videoDetails;
    const filename = `${videoDetails.title}.${selectedFormat.container || 'mp4'}`;

    res.setHeader('Content-Disposition', contentDisposition(filename));
    res.setHeader('Content-Type', selectedFormat.mimeType || 'application/octet-stream');

    const downloadStream = ytdl(videoUrl, { format: selectedFormat });

    // Handle download stream errors
    downloadStream.on('error', (error) => {
      console.error('Download stream error:', error);
      // Only send error if headers haven't been sent yet
      if (!res.headersSent) {
        res.status(500).json({ 
          error: error.message || 'Error during download',
          details: error.stack
        });
      }
    });

    downloadStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ 
      error: error.message || 'Error during download',
      details: error.stack
    });
  }
};
