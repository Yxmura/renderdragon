import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KBarProvider } from 'kbar';
import VercelAnalytics from "@/components/VercelAnalytics";
import { SpeedInsights } from '@vercel/speed-insights/react';
import CountdownOverlay from "@/components/CountdownOverlay";

import Index from "./pages/Index";
import ResourcesHub from "./pages/ResourcesHub";
import Contact from "./pages/Contact";
import BackgroundGenerator from "./pages/BackgroundGenerator";
import YouTubeDownloader from "./pages/YouTubeDownloader";
import MusicCopyright from "./pages/MusicCopyright";
import Guides from "./pages/Guides";
import YouTubeVideos from "./pages/YouTubeVideos";
import DiscordServers from "./pages/DiscordServers";
import FAQ from "./pages/FAQ";
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import Construction from "./pages/Construction";
import NotFound from "./pages/NotFound";
import UsefulSoftware from "./pages/UsefulSoftware";
import AiTitleHelper from "./pages/AiTitleHelper";
import PlayerRenderer from "./pages/PlayerRenderer";

const queryClient = new QueryClient();

// Set the launch date to May 1, 2025
const launchDate = new Date('2025-05-01T00:00:00');

const App = () => (
  <QueryClientProvider client={queryClient}>
    <KBarProvider>
      <TooltipProvider>
        <VercelAnalytics />
        <SpeedInsights />
        <Toaster />
        <Sonner position="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/youtube-videos" element={<YouTubeVideos />} />
            <Route path="/discord-servers" element={<DiscordServers />} />
            <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
            <Route path="/music-copyright" element={<MusicCopyright />} />
            <Route path="/ai-title-helper" element={<AiTitleHelper />} />
            <Route path="/background-generator" element={<BackgroundGenerator />} />
            <Route path="/useful-software" element={<UsefulSoftware />} />
            <Route path="/player-renderer" element={<PlayerRenderer />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/construction" element={<Construction />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CountdownOverlay targetDate={launchDate} />
        </BrowserRouter>
      </TooltipProvider>
    </KBarProvider>
  </QueryClientProvider>
);

export default App;
