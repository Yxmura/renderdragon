
import { YouTubeSearchResult, SpotifyTrackInfo, VideoInfo, ChannelInfo, CopyrightResult } from '@/types/copyright';

// YouTube URL pattern
export const YOUTUBE_URL_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

// Extract YouTube ID from URL
export function extractYouTubeID(url: string): string | null {
  const match = url.match(YOUTUBE_URL_PATTERN);
  return match && match[1] ? match[1] : null;
}

// Cache mechanism for copyright checking
class CopyrightCache {
  private cache: Record<string, any> = {};
  
  constructor() {
    try {
      const savedCache = localStorage.getItem('copyright_cache');
      if (savedCache) {
        this.cache = JSON.parse(savedCache);
      }
    } catch (error) {
      console.error('Failed to load cache:', error);
      this.cache = {};
    }
  }
  
  get(key: string): any | null {
    return this.cache[key] || null;
  }
  
  set(key: string, value: any): void {
    this.cache[key] = value;
    try {
      localStorage.setItem('copyright_cache', JSON.stringify(this.cache));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }
}

const copyrightCache = new CopyrightCache();

// YouTube information extraction
export async function getYouTubeInfo(url: string): Promise<VideoInfo | null> {
  // Check cache first
  const cachedInfo = copyrightCache.get(url);
  if (cachedInfo) {
    return cachedInfo;
  }
  
  try {
    const videoId = extractYouTubeID(url);
    if (!videoId) return null;
    
    // In a real implementation, this would call the YouTube API
    // For now, we'll simulate the response with sample data
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const videoData = data.items[0];
    const snippet = videoData.snippet;
    const contentDetails = videoData.contentDetails;
    const statistics = videoData.statistics;
    
    // Determine copyright status from title and description
    const title = snippet.title.toLowerCase();
    const description = snippet.description.toLowerCase();
    const licenseString = snippet.licensedContent ? 'Standard YouTube License' : 'Creative Commons';
    
    const isCreativeCommons = licenseString.toLowerCase() === 'creative commons' || 
                              description.includes('creative commons');
                              
    const noCopyrightTerms = ['no copyright', 'free to use', 'royalty-free', 'copyright free', 'public domain', 'royalty free music'];
    const containsNoCopyright = noCopyrightTerms.some(term => title.includes(term) || description.includes(term));
    
    const isCopyrighted = !(isCreativeCommons || containsNoCopyright);
    
    const videoInfo: VideoInfo = {
      title: snippet.title,
      channel: snippet.channelTitle,
      license: licenseString,
      is_copyrighted: isCopyrighted,
      description: snippet.description,
      thumbnail: snippet.thumbnails.high.url,
      duration: contentDetails.duration,
      view_count: parseInt(statistics.viewCount || '0'),
      upload_date: snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
    
    // Save to cache
    copyrightCache.set(url, videoInfo);
    
    return videoInfo;
  } catch (error) {
    console.error('Error getting YouTube info:', error);
    return null;
  }
}

// Spotify search
export async function searchSpotifyTrack(query: string): Promise<SpotifyTrackInfo | null> {
  try {
    // In a real implementation, this would call the Spotify API
    // For demonstration, we'll use a mock implementation
    const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    
    if (!spotifyClientId || !spotifyClientSecret) {
      throw new Error('Spotify API credentials not configured');
    }
    
    // Get access token (this would normally be done with proper OAuth flow)
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${spotifyClientId}:${spotifyClientSecret}`)
      },
      body: 'grant_type=client_credentials'
    });
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Search for tracks
    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const searchData = await searchResponse.json();
    
    if (!searchData.tracks || !searchData.tracks.items || searchData.tracks.items.length === 0) {
      return null;
    }
    
    const track = searchData.tracks.items[0];
    
    // Get album details to check for copyright
    const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${track.album.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const albumData = await albumResponse.json();
    
    let copyrighted = true;
    let copyrightText = 'No copyright information available';
    
    if (albumData.copyrights && albumData.copyrights.length > 0) {
      copyrightText = albumData.copyrights[0].text;
      const copyrightLower = copyrightText.toLowerCase();
      if (copyrightLower.includes('creative commons') || 
          copyrightLower.includes('public domain') || 
          copyrightLower.includes('cc0')) {
        copyrighted = false;
      }
    }
    
    return {
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      release_date: track.album.release_date,
      spotify_url: track.external_urls.spotify,
      thumbnail: track.album.images[0]?.url,
      is_copyrighted: copyrighted,
      copyright_text: copyrightText
    };
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return null;
  }
}

// Main copyright check function
export async function checkCopyright(query: string): Promise<{ type: 'youtube' | 'spotify' | 'unknown', data: any }> {
  if (query.match(YOUTUBE_URL_PATTERN)) {
    const info = await getYouTubeInfo(query);
    return { type: 'youtube', data: info };
  } else {
    // Try Spotify
    const info = await searchSpotifyTrack(query);
    if (info) {
      return { type: 'spotify', data: info };
    }
    
    // No results
    return { 
      type: 'unknown', 
      data: { 
        error: 'No results found',
        message: 'Could not find any information for the provided query'
      } 
    };
  }
}

// Format YouTube duration (ISO 8601 format)
export function formatDuration(isoDuration: string): string {
  let duration = isoDuration.replace('PT', '');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  
  if (duration.includes('H')) {
    const parts = duration.split('H');
    hours = parseInt(parts[0]);
    duration = parts[1];
  }
  
  if (duration.includes('M')) {
    const parts = duration.split('M');
    minutes = parseInt(parts[0]);
    duration = parts[1];
  }
  
  if (duration.includes('S')) {
    seconds = parseInt(duration.replace('S', ''));
  }
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Get video info directly via YouTube API
export async function getVideoInfo(videoUrl: string): Promise<any> {
  try {
    const videoId = extractYouTubeID(videoUrl);
    if (!videoId) throw new Error('Invalid YouTube URL');
    
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    // Get video details
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${apiKey}`);
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const video = videoData.items[0];
    const channelId = video.snippet.channelId;
    
    // Get channel details
    const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,statistics&key=${apiKey}`);
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const channel = channelData.items[0];
    
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      channel_title: video.snippet.channelTitle,
      publish_date: video.snippet.publishedAt,
      views: video.statistics.viewCount || '0',
      likes: video.statistics.likeCount || '0',
      comments: video.statistics.commentCount || '0',
      duration: video.contentDetails.duration,
      channel_subscribers: channel.statistics.subscriberCount || '0',
      channel_videos: channel.statistics.videoCount || '0',
      thumbnail: video.snippet.thumbnails.high?.url
    };
  } catch (error) {
    console.error('Error getting video info:', error);
    throw error;
  }
}

// Get channel details
export async function getChannelDetails(channelId: string): Promise<ChannelInfo | null> {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,statistics,brandingSettings,contentDetails&key=${apiKey}`);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const channel = data.items[0];
    const statistics = channel.statistics;
    const snippet = channel.snippet;
    const branding = channel.brandingSettings;
    
    return {
      title: snippet.title,
      description: snippet.description || 'No description',
      subscribers: statistics.subscriberCount || 'N/A',
      views: statistics.viewCount || 'N/A',
      videos: statistics.videoCount || 'N/A',
      watch_hours: Math.round(parseInt(statistics.viewCount || '0') / 1000 * 100) / 100, // rough estimate
      created_at: snippet.publishedAt,
      profile_pic: snippet.thumbnails.high.url,
      banner_url: branding.image?.bannerExternalUrl || null
    };
  } catch (error) {
    console.error('Error getting channel details:', error);
    return null;
  }
}

