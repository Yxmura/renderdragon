import { useRef, useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { Helmet } from "react-helmet";
import DonateButton from '@/components/DonateButton';

const ResourcesHub = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
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

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Resources</span> Hub
            </h1>

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
      />

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] h-12 w-12 rounded-full shadow-lg bg-cow-purple hover:bg-cow-purple-dark transition-all duration-300 opacity-90 hover:opacity-100 text-white border-2 border-white/10 scroll-button-enter"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default ResourcesHub;
