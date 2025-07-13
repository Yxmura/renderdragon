import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Music, Search, AlertCircle, RefreshCcw, Info, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { checkCopyrightStatus, extractYouTubeID } from '@/utils/copyrightChecker';
import { CopyrightResult } from '@/types/copyright';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import AuthDialog from '@/components/auth/AuthDialog';
import ResultsDisplaySkeleton from '@/components/skeletons/ResultsDisplaySkeleton';

const MusicCopyright = () => {
  const { t } = useTranslation('musicCopyright');
  const [activeTab, setActiveTab] = useState('song');
  const [songArtist, setSongArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CopyrightResult | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { user, loading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const RATE_LIMIT = 6;
  const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
  const LOCALSTORAGE_KEY = 'gappa-checks';

  function getRecentChecks() {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      // Only keep timestamps within the last hour
      const now = Date.now();
      return arr.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    } catch {
      return [];
    }
  }

  function logCheck() {
    const now = Date.now();
    const arr = getRecentChecks();
    arr.push(now);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(arr));
  }

  const handleReset = () => {
    setResult(null);
    setSearchAttempted(false);
    setSongArtist('');
    setSongTitle('');
    setYoutubeUrl('');
  };

  const handleSearch = async () => {
    setSearchAttempted(true);
    // Rate limit check
    const recentChecks = getRecentChecks();
    if (recentChecks.length >= RATE_LIMIT) {
      toast.error(t('rateLimit.title'), {
        description: t('rateLimit.description', { limit: RATE_LIMIT }),
      });
      return;
    }
    let query;
    if (activeTab === 'song') {
      if (!songArtist.trim() || !songTitle.trim()) {
        toast.error(t('errors.missingFields'));
        return;
      }
      query = { artist: songArtist, title: songTitle };
    } else {
      if (!youtubeUrl.trim() || !extractYouTubeID(youtubeUrl)) {
        toast.error(t('errors.invalidYoutubeUrl'));
        return;
      }
      query = { youtube_url: youtubeUrl };
    }

    setIsLoading(true);
    setResult(null);

    try {
      const copyrightData = await checkCopyrightStatus(query);
      setResult(copyrightData);
      logCheck(); // Log the check only if the request was made

      if (copyrightData.error) {
        toast.error(t('errors.checkingError'), {
          description: copyrightData.error,
        });
      } else {
        toast.success(t('analysisComplete'));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('errors.requestFailed'), {
        description: t('errors.unexpectedError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show AuthDialog if not logged in and not loading
  if (!loading && !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{t('seo.title')} - Renderdragon</title>
          <meta name="description" content={t('seo.description')} />
          <meta property="og:title" content={`${t('seo.title')} - Renderdragon`} />
          <meta property="og:description" content={t('seo.description')} />
          <meta property="og:image" content="https://renderdragon.org/ogimg/copyright.png" />
          <meta property="og:url" content="https://renderdragon.org/gappa" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${t('seo.title')} - Renderdragon`} />
          <meta name="twitter:image" content="https://renderdragon.org/ogimg/copyright.png" />
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-24 pb-16 cow-grid-bg flex flex-col items-center justify-center">
          <div className="max-w-md w-full mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">{t('title')}</span> {t('subtitle')}
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">{t('authRequired')}</p>
            <Button className="pixel-btn-primary mb-4" onClick={() => setAuthDialogOpen(true)}>
              {t('signInButton')}
            </Button>
            <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('seo.title')} - Renderdragon</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/copyright.png" />
        <meta property="og:url" content="https://renderdragon.org/gappa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/copyright.png" />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">{t('title')}</span> {t('subtitle')}
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('description')}
            </p>
            <Alert className="mb-8 pixel-corners">
              <Info className="h-4 w-4" />
              <AlertTitle>{t('disclaimer.title')}</AlertTitle>
              <AlertDescription>
                {t('disclaimer.description')}
              </AlertDescription>
            </Alert>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 pixel-corners">
                <TabsTrigger value="song">{t('tabs.song')}</TabsTrigger>
                <TabsTrigger value="youtube">{t('tabs.youtube')}</TabsTrigger>
              </TabsList>
              <TabsContent value="song">
                <div className="pixel-card space-y-4">
                  <Input
                    placeholder={t('form.artistPlaceholder')}
                    value={songArtist}
                    onChange={(e) => setSongArtist(e.target.value)}
                    className="pixel-corners"
                  />
                  <Input
                    placeholder={t('form.titlePlaceholder')}
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="pixel-corners"
                  />
                </div>
              </TabsContent>
              <TabsContent value="youtube">
                <div className="pixel-card">
                  <Input
                    placeholder={t('form.youtubePlaceholder')}
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pixel-corners"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-4">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="pixel-btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                    <span>{t('analyzing')}</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    <span>{t('checkButton')}</span>
                  </>
                )}
              </Button>
            </div>
            {isLoading && <ResultsDisplaySkeleton />}
            {!isLoading && result && (
              <ResultsDisplay result={result} onReset={handleReset} />
            )}
            {!isLoading && !result && searchAttempted && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">{t('noResults.title')}</p>
                <p className="text-sm text-muted-foreground mt-2">{t('noResults.suggestion')}</p>
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