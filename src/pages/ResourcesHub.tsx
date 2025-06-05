
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { useResources } from '@/hooks/useResources';
import { useDownloadCounts } from '@/hooks/useDownloadCounts';
import { Resource } from '@/types/resources';
import ResourceFilters from '@/components/resources/ResourceFilters';
import ResourcesList from '@/components/resources/ResourcesList';
import ResourceDetailDialog from '@/components/resources/ResourceDetailDialog';
import FavoritesTab from '@/components/resources/FavoritesTab';
import AuthDialog from '@/components/auth/AuthDialog';
import { Button } from '@/components/ui/button';
import { ArrowUp, Heart, Grid, Search } from 'lucide-react';
import { Helmet } from "react-helmet";
import DonateButton from '@/components/DonateButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResourcesHub = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  
  const {
    resources,
    selectedResource,
    setSelectedResource,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    isLoading,
    isSearching,
    loadedFonts,
    setLoadedFonts,
    filteredResources,
    hasCategoryResources,
    handleSearchSubmit,
    handleClearSearch,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSearch,
    handleDownload,
  } = useResources();

  const { downloadCounts } = useDownloadCounts();

  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset > 400;
      setShowScrollTop(scrolled);
    };

    const handleShowFavorites = () => {
      setActiveTab('favorites');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('showFavorites', handleShowFavorites);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('showFavorites', handleShowFavorites);
    };
  }, []);

  // Check URL params for favorites tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'favorites') {
      setActiveTab('favorites');
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onDownload = (resource: Resource) => {
    const success = handleDownload(resource);
    if (success) {
      toast.info('Starting download...', {
        description: 'Crediting Renderdragon is optional but appreciated!',
        duration: 3000,
      });
    } else {
      toast.error('Download URL not available.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <title>Resources Hub - Renderdragon</title>
        <meta name="description" content="Browse and download free Minecraft content creation resources including thumbnails, overlays, sound effects, and more." />
        <meta property="og:title" content="Resources Hub - Renderdragon" />
        <meta property="og:description" content="Browse and download free Minecraft content creation resources including thumbnails, overlays, sound effects, and more." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/resources.png" />
        <meta property="og:url" content="https://renderdragon.org/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources Hub - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/resources.png" />
      </Helmet>
      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg custom-scrollbar">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
                <span className="text-cow-purple">Resources</span> Hub
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 pixel-corners">
                  <TabsTrigger value="browse" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Browse Resources
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    My Favorites
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="browse" className="mt-0">
                    <motion.div
                      key="browse"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResourceFilters
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        onSearch={handleSearch}
                        onClearSearch={handleClearSearch}
                        onSearchSubmit={handleSearchSubmit}
                        onCategoryChange={handleCategoryChange}
                        onSubcategoryChange={handleSubcategoryChange}
                        isMobile={isMobile}
                        inputRef={inputRef}
                      />

                      <ResourcesList
                        resources={resources}
                        filteredResources={filteredResources}
                        isLoading={isLoading}
                        isSearching={isSearching}
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                        downloadCounts={downloadCounts}
                        onSelectResource={setSelectedResource}
                        onClearFilters={handleClearSearch}
                        hasCategoryResources={hasCategoryResources}
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="favorites" className="mt-0">
                    <motion.div
                      key="favorites"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FavoritesTab
                        downloadCounts={downloadCounts}
                        onSelectResource={setSelectedResource}
                        allResources={resources}
                        onShowAuth={() => setAuthDialogOpen(true)}
                      />
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />

      <ResourceDetailDialog
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onDownload={onDownload}
        downloadCount={selectedResource ? downloadCounts[selectedResource.id] || 0 : 0}
        loadedFonts={loadedFonts}
        setLoadedFonts={setLoadedFonts}
        filteredResources={filteredResources}
        onSelectResource={setSelectedResource}
        isFavoritesView={activeTab === 'favorites'}
      />

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[9999] h-12 w-12 rounded-full shadow-lg bg-cow-purple hover:bg-cow-purple-dark transition-all duration-300 opacity-90 hover:opacity-100 text-white border-2 border-white/10"
              size="icon"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourcesHub;
