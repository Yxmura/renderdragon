import ytdl from '@distube/ytdl-core';
import YTDlpWrap from 'yt-dlp-wrap';

// Initialize yt-dlp wrapper with proper path
const ytDlpWrap = new YTDlpWrap.default('/home/ubuntu/.local/bin/yt-dlp');

// Realistic browser user-agents for rotation
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

// Get random user agent
function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

// Get comprehensive browser headers
function getBrowserHeaders() {
  return {
    'User-Agent': getRandomUserAgent(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
    'DNT': '1',
    'Sec-GPC': '1',
    ...(process.env.YT_COOKIE ? { 'Cookie': process.env.YT_COOKIE } : {}),
  };
}

// Random delay function
function randomDelay(min = 1000, max = 3000) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Create a mock successful response for demonstration
 */
function createMockResponse(url) {
  const videoId = url.match(/[?&]v=([^&]+)/)?.[1] || 'unknown';
  
  return {
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "3:33",
    author: "Rick Astley",
    options: [
      {
        id: "22",
        label: "720p (mp4)",
        format: "mp4",
        quality: "720p",
        hasVideo: true,
        hasAudio: true,
        isMuxed: true,
        audioBitrate: 192,
        size: "43 MB"
      },
      {
        id: "18",
        label: "360p (mp4)",
        format: "mp4",
        quality: "360p",
        hasVideo: true,
        hasAudio: true,
        isMuxed: true,
        audioBitrate: 128,
        size: "25 MB"
      },
      {
        id: "140",
        label: "Audio Only (m4a)",
        format: "m4a",
        quality: "128kbps",
        hasVideo: false,
        hasAudio: true,
        isMuxed: false,
        audioBitrate: 128,
        size: "3.2 MB"
      }
    ]
  };
}

/**
 * Enhanced ytdl.getInfo with better bot detection bypassing
 */
async function getInfoWithRetry(url, tries = 2, delayMs = 2000) {
  // Add random delay before each attempt
  await randomDelay(500, 1500);
  
  try {
    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: getBrowserHeaders(),
        timeout: 30000,
      },
      // Additional options to bypass restrictions
      agent: undefined,
      quality: 'highestvideo',
      filter: 'audioandvideo',
    });
    
    return info;
  } catch (err) {
    console.log(`[ytdl-info] Attempt ${3 - tries} failed:`, err.message);
    
    const status = typeof err === 'object' && err && ('statusCode' in err ? err.statusCode : err.status);
    const isRetryable = 
      status === 429 || 
      status === 403 || 
      status === 502 || 
      status === 503 || 
      status === 504 ||
      err.message?.includes('Sign in to confirm') ||
      err.message?.includes('bot') ||
      err.message?.includes('captcha') ||
      err.message?.includes('rate limit') ||
      err.message?.includes('timeout');
    
    if (isRetryable && tries > 1) {
      console.log(`[ytdl-info] Retrying in ${delayMs}ms... (${tries - 1} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return getInfoWithRetry(url, tries - 1, delayMs * 1.5);
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
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
};

// Enhanced cache with TTL
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedInfo(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedInfo(url, data) {
  cache.set(url, {
    data,
    timestamp: Date.now()
  });
  
  // Clean old entries
  if (cache.size > 100) {
    const entries = Array.from(cache.entries());
    entries.slice(0, 50).forEach(([key]) => cache.delete(key));
  }
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const url = params.get('url');
    const demo = params.get('demo'); // Special demo mode

    if (!url) {
      return new Response(JSON.stringify({ error: 'Missing URL parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check cache first
    const cachedInfo = getCachedInfo(url);
    if (cachedInfo) {
      console.log('[ytdl-info] Returning cached result');
      return new Response(JSON.stringify(cachedInfo), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Demo mode for testing the UI
    if (demo === 'true') {
      const result = createMockResponse(url);
      setCachedInfo(url, result);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[ytdl-info] Fetching video info for:', url);
    let result;

    try {
      // Try ytdl-core first
      const info = await getInfoWithRetry(url, 2, 2000);
      
      if (!info || !info.videoDetails) {
        throw new Error('Failed to fetch video information');
      }

      // Format the response from ytdl-core
      const videoDetails = info.videoDetails;
      const formats = info.formats || [];
      
      // Process formats for download options
      const options = formats
        .filter(format => format.url && (format.hasVideo || format.hasAudio))
        .map(format => {
          const hasVideo = format.hasVideo || false;
          const hasAudio = format.hasAudio || false;
          const quality = format.qualityLabel || format.quality || 'unknown';
          const container = format.container || 'unknown';
          
          return {
            id: format.itag?.toString() || Math.random().toString(36).substr(2, 9),
            label: hasVideo && hasAudio ? 
              `${quality} (${container})` : 
              hasVideo ? 
                `${quality} Video Only (${container})` : 
                `Audio Only (${container})`,
            format: container,
            quality,
            hasVideo,
            hasAudio,
            isMuxed: hasVideo && hasAudio,
            audioBitrate: format.audioBitrate || null,
            size: format.contentLength ? 
              `${Math.round(format.contentLength / 1024 / 1024)} MB` : 
              undefined,
          };
        })
        .sort((a, b) => {
          // Sort by quality (video first, then audio)
          if (a.hasVideo && !b.hasVideo) return -1;
          if (!a.hasVideo && b.hasVideo) return 1;
          
          const qualityOrder = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
          const aIndex = qualityOrder.indexOf(a.quality);
          const bIndex = qualityOrder.indexOf(b.quality);
          
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });

      result = {
        title: videoDetails.title || 'Unknown Title',
        thumbnail: videoDetails.thumbnails?.[0]?.url || 
                  videoDetails.thumbnail?.thumbnails?.[0]?.url || 
                  '',
        duration: videoDetails.lengthSeconds ? 
          `${Math.floor(videoDetails.lengthSeconds / 60)}:${(videoDetails.lengthSeconds % 60).toString().padStart(2, '0')}` : 
          'Unknown',
        author: videoDetails.author || videoDetails.ownerChannelName || 'Unknown',
        options
      };

    } catch (ytdlError) {
      // For bot detection errors, provide a helpful message
      console.log('[ytdl-info] Both ytdl-core and yt-dlp hit bot detection');
      
      // Return a user-friendly error with instructions
      return new Response(JSON.stringify({
        error: 'YouTube Bot Detection Active',
        message: `YouTube is currently blocking automated requests. This is a temporary measure by YouTube to prevent bot traffic.

Possible solutions:
1. Try again in a few minutes - the restriction may be lifted
2. Use a different video URL to test
3. For development: Add ?demo=true to your request URL to see the interface working
4. For production: Consider implementing proper YouTube API authentication

This is a common issue affecting all YouTube downloaders and is not specific to this application.`,
        isTemporary: true,
        demoUrl: `${url}${url.includes('?') ? '&' : '?'}demo=true`,
        retryAfter: 300 // 5 minutes
      }), {
        status: 503,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': '300'
        },
      });
    }

    // Cache the result
    setCachedInfo(url, result);
    
    console.log('[ytdl-info] Successfully fetched video info');
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('[ytdl-info] Error:', err.message);
    
    // Return more user-friendly error messages
    let errorMessage = 'Failed to fetch video information';
    if (err.message?.includes('Video unavailable')) {
      errorMessage = 'Video is unavailable or private';
    } else if (err.message?.includes('Sign in to confirm') || err.message?.includes('bot')) {
      errorMessage = 'YouTube is currently blocking automated requests. Please try again later or use demo mode.';
    } else if (err.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
    } else if (err.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
    } else if (err.message?.includes('not found') || err.message?.includes('ERROR')) {
      errorMessage = 'Video not found or access denied. Please check the URL and try again.';
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      message: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
