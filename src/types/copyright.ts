
export interface VideoInfo {
  title: string;
  channel: string;
  license: string;
  is_copyrighted: boolean;
  description: string;
  thumbnail: string | null;
  duration: string;
  view_count: number;
  upload_date: string;
  url: string;
}

export interface SpotifyTrackInfo {
  title: string;
  artist: string;
  album: string;
  release_date: string;
  spotify_url: string;
  thumbnail: string | null;
  is_copyrighted: boolean;
  copyright_text: string;
}

export interface ChannelInfo {
  title: string;
  description: string;
  subscribers: string;
  views: string;
  videos: string;
  watch_hours: number;
  created_at: string;
  profile_pic: string;
  banner_url: string | null;
}

export interface YouTubeSearchResult {
  title: string;
  video_id: string;
  published_at?: string;
}

export interface CopyrightResult {
  id: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear?: number;
  copyrightStatus: 'safe' | 'likely_safe' | 'claim' | 'likely_claim' | 'block' | 'likely_block' | 'unknown';
  details: string;
  source?: string;
  previewUrl?: string;
  status?: 'success' | 'error';
  message?: string;
  matchDetails?: Array<{ type: string; description: string }>;
  recommendations?: string[];
}
