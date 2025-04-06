
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

export function extractYouTubeID(url: string): string | null {
  // Regular expressions to match YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
}

// Mock database for copyright detection
const mockCopyrightDatabase = [
  {
    id: '1',
    title: 'Adventure Time',
    artist: 'MusicRoyaltyFree',
    album: 'Minecraft Adventures',
    releaseYear: 2022,
    copyrightStatus: 'safe' as const,
    details: 'This track is completely free to use in your videos with no copyright claims. No attribution required.',
    source: 'NCS (NoCopyrightSounds)',
    previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
    matchConfidence: 0.95,
    matchDetails: [
      { type: 'License', description: 'Creative Commons (CC BY)' },
      { type: 'Distribution', description: 'Widely available for content creators' }
    ],
    recommendations: [
      'Can be used in monetized content',
      'No attribution required',
      'Safe for all platforms'
    ]
  },
  {
    id: '2',
    title: 'Epic Battle',
    artist: 'GameMusicPro',
    album: 'Gaming Anthems Vol. 2',
    releaseYear: 2020,
    copyrightStatus: 'claim' as const,
    details: 'This song may trigger Content ID claims on YouTube. The copyright holder typically allows usage but will place ads on your video and collect the revenue.',
    source: 'Universal Music Group',
    previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_07_-_Downfall.mp3',
    matchConfidence: 0.87,
    matchDetails: [
      { type: 'Policy', description: 'Monetization shared with rights holder' },
      { type: 'Usage', description: 'Allowed with revenue sharing' }
    ],
    recommendations: [
      'Can be used but revenue will be shared',
      'Consider purchasing a license for full monetization',
      'Track your Content ID claims'
    ]
  },
  {
    id: '3',
    title: 'Creeper Beats',
    artist: 'MinecraftFan99',
    releaseYear: 2019,
    copyrightStatus: 'likely_safe' as const,
    details: 'This fan-made Minecraft track is free to use in your content. The creator only asks for attribution in your video description.',
    source: 'Independent Artist',
    previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3',
    matchConfidence: 0.82,
    matchDetails: [
      { type: 'Attribution', description: 'Required in video description' },
      { type: 'Usage', description: 'Free to use in gaming content' }
    ],
    recommendations: [
      'Include attribution in description',
      'Safe for gaming content',
      'Contact creator for commercial use outside of YouTube'
    ]
  },
  {
    id: '4',
    title: 'Dramatic Showdown',
    artist: 'CopyrightMusic',
    album: 'Premium Tracks',
    releaseYear: 2021,
    copyrightStatus: 'block' as const,
    details: 'This track is not safe for YouTube. Videos using this song will likely be blocked worldwide due to strict copyright enforcement.',
    source: 'Sony Music Entertainment',
    previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Jahzzar/Tumbling_Dishes_Like_Old-Mans_Memories/Jahzzar_-_10_-_Take_Me_Higher.mp3',
    matchConfidence: 0.92,
    matchDetails: [
      { type: 'Restriction', description: 'Worldwide block policy' },
      { type: 'License', description: 'Not available for content creators' }
    ],
    recommendations: [
      'Do not use in any content',
      'Find alternative royalty-free music',
      'Contact publisher for commercial licensing (likely expensive)'
    ]
  },
  {
    id: '5',
    title: 'Mining All Day',
    artist: 'BlockBeats',
    album: 'Minecraft Parodies',
    releaseYear: 2018,
    copyrightStatus: 'likely_claim' as const,
    details: 'This Minecraft parody song may result in a Content ID claim, but most creators are allowed to use it with monetization shared with the copyright holder.',
    source: 'Warner Music Group',
    previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
    matchConfidence: 0.78,
    matchDetails: [
      { type: 'Parody', description: 'Based on copyrighted material' },
      { type: 'Policy', description: 'Usually allowed with revenue sharing' }
    ],
    recommendations: [
      'Expect Content ID claims',
      'Revenue will likely be shared',
      'Verify policy for specific regions'
    ]
  }
];

// Check API keys are available
function checkApiKeysAvailable(): boolean {
  // In a real implementation, this would check if the API keys are set in the environment
  // For this mockup, we'll just return a value based on whether the env vars exist
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const contentIdApiKey = import.meta.env.VITE_CONTENT_ID_API_KEY;
  const audioDbApiKey = import.meta.env.VITE_AUDIO_DB_API_KEY;
  
  return !!(youtubeApiKey && contentIdApiKey && audioDbApiKey);
}

export async function checkCopyrightStatus(query: string, isYoutubeUrl: boolean): Promise<CopyrightResult> {
  // Check if API keys are available
  const apiKeysAvailable = checkApiKeysAvailable();
  
  if (!apiKeysAvailable) {
    console.warn("API keys not available. Using mock data only.");
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would make API calls to YouTube, content ID databases, etc.
  // For now, we'll use mock data and simulate different confidence levels
  
  // For YouTube URLs, simulate extracting audio and analyzing
  if (isYoutubeUrl) {
    const youtubeId = extractYouTubeID(query);
    
    // In a real implementation, this would call YouTube API to get video details
    // Then analyze the audio against copyright databases
    
    // For the mock, return a random result
    const randomResultIndex = Math.floor(Math.random() * mockCopyrightDatabase.length);
    const mockResult = { ...mockCopyrightDatabase[randomResultIndex] };
    
    // Add YouTube-specific details
    mockResult.source = mockResult.source + " (via YouTube Content ID)";
    mockResult.details = "Analysis based on YouTube audio track. " + mockResult.details;
    
    return {
      ...mockResult,
      id: youtubeId || mockResult.id,
      status: 'success'
    };
  } else {
    // Search by song title/artist
    const searchQuery = query.toLowerCase();
    
    // Search in mock database
    const matchingTracks = mockCopyrightDatabase.filter(track => 
      track.title.toLowerCase().includes(searchQuery) || 
      track.artist.toLowerCase().includes(searchQuery)
    );
    
    if (matchingTracks.length > 0) {
      // Return the best match
      return {
        ...matchingTracks[0],
        status: 'success'
      };
    } else {
      // No matches found - in a real implementation, we'd try additional APIs
      // For the mock, create a "not found" result with uncertain copyright status
      return {
        id: 'unknown',
        title: query,
        artist: 'Unknown Artist',
        copyrightStatus: 'unknown',
        details: 'No definitive copyright information found for this track. Consider researching further or using alternative music.',
        status: 'error',
        message: 'Could not find definitive information on this track',
        recommendations: [
          'Search with more specific artist and title information',
          'Consider using licensed royalty-free music instead',
          'Contact a music licensing expert for further assistance'
        ]
      };
    }
  }
}

// This would be an API endpoint in a real implementation
export async function checkCopyrightApi(options: {
  youtubeId?: string;
  title?: string;
  artist?: string;
}): Promise<CopyrightResult> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would:
  // 1. Call YouTube API to get video details if youtubeId is provided
  // 2. Use audio fingerprinting API to identify the song
  // 3. Check copyright databases for the song's status
  // 4. Return detailed results
  
  // For the mock, return a random result with varying confidence
  const randomIndex = Math.floor(Math.random() * mockCopyrightDatabase.length);
  return {
    ...mockCopyrightDatabase[randomIndex],
    status: 'success'
  };
}
