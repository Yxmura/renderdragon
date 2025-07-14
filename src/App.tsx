import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n, { getI18n } from '@/i18n';
import VercelAnalytics from "@/components/VercelAnalytics";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Loader2 } from 'lucide-react';

const Index = lazy(() => import("@/pages/Index"));
const ResourcesHub = lazy(() => import("@/pages/ResourcesHub"));
const Contact = lazy(() => import("@/pages/Contact"));
const BackgroundGenerator = lazy(() => import("@/pages/BackgroundGenerator"));
const MusicCopyright = lazy(() => import("@/pages/MusicCopyright"));
const Guides = lazy(() => import("@/pages/Guides"));
const Community = lazy(() => import("@/pages/Community"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const TOS = lazy(() => import("@/pages/TOS"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Construction = lazy(() => import("@/pages/Construction"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Utils = lazy(() => import("@/pages/Utilities"));
const AiTitleHelper = lazy(() => import("@/pages/AiTitleHelper"));
const PlayerRenderer = lazy(() => import("@/pages/PlayerRenderer"));
const Renderbot = lazy(() => import("@/pages/Renderbot"));
const TextGenerator = lazy(() => import('@/pages/TextGenerator'));
const Account = lazy(() => import('@/pages/Account'));
const Generators = lazy(() => import('@/pages/Generators'));
const Admin = lazy(() => import('@/pages/Admin'));
const YouTubeDownloader = lazy(() => import('@/pages/YouTubeDownloader'));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cow-purple"></div>
  </div>
);

const AppContent = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<ResourcesHub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/community" element={<Community />} />
          <Route path="/gappa" element={<MusicCopyright />} />
          <Route path="/music-copyright" element={<Navigate to="/gappa" replace />} />
          <Route path="/ai-title-helper" element={<AiTitleHelper />} />
          <Route path="/background-generator" element={<BackgroundGenerator />} />
          <Route path="/utilities" element={<Utils />} />
          <Route path="/player-renderer" element={<PlayerRenderer />} />
          <Route path="/renderbot" element={<Renderbot />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/text-generator" element={<TextGenerator />} />
          <Route path="/generators" element={<Generators />} />
          <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const App = () => {
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getI18n();
        setI18nInitialized(true);
      } catch (err) {
        console.error('Failed to initialize i18n:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize i18n'));
      }
    };

    initialize();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-500">Error Initializing Application</h1>
        <p className="mb-4 text-white/80">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white rounded-md bg-cow-purple hover:bg-cow-purple/80 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!i18nInitialized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-cow-purple" />
        <p className="mt-4 text-white/80">Loading translations...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <HelmetProvider>
            <TooltipProvider>
              <VercelAnalytics />
              <SpeedInsights />
              <Toaster />
              <Sonner position="bottom-right" />
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
            </TooltipProvider>
          </HelmetProvider>
        </AuthProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;