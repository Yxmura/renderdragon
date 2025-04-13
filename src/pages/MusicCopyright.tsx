
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Music, Search, AlertCircle, Check, X, RefreshCcw, Play, Pause, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface SongResult {
  id: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear?: number;
  copyright: 'safe' | 'claim' | 'block' | 'unknown';
  details: string;
  source?: string;
}

// Mock song database
const mockSongResults: SongResult[] = [
  {
    id: '1',
    title: 'Adventure Time',
    artist: 'MusicRoyaltyFree',
    album: 'Minecraft Adventures',
    releaseYear: 2022,
    copyright: 'safe',
    details: 'This track is completely free to use in your Minecraft videos with no copyright claims. No attribution required.',
    source: 'NCS (NoCopyrightSounds)'
  },
  {
    id: '2',
    title: 'Epic Battle',
    artist: 'GameMusicPro',
    album: 'Gaming Anthems Vol. 2',
    releaseYear: 2020,
    copyright: 'claim',
    details: 'This song may trigger Content ID claims on YouTube. The copyright holder typically allows usage but will place ads on your video and collect the revenue.',
    source: 'Universal Music Group'
  },
  {
    id: '3',
    title: 'Creeper Beats',
    artist: 'MinecraftFan99',
    releaseYear: 2019,
    copyright: 'safe',
    details: 'This fan-made Minecraft track is free to use in your content. The creator only asks for attribution in your video description.',
    source: 'Independent Artist'
  },
  {
    id: '4',
    title: 'Dramatic Showdown',
    artist: 'CopyrightMusic',
    album: 'Premium Tracks',
    releaseYear: 2021,
    copyright: 'block',
    details: 'This track is not safe for YouTube. Videos using this song will likely be blocked worldwide due to strict copyright enforcement.',
    source: 'Sony Music Entertainment'
  },
  {
    id: '5',
    title: 'Mining All Day',
    artist: 'BlockBeats',
    album: 'Minecraft Parodies',
    releaseYear: 2018,
    copyright: 'claim',
    details: 'This Minecraft parody song may result in a Content ID claim, but most creators are allowed to use it with monetization shared with the copyright holder.',
    source: 'Warner Music Group'
  }
];

