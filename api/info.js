import ytdl from '@distube/ytdl-core';

// A realistic browser user-agent to reduce YouTube throttling heuristics
const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/**
 * Call ytdl.getInfo with up to 3 retries using exponential back-off when we hit
 * a 429 status code. Each retry doubles the wait time.
 */
async function getInfoWithRetry(url, tries = 3, delayMs = 1000) {
  try {
    return await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': DEFAULT_USER_AGENT,
          // Optionally forward a cookie for better success rate in production
          ...(process.env.YT_COOKIE ? { cookie: process.env.YT_COOKIE } : {}),
        },
      },
    });
  } catch (err) {
    const status = typeof err === 'object' && err && ('statusCode' in err ? err.statusCode : err.status);
    if ((status === 429 || status === 403) && tries > 1) {
      // wait then retry
      await new Promise((res) => setTimeout(res, delayMs));
      return getInfoWithRetry(url, tries - 1, delayMs * 2);
    }
    throw err;
  }
}

export const config = {
  runtime: 'nodejs',
  maxDuration: 60,
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

// Use a global cache to persist across requests in development
global._infoCache = global._infoCache || new Map();
const cache = global._infoCache;

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

    if (cache.has(url)) {
      const cached = cache.get(url);
      if (Date.now() - cached.timestamp < 3600000) { // 1 hour cache
        return new Response(JSON.stringify(cached.data), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
        });
      }
    }

    const info = await getInfoWithRetry(url);
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

    cache.set(url, {
      timestamp: Date.now(),
      data: responseBody,
    });

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
    });

  } catch (error) {
    console.error('ytdl getInfo error', error);

    // Attempt to propagate meaningful HTTP status codes when available.
    // `ytdl-core` attaches a `statusCode` property on errors originating from the YouTube request.
    // If the error contains a recognised status, forward that instead of always returning 500.
    const knownStatus = typeof error === 'object' && error && 'statusCode' in error
      ? error.statusCode
      : (typeof error === 'object' && error && 'status' in error ? error.status : null);

    const status = Number(knownStatus) && knownStatus >= 100 && knownStatus < 600 ? knownStatus : 500;
    const message = error instanceof Error ? error.message : 'Failed to fetch video info';

    return new Response(
      JSON.stringify({ message, error: message }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
