import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { useResources } from '@/hooks/useResources';
import { useDownloadCounts } from '@/hooks/useDownloadCounts';
import { Resource } from '@/types/resources';
import ResourceFilters from '@/components/resources/ResourceFilters';
import SortSelector from '@/components/resources/SortSelector';
import ResourcesList from '@/components/resources/ResourcesList';
import AuthDialog from '@/components/auth/AuthDialog';
import { Button } from '@/components/ui/button';
import { ArrowUp, Heart, Grid, Search } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import DonateButton from '@/components/DonateButton';

import DiscordPopup from '@/components/resources/DiscordPopup';
import FavoritesTab from '@/components/resources/FavoritesTab';
import { useDiscordPopup } from '@/hooks/useDiscordPopup';

const ResourceDetailDialog = lazy(() => import('@/components/resources/ResourceDetailDialog'));


const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cow-purple"></div>
  </div>
);

const ResourcesHub = () => {
  const { isPopupOpen, closePopup, neverShowPopupAgain } = useDiscordPopup();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
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
    sortOrder,
    handleSortOrderChange,
    handleSearch,
    handleDownload,
    loadMoreResources,
    hasMore,
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
      setShowFavorites(true);
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
      setShowFavorites(true);
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
      toast.info('Download starting...', {
        description: 'Downloading resource...',
        duration: 3000,
      });
    } else {
      toast.error('Download error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <title>Resources Hub</title>
        <meta name="description" content="Explore a vast collection of resources for RenderDragon." />
        <meta property="og:title" content="Resources Hub" />
        <meta property="og:description" content="Explore a vast collection of resources for RenderDragon." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/resources.png" />
        <meta property="og:url" content="https://renderdragon.org/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources Hub" />
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
              <h1 className="text-4xl md:text-5xl font-vt323 font-bold mb-2 text-center">Resources Hub</h1>
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">Discover and download a wide range of resources to enhance your RenderDragon experience.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {showFavorites ? (
                  <motion.div
                    key="favorites"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button onClick={() => setShowFavorites(false)} className="mb-4">
                      Back to Resources
                    </Button>
                    <Suspense fallback={<LoadingSpinner />}>
                      <FavoritesTab />
                    </Suspense>
                  </motion.div>
                ) : (
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
                      sortOrder={sortOrder}
                      onSortOrderChange={handleSortOrderChange}
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
                      loadMoreResources={loadMoreResources}
                      hasMore={hasMore}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />

      <Suspense fallback={null}>
        <ResourceDetailDialog
            resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onDownload={onDownload}
          downloadCount={selectedResource ? downloadCounts[selectedResource.id] || 0 : 0}
          loadedFonts={loadedFonts}
          setLoadedFonts={setLoadedFonts}
          filteredResources={filteredResources}
          onSelectResource={setSelectedResource}
          isFavoritesView={showFavorites}
        />
      </Suspense>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />

      <DiscordPopup 
        isOpen={isPopupOpen}
        onClose={closePopup}
        onNeverShowAgain={neverShowPopupAgain}
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