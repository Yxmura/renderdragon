import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Music, Search, AlertCircle, Check, X, RefreshCcw, Play, Pause, Info, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { checkCopyrightStatus, extractYouTubeID } from '@/utils/copyrightChecker';
import { CopyrightResult } from '@/types/copyright';
import DonateButton from '@/components/DonateButton';

const MusicCopyright = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CopyrightResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.title = 'Music Copyright Checker - Renderdragon';
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a song title, artist, or YouTube URL");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const isYouTube = extractYouTubeID(searchQuery) !== null;
      const copyrightData = await checkCopyrightStatus(searchQuery, isYouTube);

      setResult(copyrightData);
      setIsPlaying(false);

      if (copyrightData.status === 'error') {
        toast.error("Error checking copyright", {
          description: copyrightData.message || "Failed to analyze the song",
        });
      } else {
        toast.success("Analysis complete", {
          description: `Copyright status: ${getCopyrightStatusText(copyrightData.copyrightStatus)}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process request", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getCopyrightStatusText = (status: string): string => {
    switch (status) {
      case 'safe':
        return 'Safe to use';
      case 'likely_safe':
        return 'Likely safe to use';
      case 'claim':
        return 'May cause claims';
      case 'likely_claim':
        return 'Likely to cause claims';
      case 'block':
        return 'Not safe to use';
      case 'likely_block':
        return 'Likely to be blocked';
      default:
        return 'Unknown status';
    }
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
      case 'likely_safe':
        return (
          <div className="flex items-center gap-1 bg-green-300/10 text-green-400 px-2 py-1 rounded-md text-xs">
            <Check className="h-3.5 w-3.5" />
            <span>Likely safe to use</span>
          </div>
        );
      case 'claim':
        return (
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md text-xs">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>May cause claims</span>
          </div>
        );
      case 'likely_claim':
        return (
          <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-md text-xs">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Likely to cause claims</span>
          </div>
        );
      case 'block':
        return (
          <div className="flex items-center gap-1 bg-red-500/10 text-red-500 px-2 py-1 rounded-md text-xs">
            <X className="h-3.5 w-3.5" />
            <span>Not safe to use</span>
          </div>
        );
      case 'likely_block':
        return (
          <div className="flex items-center gap-1 bg-red-400/10 text-red-400 px-2 py-1 rounded-md text-xs">
            <X className="h-3.5 w-3.5" />
            <span>Likely to be blocked</span>
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

  const isYoutubeUrl = (text: string): boolean => {
    return extractYouTubeID(text) !== null;
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
              Check if a song is safe to use in your videos without copyright issues.
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
            
            <div className="pixel-card mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Enter song title, artist, or YouTube URL"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pixel-corners flex-grow"
                />
                
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="pixel-btn-primary flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : isYoutubeUrl(searchQuery) ? (
                    <>
                      <Youtube className="h-4 w-4 mr-2" />
                      <span>Check Video</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      <span>Search</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {isLoading && (
              <div className="text-center py-12 animate-pulse">
                <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                <p className="text-lg">
                  {isYoutubeUrl(searchQuery) 
                    ? "Analyzing audio from video..." 
                    : "Searching music databases..."}
                </p>
              </div>
            )}
            
            {!isLoading && result && (
              <div className="pixel-card space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-vt323">{result.title}</h2>
                    <p className="text-muted-foreground">
                      {result.artist} {result.album && `• ${result.album}`} 
                      {result.releaseYear && `• ${result.releaseYear}`}
                    </p>
                  </div>
                  {getCopyrightBadge(result.copyrightStatus)}
                </div>
                <div className="bg-accent/30 rounded-md p-4">
                  <h3 className="font-vt323 mb-2">Copyright Information</h3>
                  <p className="text-muted-foreground mb-2">{result.details}</p>
                  {result.source && (
                    <p className="text-xs text-muted-foreground">Source: {result.source}</p>
                  )}
                </div>
                {result.matchDetails && (
                  <div className="bg-muted/30 rounded-md p-4">
                    <h3 className="font-vt323 mb-2">Match Details</h3>
                    <div className="space-y-2">
                      {result.matchDetails.map((detail, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{detail.type}: </span>
                          <span className="text-muted-foreground">{detail.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {result.recommendations && (
                  <div className="bg-muted/30 rounded-md p-4">
                    <h3 className="font-vt323 mb-2">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {result.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {!isLoading && !result && searchQuery && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">No results found</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different search term or check the spelling</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <DonateButton />
    </div>
  );
};

export default MusicCopyright;
