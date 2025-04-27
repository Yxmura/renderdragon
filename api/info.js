import ytdl from 'ytdl-core';

export const config = {
  runtime: 'edge'
};

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

export default async function handler(req) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 });
  }

  const url = new URL(req.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing video URL' }), 
      { headers: { ...headers, 'Content-Type': 'application/json' }, status: 400 }
    );
  }

  if (!ytdl.validateURL(videoUrl)) {
    return new Response(
      JSON.stringify({ error: 'Invalid YouTube URL' }), 
      { headers: { ...headers, 'Content-Type': 'application/json' }, status: 400 }
    );
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

    return new Response(
      JSON.stringify(videoInfo),
      { headers: { ...headers, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error fetching video info:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error fetching video info',
        details: error.stack
      }),
      { headers: { ...headers, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
}
