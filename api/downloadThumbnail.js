const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const thumbnailUrl = params.get('url');
    const title = params.get('title') || 'thumbnail';

    if (!thumbnailUrl) {
      return new Response(JSON.stringify({ error: 'Thumbnail URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch thumbnail: ${response.statusText}`);
    }

    const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    let extension = 'jpg';
    if (contentType.includes('webp')) {
      extension = 'webp';
    } else if (contentType.includes('png')) {
      extension = 'png';
    }

    const filename = `${safeTitle}.${extension}`;

    const headers = {
      ...corsHeaders,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': contentType,
    };

    return new Response(response.body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Thumbnail download error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process thumbnail download';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
} 