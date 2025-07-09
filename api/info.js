import ytdl from '@distube/ytdl-core';

export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Surrogate-Control': 'no-store',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`).searchParams.get('url');
    if (!url || !ytdl.validateURL(url)) {
      return new Response(
        JSON.stringify({ message: 'A valid YouTube URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const info = await ytdl.getInfo(url);
    const { videoDetails } = info;

    const options = info.formats
      .filter((f) => f.hasAudio || f.hasVideo)
      .map((f) => ({
        id: f.itag.toString(),
        label: `${f.container.toUpperCase()} ${f.qualityLabel || ''}`.trim(),
        format: f.container,
        quality: f.qualityLabel || 'Audio',
        size: f.contentLength ? `${(parseInt(f.contentLength, 10) / 1e6).toFixed(1)} MB` : null,
        hasVideo: f.hasVideo,
        hasAudio: f.hasAudio,
        isMuxed: f.hasVideo && f.hasAudio,
        audioBitrate: f.audioBitrate,
      }));

    const responseBody = {
      title: videoDetails.title,
      thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url, // Get highest quality thumbnail
      duration: new Date(parseInt(videoDetails.lengthSeconds, 10) * 1000).toISOString().substr(11, 8),
      author: videoDetails.author.name,
      options,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('ytdl getInfo error', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch video info';
    return new Response(
      JSON.stringify({ message, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
