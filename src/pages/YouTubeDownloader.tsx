
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, AlertCircle, Check, RefreshCcw, Youtube, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface DownloadOption {
  id: string;
  label: string;
  format: string;
  quality: string;
  size: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  options: DownloadOption[];
}

const mockVideoInfo: VideoInfo = {
  title: 'How to Build a Minecraft Castle - Tutorial',
  thumbnail: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=2574',
  duration: '15:42',
  author: 'MinecraftMaster',
  options: [
    { id: '1', label: 'MP4 - 1080p (HD)', format: 'mp4', quality: '1080p', size: '256 MB' },
    { id: '2', label: 'MP4 - 720p (HD)', format: 'mp4', quality: '720p', size: '128 MB' },
    { id: '3', label: 'MP4 - 480p', format: 'mp4', quality: '480p', size: '64 MB' },
    { id: '4', label: 'MP4 - 360p', format: 'mp4', quality: '360p', size: '32 MB' },
    { id: '5', label: 'MP3 - 320kbps (Audio)', format: 'mp3', quality: '320kbps', size: '15 MB' },
    { id: '6', label: 'MP3 - 128kbps (Audio)', format: 'mp3', quality: '128kbps', size: '6 MB' }
  ]
};

const YouTubeDownloader = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');

  useEffect(() => {
    document.title = 'YouTube Downloader - Creator On Wheels';
  }, []);

  const isValidYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    setUrlError(url.length > 0 && !isValidYoutubeUrl(url));
  };

  const handleDownloadTypeChange = (value: 'video' | 'audio') => {
    setDownloadType(value);
    setSelectedOption('');
  };

  const handleFetchInfo = () => {
    if (!youtubeUrl) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    if (!isValidYoutubeUrl(youtubeUrl)) {
      setUrlError(true);
      toast.error("Invalid YouTube URL");
      return;
    }
    
    setIsLoading(true);
    setVideoInfo(null);
    setSelectedOption('');
    
    // Simulate API fetch
    setTimeout(() => {
      setVideoInfo(mockVideoInfo);
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!videoInfo || !selectedOption) {
      toast.error("Please select a format first");
      return;
    }
    
    const option = videoInfo.options.find(opt => opt.id === selectedOption);
    if (!option) return;
    
    toast.success("Starting download...", {
      description: `Downloading ${option.label}`,
      duration: 3000,
    });
    
    // In a real app, this would trigger the actual download
    // For demo purposes, we're just showing a toast notification
  };

  const filteredOptions = videoInfo?.options.filter(option => 
    downloadType === 'video' ? option.format === 'mp4' : option.format === 'mp3'
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">YouTube</span> Downloader
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Download YouTube videos for content creation purposes. Always respect copyright laws
              and only download videos you have permission to use.
            </p>
            
            <Alert className="mb-8 pixel-corners">
              <Info className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                This tool is for educational purposes only. You are responsible for 
                ensuring you have the right to download and use any content.
              </AlertDescription>
            </Alert>
            
            <div className="pixel-card mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Paste YouTube URL here"
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                  className={`pixel-corners flex-grow ${urlError ? 'border-red-500' : ''}`}
                />
                
                <Button 
                  onClick={handleFetchInfo}
                  disabled={isLoading}
                  className="pixel-btn-primary flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Youtube className="h-4 w-4 mr-2" />
                      <span>Fetch Video Info</span>
                    </>
                  )}
                </Button>
              </div>
              
              {urlError && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Please enter a valid YouTube URL
                </p>
              )}
            </div>
            
            {isLoading && (
              <div className="text-center py-12 animate-pulse">
                <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                <p className="text-lg">Fetching video information...</p>
              </div>
            )}
            
            {videoInfo && (
              <div className="pixel-card space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/5">
                    <div className="rounded-md overflow-hidden">
                      <img 
                        src={videoInfo.thumbnail} 
                        alt={videoInfo.title}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-3/5">
                    <h2 className="text-xl font-vt323 mb-2">
                      {videoInfo.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                        <span className="mr-1">Duration:</span> {videoInfo.duration}
                      </div>
                      
                      <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                        <span className="mr-1">Channel:</span> {videoInfo.author}
                      </div>
                    </div>
                    
                    <RadioGroup
                      value={downloadType}
                      onValueChange={(value) => handleDownloadTypeChange(value as 'video' | 'audio')}
                      className="flex gap-4 mb-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video">Video</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="audio" id="audio" />
                        <Label htmlFor="audio">Audio only</Label>
                      </div>
                    </RadioGroup>
                    
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger className="pixel-corners">
                        <SelectValue placeholder="Select format & quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label} ({option.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  disabled={!selectedOption}
                  className="w-full pixel-btn-primary flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  <span>Download {downloadType === 'video' ? 'Video' : 'Audio'}</span>
                </Button>
              </div>
            )}
            
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-vt323 text-center mb-6">How to Use Properly</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="pixel-card">
                  <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                    <span className="font-vt323 text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-vt323 text-center mb-2">Paste URL</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Copy the YouTube video URL and paste it in the input field above.
                  </p>
                </div>
                
                <div className="pixel-card">
                  <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                    <span className="font-vt323 text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-vt323 text-center mb-2">Select Format</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Choose between video or audio-only, then select your preferred quality.
                  </p>
                </div>
                
                <div className="pixel-card">
                  <div className="flex items-center justify-center h-12 w-12 bg-cow-purple/20 rounded-full mx-auto mb-4">
                    <span className="font-vt323 text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-vt323 text-center mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Click the download button and wait for the file to be processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default YouTubeDownloader;
