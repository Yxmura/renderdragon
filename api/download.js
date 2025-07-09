import ytdl from '@distube/ytdl-core';
import { Writable } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';

// Ensure ffmpeg binary is available – fallback to system ffmpeg if static build is missing
let resolvedFfmpegPath = ffmpegPath;
try {
  const exists = resolvedFfmpegPath && fs.existsSync(resolvedFfmpegPath);
  console.log('[ffmpeg-debug] static path:', resolvedFfmpegPath, 'exists:', exists);
  if (!exists) {
    console.warn('ffmpeg-static binary not found; falling back to system ffmpeg');
    resolvedFfmpegPath = 'ffmpeg';
  }
} catch (err) {
  console.warn('[ffmpeg-debug] access check failed:', err);
  resolvedFfmpegPath = 'ffmpeg';
}

ffmpeg.setFfmpegPath(resolvedFfmpegPath);

export const config = {
  runtime: 'nodejs',
  maxDuration: 300,
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
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
    const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const url = params.get('url');
    const videoItag = params.get('itag');
    const audioItag = params.get('audioItag');
    const title = params.get('title') || 'video';

    if (!url || !ytdl.validateURL(url) || !videoItag) {
      return new Response(JSON.stringify({ error: 'URL and itag are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: videoItag });
    
    if (!videoFormat) {
      return new Response(JSON.stringify({ error: 'Requested video format not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_');
    const filename = `${safeTitle}.mp4`;

    const headers = {
        ...corsHeaders,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'video/mp4',
    };
    
    const { readable, writable } = new TransformStream();
    const responseStream = Writable.fromWeb(writable);

    if (audioItag) {
      const audioFormat = ytdl.chooseFormat(info.formats, { quality: audioItag });
      if (!audioFormat) {
        throw new Error('Requested audio format not found');
      }
      
      const videoUrl = String(videoFormat.url);
      const audioUrl = String(audioFormat.url);
      console.log('DEBUG urls', typeof videoUrl, typeof audioUrl, videoUrl.substring(0, 50));

      ffmpeg()
        .input(videoUrl)
        .input(audioUrl)
        .videoCodec('copy')
        .audioCodec('copy')
        .format('mp4')
        .outputOptions('-movflags', 'frag_keyframe+empty_moov')
        .on('error', (err) => {
          console.error('ffmpeg error:', err);
          responseStream.destroy(err);
        })
        .pipe(responseStream, { end: true });

    } else {
      ytdl(url, { format: videoFormat }).pipe(responseStream);
    }

    return new Response(readable, {
        status: 200,
        headers,
    });

  } catch (error) {
    console.error('Download error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process download';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
