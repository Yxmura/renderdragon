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
import MusicCopyright from "./pages/MusicCopyright";
import Guides from "./pages/Guides";
import YouTubeVideos from "./pages/YouTubeVideos";
import DiscordServers from "./pages/DiscordServers";
import FAQ from "./pages/FAQ";
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import Construction from "./pages/Construction";
import NotFound from "./pages/NotFound";
import Utils from "./pages/Utilities";
import AiTitleHelper from "./pages/AiTitleHelper";
import PlayerRenderer from "./pages/PlayerRenderer";
import Renderbot from "./pages/Renderbot";

const queryClient = new QueryClient();

const launchDate = new Date('2025-05-01T10:00:00Z')

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
            <Route path="/music-copyright" element={<MusicCopyright />} />
            <Route path="/ai-title-helper" element={<AiTitleHelper />} />
            <Route path="/background-generator" element={<BackgroundGenerator />} />
            <Route path="/utilities" element={<Utils />} />
            <Route path="/player-renderer" element={<PlayerRenderer />} />
            <Route path="/renderbot" element={<Renderbot />} />
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
