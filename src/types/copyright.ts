
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
  status: string;
  title: string;
  artist: string;
  confidence: number;
  riskAssessment: string;
  recommendedAction: string;
  platforms: {
    youtube: string;
    twitch: string;
  };
  sources: {
    contentId: string;
    pro: string;
    drm: string;
    publicDomain: string;
    royaltyFree: string;
    commercialDatabases: string;
    openSources: string;
  };
  sourceAnalysis: {
    commercialPresence: boolean;
    openSourcePresence: boolean;
    totalMatches: number;
  };
  processingTime: string;
  sourcesChecked: string[];
  sourceStats: {
    total: number;
    successful: number;
    coverage: number;
  };
  lastUpdated: string;
  apiVersion: string;
  imageUrl?: string;
  riskFactors?: {
    commercial: number;
    popularity: number;
    official: number;
    label: number;
    distribution: number;
  };
  totalRiskScore?: number;
  youtubeAnalysis?: {
    totalVideos: number;
    officialContent: number;
    userGeneratedContent: number;
    userContentRatio: number;
    assessment: string;
  };
  error?: string;
}
