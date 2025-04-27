import json
from urllib.parse import parse_qs, urlparse
from yt_dlp import YoutubeDL

# Helper to format duration (optional)
def format_duration(seconds):
    if seconds is None:
        return "N/A"
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    remaining_seconds = seconds % 60

    parts = []
    if hours > 0:
        parts.append(f"{hours}h")
    if minutes > 0:
        parts.append(f"{minutes}m")
    if remaining_seconds > 0 or (hours == 0 and minutes == 0):
        parts.append(f"{remaining_seconds}s")

    return " ".join(parts)

def handler(event, context):
    # Vercel passes request details in the 'event' dictionary
    # Query parameters are in event['queryStringParameters']
    query_params = event.get('queryStringParameters', {})
    video_url = query_params.get('url')

    if not video_url:
        return {
            'statusCode': 400,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'error': 'Missing video URL' })
        }

    # Basic URL validation (yt-dlp will also validate)
    try:
        parsed_url = urlparse(video_url)
        if not parsed_url.netloc or 'youtube.com' not in parsed_url.netloc and 'youtu.be' not in parsed_url.netloc:
             return {
                'statusCode': 400,
                'headers': { 'Content-Type': 'application/json' },
                'body': json.dumps({ 'error': 'Invalid YouTube URL' })
            }
    except Exception:
         return {
            'statusCode': 400,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'error': 'Invalid YouTube URL format' })
        }


    try:
        # yt-dlp options to fetch info without downloading
        ydl_opts = {
            'format': 'best',  # You can specify formats here too if needed
            'skip_download': True,
            'logger': None, # Suppress logger output
            'verbose': False,
            'no_warnings': True,
            'ignoreerrors': True, # Important for handling private/deleted videos gracefully
        }
        with YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url, download=False) # download=False is key

        if info_dict is None:
             return {
                'statusCode': 404,
                'headers': { 'Content-Type': 'application/json' },
                'body': json.dumps({ 'error': 'Video not found or cannot be accessed' })
            }


        # Prepare options for the frontend
        download_options = []
        if 'formats' in info_dict:
            for f in info_dict['formats']:
                # Filter out unwanted formats (e.g., without video or audio)
                if f.get('vcodec') != 'none' and f.get('acodec') != 'none': # Video + Audio
                     label = f"{f.get('ext', 'unknown')} - {f.get('format_note', f.get('format', 'unknown'))}"
                     download_options.append({
                        'id': f.get('format_id', f.get('protocol', 'unknown')), # Use format_id as ID
                        'label': label,
                        'format': f.get('ext', 'unknown'),
                        'quality': f.get('format_note', f.get('format', 'unknown')),
                        'size': f.get('filesize', None),
                        'mimeType': f.get('mime_type', None),
                        'vcodec': f.get('vcodec', None),
                        'acodec': f.get('acodec', None),
                     })
                elif f.get('acodec') != 'none' and f.get('vcodec') == 'none': # Audio only
                    label = f"Audio only - {f.get('format_note', f.get('format', 'unknown'))}"
                    download_options.append({
                        'id': f.get('format_id', f.get('protocol', 'unknown')),
                        'label': label,
                        'format': f.get('ext', 'unknown'),
                        'quality': f.get('format_note', f.get('format', 'unknown')),
                         'size': f.get('filesize', None),
                        'mimeType': f.get('mime_type', None),
                        'vcodec': f.get('vcodec', None),
                        'acodec': f.get('acodec', None),
                    })

        # Add size in MB to options if available
        for opt in download_options:
            if opt.get('size') is not None:
                 opt['size'] = f"{(opt['size'] / (1024 * 1024)):.2f} MB"


        video_info = {
            'title': info_dict.get('title', 'Unknown Title'),
            'thumbnail': info_dict.get('thumbnail', ''),
            'duration': format_duration(info_dict.get('duration')),
            'author': info_dict.get('uploader', 'Unknown Author'),
            'options': download_options,
        }

        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps(video_info)
        }

    except Exception as e:
        print(f"Error fetching video info: {e}")
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'error': f'Error fetching video info: {str(e)}' })
        }

