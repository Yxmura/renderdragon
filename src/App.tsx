
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VercelAnalytics from "@/components/VercelAnalytics";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from "@/hooks/useAuth";

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
import TextGenerator from '@/pages/TextGenerator';
import Account from './pages/Account';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/account" element={<Account />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/text-generator" element={<TextGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
