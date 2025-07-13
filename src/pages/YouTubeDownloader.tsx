import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('youtubeDownloader');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>(t('defaults.downloadType', { returnObjects: true }));
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
      toast.error(t('errors.invalidUrl'));
      setUrlError(true);
      return;
    }

    setIsLoadingInfo(true);
    setVideoInfo(null);
    setSelectedOptionId('');
    setUrlError(false);

    try {
      const res = await fetch(`/api/info?url=${encodeURIComponent(youtubeUrl)}`);
      const responseText = await res.text(); // Read the body ONCE as text.

      if (!res.ok) {
        // Try to parse it as JSON, but fall back to the raw text if it fails.
        let errorMessage = responseText;
        try {
            const errorJson = JSON.parse(errorMessage);
            errorMessage = errorJson.error || errorJson.message || errorMessage;
        } catch(e) {
            // It wasn't JSON, just use the text.
        }
        throw new Error(errorMessage);
      }

      // If we are here, res.ok was true.
      const data = JSON.parse(responseText); // We can now safely parse the text we already have.
      setVideoInfo(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`${t('errors.fetchFailed')}: ${msg}`);
      console.error(err);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const handleDownloadThumbnail = async () => {
    if (!videoInfo) return;
    setIsDownloadingThumb(true);
    toast.info(t('messages.preparingThumbnailDownload'));
    try {
      const title = encodeURIComponent(videoInfo.title);
      const thumbnailUrl = encodeURIComponent(videoInfo.thumbnail);
      const url = `/api/downloadThumbnail?url=${thumbnailUrl}&title=${title}`;
      
      const res = await fetch(url);
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Download failed: ${res.statusText}`);
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
      toast.success(t('messages.thumbnailDownloadStarted'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`${t('errors.thumbnailDownloadFailed')}: ${msg}`);
      console.error(err);
    } finally {
      setIsDownloadingThumb(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo || !selectedOptionId) {
      toast.error(t('errors.selectFormat'));
      return;
    }

    const selectedOption = videoInfo.options.find(o => o.id === selectedOptionId);
    if (!selectedOption) {
      toast.error(t('errors.formatNotFound'));
      return;
    }

    setIsDownloading(true);
    toast.info(t('messages.preparingDownload'), { duration: 5000 });

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

      const res = await fetch(url);
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Download failed: ${res.statusText}`);
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
      toast.success(t('messages.downloadStarted'), { description: `Downloading ${selectedOption.label}` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`${t('errors.downloadFailed')}: ${msg}`);
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('seo.title')} - Renderdragon</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/youtube-downloader.png" />
        <meta property="og:url" content="https://renderdragon.org/youtube-downloader" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/youtube-downloader.png" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">{t('title')}</span> {t('subtitle')}
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('description')}
            </p>

            <Alert className="mb-8 pixel-corners">
              <Info className="h-4 w-4" />
              <AlertTitle>{t('alerts.note')}</AlertTitle>
              <AlertDescription>
                {t('alerts.noteDescription')}
              </AlertDescription>
            </Alert>

            <div className="pixel-card mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder={t('placeholders.url')}
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                  className={`pixel-corners flex-grow ${urlError ? 'border-red-500' : ''}`}
                />
                <Button onClick={handleFetchInfo} disabled={isLoadingInfo} className="pixel-btn-primary flex items-center">
                  {isLoadingInfo ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> <span>{t('buttons.loading')}</span>
                    </>
                  ) : (
                    <>
                      <Youtube className="h-4 w-4 mr-2" /> <span>{t('buttons.getVideoInfo')}</span>
                    </>
                  )}
                </Button>
              </div>
              {urlError && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {t('errors.invalidUrl')}
                </p>
              )}
            </div>

            {isLoadingInfo && <VideoInfoSkeleton />}

            {videoInfo && !isLoadingInfo && (
              <Tabs defaultValue="download" className="w-full">
                <TabsList className="pixel-card mb-4">
                  <TabsTrigger value="download">{t('tabs.video')}</TabsTrigger>
                  <TabsTrigger value="thumbnail">{t('tabs.thumbnail')}</TabsTrigger>
                </TabsList>

                <TabsContent value="download">
                  <div className="pixel-card space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/5">
                        <img src={videoInfo.thumbnail} alt={t('alts.thumbnail')} className="rounded-md w-full h-auto" />
                      </div>
                      <div className="w-full md:w-3/5">
                        <h2 className="text-xl font-vt323 mb-2">{videoInfo.title}</h2>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                            <span className="mr-1">{t('labels.duration')}:</span> {videoInfo.duration}
                          </div>
                          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center">
                            <span className="mr-1">{t('labels.channel')}:</span> {videoInfo.author}
                          </div>
                        </div>
                        
                        <RadioGroup value={downloadType} onValueChange={v => setDownloadType(v as 'video' | 'audio')} className="flex gap-4 mb-4">
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" /> <Label htmlFor="video">{t('labels.video')}</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="audio" id="audio" /> <Label htmlFor="audio">{t('labels.audioOnly')}</Label>
                           </div>
                         </RadioGroup>

                        <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
                          <SelectTrigger className="pixel-corners">
                            <SelectValue placeholder={t('placeholders.selectFormat')} />
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
                          <RefreshCcw className="h-5 w-5 mr-2 animate-spin" /> <span>{t('buttons.downloading')}</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" /> <span>{downloadType === 'video' ? t('buttons.downloadVideo') : t('buttons.downloadAudio')}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="thumbnail">
                  <div className="pixel-card space-y-6">
                    <img src={videoInfo.thumbnail} alt={t('alts.thumbnail')} className="rounded-md w-full h-auto" />
                    <Button onClick={handleDownloadThumbnail} disabled={isDownloadingThumb} className="w-full pixel-btn-primary flex items-center justify-center">
                      {isDownloadingThumb ? (
                        <>
                          <RefreshCcw className="h-5 w-5 mr-2 animate-spin" /> <span>{t('buttons.downloadingThumbnail')}</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" /> <span>{t('buttons.downloadThumbnail')}</span>
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