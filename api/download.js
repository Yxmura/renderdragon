import ytdl from 'ytdl-core';

export const config = {
  runtime: 'edge'
};

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
  const format = url.searchParams.get('format');
  const quality = url.searchParams.get('quality');

  if (!videoUrl || !format || !quality) {
    return new Response(
      JSON.stringify({ error: 'Missing parameters (url, format, or quality)' }),
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

    const selectedFormat = info.formats.find(f =>
      (f.container === format || f.mimeType?.includes(format)) &&
      (f.qualityLabel === quality || f.audioQuality === quality)
    );

    if (!selectedFormat) {
      return new Response(
        JSON.stringify({ error: 'Requested format and quality not found.' }),
        { headers: { ...headers, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    const videoDetails = info.videoDetails;
    const filename = `${videoDetails.title}.${selectedFormat.container || 'mp4'}`;

    const responseHeaders = {
      ...headers,
      'Content-Type': selectedFormat.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`
    };

    const stream = ytdl(videoUrl, { format: selectedFormat });
    
    // Convert stream to ReadableStream for Edge runtime
    const readableStream = new ReadableStream({
      async start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (error) => controller.error(error));
      }
    });

    return new Response(readableStream, { headers: responseHeaders });

  } catch (error) {
    console.error('Download error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error during download',
        details: error.stack
      }),
      { headers: { ...headers, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
}
