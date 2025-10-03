'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { Download, AlertCircle, RefreshCcw, Youtube, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import VideoInfoSkeleton from '@/components/skeletons/VideoInfoSkeleton';

interface DownloadOption {
  id: string;
  label: string;
  format: string;
  quality: string;
  size?: string;
  hasVideo: boolean;
  hasAudio: boolean;
  isMuxed: boolean;
  audioBitrate?: number;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  options: DownloadOption[];
}

const YouTubeDownloader: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');
  const [filteredOptions, setFilteredOptions] = useState<DownloadOption[]>([]);
  const [isDownloadingThumb, setIsDownloadingThumb] = useState(false);

  const isValidYoutubeUrl = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url);

  useEffect(() => {
    if (!videoInfo) return;
    let opts: DownloadOption[];
    if (downloadType === 'video') {
      const qualityOrder = ['1080p', '720p', '480p'];
      const videoOptions = videoInfo.options.filter(o => o.hasVideo);
      
      opts = qualityOrder.map(quality => {
        const allForQuality = videoOptions.filter(o => o.quality?.startsWith(quality));
        if (!allForQuality.length) return null;

        // Prefer a muxed version if available, otherwise take the first one.
        return allForQuality.find(o => o.isMuxed) || allForQuality[0];
      }).filter((opt): opt is DownloadOption => !!opt);

    } else {
      opts = videoInfo.options.filter(o => o.hasAudio && !o.hasVideo);
    }
    setFilteredOptions(opts);
    setSelectedOptionId('');
  }, [videoInfo, downloadType]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYoutubeUrl(value);
    setUrlError(value.length > 0 && !isValidYoutubeUrl(value));
    setVideoInfo(null);
  };

  const handleFetchInfo = async () => {
    if (!youtubeUrl || !isValidYoutubeUrl(youtubeUrl)) {
      toast.error('Please enter a valid YouTube URL');
      setUrlError(true);
      return;
    }

    setIsLoadingInfo(true);
    setVideoInfo(null);
    setSelectedOptionId('');
    setUrlError(false);

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const res = await fetch(`/api/info?url=${encodeURIComponent(youtubeUrl)}`, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);
        const responseText = await res.text();

        if (!res.ok) {
          // Handle specific HTTP status codes
          if (res.status === 504) {
            throw new Error('Server timeout - The service is temporarily unavailable. Please try again in a few minutes.');
          } else if (res.status === 503) {
            throw new Error('Service unavailable - The server is temporarily overloaded. Please try again later.');
          } else if (res.status === 429) {
            throw new Error('Rate limit exceeded - Please wait a moment before trying again.');
          } else if (res.status === 403) {
            throw new Error('Access denied - YouTube may be blocking requests. Please try again later.');
          }

          // Try to parse error response
          let errorMessage = responseText;
          try {
            const errorJson = JSON.parse(responseText);
            errorMessage = errorJson.error || errorJson.message || responseText;
          } catch (e) {
            // If it's HTML (like the 504 error page), provide a user-friendly message
            if (responseText.includes('<!DOCTYPE html>')) {
              errorMessage = `Server error (${res.status}) - Please try again in a few minutes.`;
            }
          }
          
          throw new Error(errorMessage);
        }

        const data = JSON.parse(responseText);
        setVideoInfo(data);
        toast.success('Video information loaded successfully!');
        return; // Success, exit retry loop

      } catch (err: unknown) {
        console.error(`Attempt ${attempt} failed:`, err);

        if (err instanceof Error) {
          // Handle AbortError (timeout)
          if (err.name === 'AbortError') {
            const timeoutMsg = 'Request timed out - The server is taking too long to respond. Please try again.';
            
            if (attempt === MAX_RETRIES) {
              toast.error(timeoutMsg);
              break;
            } else {
              toast.warning(`${timeoutMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
            }
          } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            // Network errors
            const networkMsg = 'Network error - Please check your internet connection and try again.';
            
            if (attempt === MAX_RETRIES) {
              toast.error(networkMsg);
              break;
            } else {
              toast.warning(`${networkMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
            }
          } else {
            // Other errors
            if (attempt === MAX_RETRIES) {
              toast.error(`Failed to fetch video info: ${err.message}`);
              break;
            } else {
              toast.warning(`Attempt ${attempt} failed: ${err.message}. Retrying...`);
            }
          }
        } else {
          const genericMsg = 'An unexpected error occurred. Please try again.';
          
          if (attempt === MAX_RETRIES) {
            toast.error(genericMsg);
            break;
          } else {
            toast.warning(`${genericMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
          }
        }

        // Wait before retrying (except on the last attempt)
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        }
      }
    }

    setIsLoadingInfo(false);
  };

  const handleDownloadThumbnail = async () => {
    if (!videoInfo) return;
    setIsDownloadingThumb(true);
    toast.info('Preparing thumbnail download...');
    
    try {
      const title = encodeURIComponent(videoInfo.title);
      const thumbnailUrl = encodeURIComponent(videoInfo.thumbnail);
      const url = `/api/downloadThumbnail?url=${thumbnailUrl}&title=${title}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);
      
      if (!res.ok) {
        // Handle specific HTTP status codes
        if (res.status === 504) {
          throw new Error('Thumbnail download timeout - The server is taking too long to process your request. Please try again.');
        } else if (res.status === 503) {
          throw new Error('Service unavailable - The thumbnail service is temporarily overloaded. Please try again later.');
        } else if (res.status === 404) {
          throw new Error('Thumbnail not found - The video thumbnail may not be available.');
        } else if (res.status === 403) {
          throw new Error('Access denied - The thumbnail may be restricted. Please try again later.');
        }

        // Try to parse error response
        let errorMessage = `Thumbnail download failed (${res.status})`;
        try {
          const errJson = await res.json();
          errorMessage = errJson.error || errJson.message || errorMessage;
        } catch (e) {
          errorMessage = `Thumbnail download failed: ${res.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;

      const contentDisposition = res.headers.get('content-disposition');
      let downloadFilename = `${videoInfo.title}_thumbnail.jpg`; // default
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
        if (filenameMatch && filenameMatch.length > 1) {
          downloadFilename = filenameMatch[1];
        }
      }
      a.download = downloadFilename;
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.success('Thumbnail download started!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          toast.error('Thumbnail download timed out - Please try again.');
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          toast.error('Network error during thumbnail download - Please check your internet connection.');
        } else {
          toast.error(`Thumbnail download failed: ${err.message}`);
        }
      } else {
        toast.error('An unexpected error occurred during thumbnail download.');
      }
      console.error(err);
    } finally {
      setIsDownloadingThumb(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo || !selectedOptionId) {
      toast.error('Please select a format first');
      return;
    }

    const selectedOption = videoInfo.options.find(o => o.id === selectedOptionId);
    if (!selectedOption) {
      toast.error('Selected format not found');
      return;
    }

    setIsDownloading(true);
    toast.info('Preparing download...', { duration: 5000 });

    const MAX_RETRIES = 2;
    const RETRY_DELAY = 3000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const title = encodeURIComponent(videoInfo.title);
        let url = `/api/download?url=${encodeURIComponent(youtubeUrl)}&itag=${selectedOptionId}&title=${title}`;
        
        if (selectedOption.hasVideo && !selectedOption.isMuxed) {
          const audioOptions = videoInfo.options.filter(o => o.hasAudio && !o.hasVideo);
          if (audioOptions.length > 0) {
            audioOptions.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
            const bestAudio = audioOptions[0];
            url += `&audioItag=${bestAudio.id}`;
          }
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for downloads

        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);
        
        if (!res.ok) {
          // Handle specific HTTP status codes
          if (res.status === 504) {
            throw new Error('Download timeout - The server is taking too long to process your request. Please try again.');
          } else if (res.status === 503) {
            throw new Error('Service unavailable - The download service is temporarily overloaded. Please try again later.');
          } else if (res.status === 429) {
            throw new Error('Rate limit exceeded - Please wait a moment before trying to download again.');
          } else if (res.status === 403) {
            throw new Error('Access denied - YouTube may be blocking download requests. Please try again later.');
          }

          // Try to parse error response
          let errorMessage = `Download failed (${res.status})`;
          try {
            const errJson = await res.json();
            errorMessage = errJson.error || errJson.message || errorMessage;
          } catch (e) {
            // If parsing fails, use the status text
            errorMessage = `Download failed: ${res.statusText}`;
          }
          
          throw new Error(errorMessage);
        }

        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${videoInfo.title}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
        toast.success('Download started!', { description: `Downloading ${selectedOption.label}` });
        
        setIsDownloading(false);
        return; // Success, exit retry loop

      } catch (err: unknown) {
        console.error(`Download attempt ${attempt} failed:`, err);

        if (err instanceof Error) {
          // Handle AbortError (timeout)
          if (err.name === 'AbortError') {
            const timeoutMsg = 'Download timed out - The server is taking too long to process your request.';
            
            if (attempt === MAX_RETRIES) {
              toast.error(timeoutMsg);
              break;
            } else {
              toast.warning(`${timeoutMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
            }
          } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            // Network errors
            const networkMsg = 'Network error during download - Please check your internet connection.';
            
            if (attempt === MAX_RETRIES) {
              toast.error(networkMsg);
              break;
            } else {
              toast.warning(`${networkMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
            }
          } else {
            // Other errors
            if (attempt === MAX_RETRIES) {
              toast.error(`Download failed: ${err.message}`);
              break;
            } else {
              toast.warning(`Download attempt ${attempt} failed: ${err.message}. Retrying...`);
            }
          }
        } else {
          const genericMsg = 'An unexpected error occurred during download.';
          
          if (attempt === MAX_RETRIES) {
            toast.error(genericMsg);
            break;
          } else {
            toast.warning(`${genericMsg} Retrying... (${attempt}/${MAX_RETRIES})`);
          }
        }

        // Wait before retrying (except on the last attempt)
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        }
      }
    }

    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>YouTube Downloader - Renderdragon</title>
        <meta
          name="description"
          content="Download YouTube videos for fair use and educational purposes. Our tool helps Minecraft content creators learn from and reference other creators' work."
        />
      </Helmet>
      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">YouTube</span> Downloader
            </h1>

            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Download YouTube videos and thumbnails for content creation purposes. Always respect copyright laws and only download videos
              you have permission to use.
            </p>

            <Alert className="mb-8 pixel-corners">
              <Info className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                This tool is for educational purposes only. You are responsible for ensuring you have the right to download
                and use any content.
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
                <Button onClick={handleFetchInfo} disabled={isLoadingInfo} className="pixel-btn-primary flex items-center">
                  {isLoadingInfo ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Youtube className="h-4 w-4 mr-2" /> <span>Fetch Video Info</span>
                    </>
                  )}
                </Button>
              </div>
              {urlError && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> Please enter a valid YouTube URL
                </p>
              )}
            </div>

            {isLoadingInfo && <VideoInfoSkeleton />}

            {videoInfo && !isLoadingInfo && (
              <Tabs defaultValue="download" className="w-full">
                <TabsList className="pixel-card mb-4">
                  <TabsTrigger value="download">Video / Audio</TabsTrigger>
                  <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
                </TabsList>

                <TabsContent value="download">
                  <div className="pixel-card space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/5">
                        <img src={videoInfo.thumbnail} alt={videoInfo.title} className="rounded-md w-full h-auto" />
                      </div>
                      <div className="w-full md:w-3/5">
                        <h2 className="text-xl font-vt323 mb-2">{videoInfo.title}</h2>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                            <span className="mr-1">Duration:</span> {videoInfo.duration}
                          </div>
                          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                            <span className="mr-1">Channel:</span> {videoInfo.author}
                          </div>
                        </div>
                        
                        <RadioGroup value={downloadType} onValueChange={v => setDownloadType(v as 'video' | 'audio')} className="flex gap-4 mb-4">
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" /> <Label htmlFor="video">Video</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="audio" id="audio" /> <Label htmlFor="audio">Audio only</Label>
                           </div>
                         </RadioGroup>

                        <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
                          <SelectTrigger className="pixel-corners">
                            <SelectValue placeholder="Select format & quality" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredOptions.map((opt, index) => (
                              <SelectItem key={`${opt.id}-${index}`} value={opt.id}>
                                {opt.label} {opt.size && `(${opt.size})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleDownload} disabled={!selectedOptionId || isDownloading} className="w-full pixel-btn-primary flex items-center justify-center">
                      {isDownloading ? (
                        <>
                          <RefreshCcw className="h-5 w-5 mr-2 animate-spin" /> <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" /> <span>Download {downloadType === 'video' ? 'Video' : 'Audio'}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="thumbnail">
                  <div className="pixel-card space-y-6">
                    <img src={videoInfo.thumbnail} alt={videoInfo.title} className="rounded-md w-full h-auto" />
                    <Button onClick={handleDownloadThumbnail} disabled={isDownloadingThumb} className="w-full pixel-btn-primary flex items-center justify-center">
                      {isDownloadingThumb ? (
                        <>
                          <RefreshCcw className="h-5 w-5 mr-2 animate-spin" /> <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" /> <span>Download Thumbnail</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />
    </div>
  );
};

export default YouTubeDownloader;