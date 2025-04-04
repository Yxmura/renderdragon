
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import ResourcesHub from "./pages/ResourcesHub";
import Contact from "./pages/Contact";
import BackgroundGenerator from "./pages/BackgroundGenerator";
import YouTubeDownloader from "./pages/YouTubeDownloader";
import MusicCopyright from "./pages/MusicCopyright";
import AiTitleHelper from "./pages/AiTitleHelper";
import Guides from "./pages/Guides";
import YouTubeVideos from "./pages/YouTubeVideos";
import DiscordServers from "./pages/DiscordServers";
import FAQ from "./pages/FAQ";
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { KBarProvider } from 'kbar';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <KBarProvider>
      <TooltipProvider>
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
            {/* <Route path="/youtube-downloader" element={<YouTubeDownloader />} /> */}
            <Route path="/music-copyright" element={<MusicCopyright />} />
            <Route path="/ai-title-helper" element={<AiTitleHelper />} />
            <Route path="/background-generator" element={<BackgroundGenerator />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </KBarProvider>
  </QueryClientProvider>
);

export default App;
