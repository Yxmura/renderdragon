const ytdl = require('ytdl-core');
const contentDisposition = require('content-disposition');

module.exports = async function handler(req, res) {
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

    ytdl(videoUrl, { format: selectedFormat })
      .pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message || 'Error during download' });
  }
};