// Get latest video from a channel
export async function getLatestVideo(channelId: string): Promise<YouTubeSearchResult | null> {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=1&key=${apiKey}`);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const video = data.items[0];
    
    return {
      title: video.snippet.title,
      video_id: video.id.videoId,
      published_at: video.snippet.publishedAt
    };
  } catch (error) {
    console.error('Error getting latest video:', error);
    return null;
  }
}

// Get top video from a channel by view count
export async function getTopVideo(channelId: string): Promise<YouTubeSearchResult | null> {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=viewCount&maxResults=1&key=${apiKey}`);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const video = data.items[0];
    
    return {
      title: video.snippet.title,
      video_id: video.id.videoId
    };
  } catch (error) {
    console.error('Error getting top video:', error);
    return null;
  }
}

// Get channel ID from a handle
export async function getChannelIdFromHandle(handle: string): Promise<{ channelId: string, channelName: string } | null> {
  try {
    handle = handle.replace('@', '');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    // Try by username first
    let response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forUsername=${handle}&key=${apiKey}`);
    let data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return {
        channelId: data.items[0].id,
        channelName: data.items[0].snippet.title
      };
    }
    
    // If not found, try search
    response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${handle}&type=channel&maxResults=1&key=${apiKey}`);
    data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return {
        channelId: data.items[0].id.channelId,
        channelName: data.items[0].snippet.title
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting channel ID from handle:', error);
    return null;
  }
}