const MusicCopyright = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [searchResults, setSearchResults] = useState<SongResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('song');
  const [selectedSong, setSelectedSong] = useState<SongResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.title = 'Music Copyright Checker - Renderdragon';
  }, []);

  const handleSongSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a song title or artist");
      return;
    }
    
    setIsLoading(true);
    setSearchResults([]);
    
    // Simulate API search
    setTimeout(() => {
      const results = mockSongResults.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast.info("No songs found", {
          description: "Try a different search term",
        });
      }
    }, 1500);
  };

  const handleYoutubeCheck = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(youtubeUrl)) {
      toast.error("Invalid YouTube URL");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API check
    setTimeout(() => {
      // For demo purposes, just show the first mock result
      setSelectedSong(mockSongResults[0]);
      setIsLoading(false);
      
      toast.success("Song identified!", {
        description: `Found "${mockSongResults[0].title}" by ${mockSongResults[0].artist}`,
      });
    }, 2000);
  };

  const handleSongSelect = (song: SongResult) => {
    setSelectedSong(song);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getCopyrightBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return (
          <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-xs">
            <Check className="h-3.5 w-3.5" />
            <span>Safe to use</span>
          </div>
        );
      case 'claim':
        return (
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md text-xs">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>May cause claims</span>
          </div>
        );
      case 'block':
        return (
          <div className="flex items-center gap-1 bg-red-500/10 text-red-500 px-2 py-1 rounded-md text-xs">
            <X className="h-3.5 w-3.5" />
            <span>Not safe</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 bg-gray-500/10 text-gray-500 px-2 py-1 rounded-md text-xs">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Unknown</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Music Copyright</span> Checker
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Check if a song is safe to use in your Minecraft videos without copyright issues.
              Avoid strikes and claim problems before uploading your content.
            </p>
            
            <Alert className="mb-8 pixel-corners">
              <Info className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                This tool provides general information and is not a guarantee against copyright claims.
                Copyright policies may change over time, and different regions may have different rules.
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="song" value={activeTab} onValueChange={setActiveTab} className="pixel-card mb-8">
              <TabsList className="grid w-full grid-cols-2 pixel-corners">
                <TabsTrigger value="song">Search by Song</TabsTrigger>
                <TabsTrigger value="youtube">Check YouTube Video</TabsTrigger>
              </TabsList>
              
              <TabsContent value="song" className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter song title or artist"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pixel-corners flex-grow"
                  />
                  
                  <Button 
                    onClick={handleSongSearch}
                    disabled={isLoading}
                    className="pixel-btn-primary flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        <span>Search</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="youtube" className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Paste YouTube video URL"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pixel-corners flex-grow"
                  />
                  
                  <Button 
                    onClick={handleYoutubeCheck}
                    disabled={isLoading}
                    className="pixel-btn-primary flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <Music className="h-4 w-4 mr-2" />
                        <span>Check</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {isLoading && activeTab === 'song' && (
              <div className="text-center py-12 animate-pulse">
                <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                <p className="text-lg">Searching for songs...</p>
              </div>
            )}
            
            {isLoading && activeTab === 'youtube' && (
              <div className="text-center py-12 animate-pulse">
                <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                <p className="text-lg">Analyzing audio from video...</p>
              </div>
            )}
            
            {/* Search Results */}
            {!isLoading && activeTab === 'song' && searchResults.length > 0 && (
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-vt323">Search Results</h2>
                
                <div className="space-y-3">
                  {searchResults.map(song => (
                    <div 
                      key={song.id}
                      className={`pixel-card cursor-pointer transition-all ${
                        selectedSong?.id === song.id ? 'border-primary' : 'hover:border-accent'
                      }`}
                      onClick={() => handleSongSelect(song)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{song.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {song.artist} {song.album && `• ${song.album}`} {song.releaseYear && `• ${song.releaseYear}`}
                          </p>
                        </div>
                        
                        {getCopyrightBadge(song.copyright)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selected Song Details */}
            {selectedSong && (
              <div className="pixel-card space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-vt323">{selectedSong.title}</h2>
                    <p className="text-muted-foreground">
                      {selectedSong.artist} {selectedSong.album && `• ${selectedSong.album}`} 
                      {selectedSong.releaseYear && `• ${selectedSong.releaseYear}`}
                    </p>
                  </div>
                  
                  {getCopyrightBadge(selectedSong.copyright)}
                </div>
                
                <div className="bg-accent/30 rounded-md p-4">
                  <h3 className="font-vt323 mb-2">Copyright Information</h3>
                  <p className="text-muted-foreground mb-2">{selectedSong.details}</p>
                  
                  {selectedSong.source && (
                    <p className="text-xs text-muted-foreground">Source: {selectedSong.source}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 bg-muted/30 rounded-md p-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={togglePlay}
                    className="h-10 w-10 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <div className="flex-grow">
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-primary transition-all duration-100 ${
                          isPlaying ? 'animate-[progress_20s_linear]' : ''
                        }`}
                        style={{ width: isPlaying ? '100%' : '0%' }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isPlaying ? 'Playing preview...' : 'Click to play preview'}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="pixel-corners"
                    onClick={() => setSelectedSong(null)}
                  >
                    Back to results
                  </Button>
                  
                  {selectedSong.copyright === 'safe' && (
                    <Button className="pixel-btn-primary">
                      <Check className="h-4 w-4 mr-2" />
                      <span>Safe to Use</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
            
            {!isLoading && activeTab === 'song' && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different search term or check the spelling</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MusicCopyright;
