const ytdl = require('ytdl-core');

// Helper to format duration (optional, but good for display)
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

module.exports = async function handler(req, res) {
  const videoUrl = req.query.url;

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
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds, 10)),
      author: info.videoDetails.author.name,
      options: info.formats
        .filter(format => format.container && format.mimeType)
        .map(format => ({
          id: format.itag.toString(),
          label: `${format.container || 'unknown'} - ${format.qualityLabel || format.audioQuality || 'unknown'}`,
          format: format.container || 'unknown',
          quality: format.qualityLabel || format.audioQuality || 'unknown',
          size: format.contentLength ? `${(parseInt(format.contentLength, 10) / (1024 * 1024)).toFixed(2)} MB` : undefined,
          mimeType: format.mimeType,
        })),
    };

    res.status(200).json(videoInfo);

  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: error.message || 'Error fetching video info' });
  }
};