// New function to check copyright status that MusicCopyright.tsx needs
export async function checkCopyrightStatus(query: string, isYouTubeUrl: boolean = false): Promise<CopyrightResult> {
  try {
    // Generate a random id for the result
    const id = Math.random().toString(36).substring(2, 15);
    
    if (isYouTubeUrl) {
      // Handle YouTube URL check
      const youtubeInfo = await getYouTubeInfo(query);
      
      if (!youtubeInfo) {
        return {
          id,
          title: "Unknown",
          artist: "Unknown",
          copyrightStatus: 'unknown',
          details: "Could not retrieve information from YouTube",
          source: "YouTube (Error)",
          status: 'error',
          message: "Failed to analyze video"
        };
      }
      
      // Determine copyright status from YouTube data
      let copyrightStatus: 'safe' | 'likely_safe' | 'claim' | 'likely_claim' | 'block' | 'likely_block' | 'unknown';
      let details = "";
      
      if (!youtubeInfo.is_copyrighted) {
        if (youtubeInfo.license.toLowerCase().includes('creative commons')) {
          copyrightStatus = 'safe';
          details = "This video is under Creative Commons license and should be safe to use with proper attribution.";
        } else {
          copyrightStatus = 'likely_safe';
          details = "This video appears to be free to use based on its description, but verify with the creator.";
        }
      } else {
        // Check for certain keywords that indicate different levels of copyright
        const description = youtubeInfo.description.toLowerCase();
        const title = youtubeInfo.title.toLowerCase();
        
        if (
          description.includes('copyright strike') || 
          description.includes('not allowed') || 
          description.includes('will be blocked')
        ) {
          copyrightStatus = 'block';
          details = "This video contains content that would likely result in a copyright strike.";
        } else if (
          description.includes('copyright claim') || 
          description.includes('monetized by') || 
          description.includes('will be claimed')
        ) {
          copyrightStatus = 'claim';
          details = "This video contains content that would likely result in a content ID claim.";
        } else {
          copyrightStatus = 'likely_claim';
          details = "This video is likely protected by copyright and may result in claims if used.";
        }
      }
      
      return {
        id,
        title: youtubeInfo.title,
        artist: youtubeInfo.channel,
        album: "YouTube Video",
        copyrightStatus,
        details,
        source: "YouTube Analysis",
        previewUrl: youtubeInfo.url,
        matchDetails: [
          { type: "License", description: youtubeInfo.license },
          { type: "Upload Date", description: youtubeInfo.upload_date },
          { type: "View Count", description: youtubeInfo.view_count.toString() }
        ],
        recommendations: [
          "Always check the video description for specific usage permissions",
          "Contact the creator directly for explicit permission when in doubt",
          "Attribution is often required even for 'free to use' content"
        ]
      };
      
    } else {
      // Handle Spotify/music track check
      const spotifyInfo = await searchSpotifyTrack(query);
      
      if (!spotifyInfo) {
        return {
          id,
          title: query,
          artist: "Unknown",
          copyrightStatus: 'unknown',
          details: "Could not find this song in music databases",
          source: "Music Search",
          status: 'error',
          message: "No matching songs found"
        };
      }
      
      // Determine copyright status from Spotify data
      let copyrightStatus: 'safe' | 'likely_safe' | 'claim' | 'likely_claim' | 'block' | 'likely_block' | 'unknown';
      let details = "";
      
      if (!spotifyInfo.is_copyrighted) {
        copyrightStatus = 'likely_safe';
        details = "This track appears to be under a permissive license and may be safe to use with proper attribution.";
      } else {
        // Most commercial music will be copyrighted
        copyrightStatus = 'claim';
        details = "This is a commercial track that will likely result in Content ID claims if used in videos.";
      }
      
      // Add more specific details based on artist reputation
      const artist = spotifyInfo.artist.toLowerCase();
      if (
        artist.includes('epidemic') || 
        artist.includes('artlist') || 
        artist.includes('audio library') ||
        artist.includes('no copyright')
      ) {
        copyrightStatus = 'likely_safe';
        details = "This appears to be from a royalty-free music provider. If you have a valid subscription, it may be safe to use.";
      } else if (
        artist.includes('universal') || 
        artist.includes('sony') || 
        artist.includes('warner')
      ) {
        copyrightStatus = 'likely_block';
        details = "This track is from a major label and will likely result in copyright strikes if used without permission.";
      }
      
      return {
        id,
        title: spotifyInfo.title,
        artist: spotifyInfo.artist,
        album: spotifyInfo.album,
        releaseYear: new Date(spotifyInfo.release_date).getFullYear(),
        copyrightStatus,
        details,
        source: "Spotify",
        previewUrl: spotifyInfo.spotify_url,
        matchDetails: [
          { type: "Album", description: spotifyInfo.album },
          { type: "Release Date", description: spotifyInfo.release_date },
          { type: "Copyright Text", description: spotifyInfo.copyright_text }
        ],
        recommendations: [
          "Consider using royalty-free alternatives with similar style",
          "YouTube Audio Library offers free music for creators",
          "Subscription services like Epidemic Sound provide cleared music"
        ]
      };
    }
    
  } catch (error) {
    console.error('Error checking copyright status:', error);
    return {
      id: Math.random().toString(36).substring(2, 15),
      title: query,
      artist: "Error",
      copyrightStatus: 'unknown',
      details: "An error occurred while checking copyright status",
      status: 'error',
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
