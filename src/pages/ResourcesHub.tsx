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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiscordPopup from '@/components/resources/DiscordPopup';
import FavoritesTab from '@/components/resources/FavoritesTab';
import { useDiscordPopup } from '@/hooks/useDiscordPopup';
import { useTranslation } from 'react-i18next';

const ResourceDetailDialog = lazy(() => import('@/components/resources/ResourceDetailDialog'));


const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cow-purple"></div>
  </div>
);

const ResourcesHub = () => {
  const { t } = useTranslation();
  const { isPopupOpen, closePopup, neverShowPopupAgain } = useDiscordPopup();
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
      toast.info(t('resourcesHub.toasts.downloadStarting.title'), {
        description: t('resourcesHub.toasts.downloadStarting.description'),
        duration: 3000,
      });
    } else {
      toast.error(t('resourcesHub.toasts.downloadError'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <title>{t('resourcesHub.meta.title')}</title>
        <meta name="description" content={t('resourcesHub.meta.description')} />
        <meta property="og:title" content={t('resourcesHub.meta.title')} />
        <meta property="og:description" content={t('resourcesHub.meta.description')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/resources.png" />
        <meta property="og:url" content="https://renderdragon.org/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('resourcesHub.meta.title')} />
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
              <h1 className="text-4xl md:text-5xl font-vt323 font-bold mb-2 text-center">{t('resourcesHub.title')}</h1>
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{t('resourcesHub.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1 mb-6 pixel-corners">
                  <TabsTrigger value="browse" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    {t('resourcesHub.tabs.browse')}
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    {t('resourcesHub.tabs.favorites')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="mt-6">
                  <AnimatePresence mode="wait">
                    {
                      <motion.div
                        key="browse"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ResourceFilters
                t={t}
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
                    }
                  </AnimatePresence>
                </TabsContent>
                <TabsContent value="favorites" className="mt-6">
                  <Suspense fallback={<LoadingSpinner />}>
                    <FavoritesTab />
                  </Suspense>
                </TabsContent>
              </Tabs>
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
          isFavoritesView={activeTab === 'favorites'}
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
              aria-label={t('resourcesHub.scrollToTop')}
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