import json
import os
from urllib.parse import parse_qs, urlparse
from yt_dlp import YoutubeDL
import tempfile

def handler(event, context):
    query_params = event.get('queryStringParameters', {})
    video_url = query_params.get('url')
    # We'll use the format_id from the frontend to select the specific format
    format_id = query_params.get('formatId')

    if not video_url or not format_id:
        return {
            'statusCode': 400,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'error': 'Missing parameters (url or formatId)' })
        }

    try:
        # Use a temporary directory for the download
        with tempfile.TemporaryDirectory() as tmpdir:
            ydl_opts = {
                'format': format_id, # Use the selected format_id
                'outtmpl': os.path.join(tmpdir, '%(title)s.%(ext)s'), # Output to temp dir
                'logger': None,
                'verbose': False,
                'no_warnings': True,
                'ignoreerrors': False, # We want to know if the download fails
            }
            with YoutubeDL(ydl_opts) as ydl:
                 info_dict = ydl.extract_info(video_url, download=True) # download=True

            if info_dict is None:
                 return {
                    'statusCode': 404,
                    'headers': { 'Content-Type': 'application/json' },
                    'body': json.dumps({ 'error': 'Video not found or cannot be downloaded' })
                }

            # Find the downloaded file path
            downloaded_file_path = ydl.prepare_filename(info_dict)

            # Read the file content and return it
            try:
                with open(downloaded_file_path, 'rb') as f:
                    file_content = f.read()

                # Determine content type based on file extension
                filename = os.path.basename(downloaded_file_path)
                ext = os.path.splitext(filename)[1].lower()
                content_type = 'application/octet-stream'
                if ext == '.mp4':
                    content_type = 'video/mp4'
                elif ext == '.webm':
                    content_type = 'video/webm'
                elif ext == '.mp3':
                    content_type = 'audio/mpeg'
                elif ext == '.aac':
                    content_type = 'audio/aac'
                # Add more mime types as needed

                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': content_type,
                        'Content-Disposition': f'attachment; filename="{filename}"'
                    },
                    'body': file_content,
                    'encoding': 'base64' # Vercel requires base64 encoding for binary responses
                }

            except FileNotFoundError:
                 return {
                    'statusCode': 500,
                    'headers': { 'Content-Type': 'application/json' },
                    'body': json.dumps({ 'error': 'Downloaded file not found.' })
                }

    except Exception as e:
        print(f"Error during download: {e}")
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'error': f'Error during download: {str(e)}' })
        }

