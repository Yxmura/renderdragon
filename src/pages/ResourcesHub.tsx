import { useRef, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useKBar } from 'kbar';
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

  const resourceIds = resources.map((resource) => resource.id);
  const { downloadCounts } = useDownloadCounts(resourceIds);

  const inputRef = useRef<HTMLInputElement>(null);
  const { query } = useKBar();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Resources Hub - Renderdragon';

    const handleKeydown = (e: KeyboardEvent) => {
      // Only trigger kbar search if not already focused in an input
      const isInputFocused = document.activeElement?.tagName === 'INPUT';
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !isInputFocused) {
        e.preventDefault();
        query.toggle();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      query.inputRefSetter(null);
    };
  }, [query]);

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
              toggleKBar={() => query.toggle()}
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

      <ResourceDetailDialog
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onDownload={onDownload}
        downloadCount={downloadCounts[selectedResource?.id ?? -1] || 0}
        loadedFonts={loadedFonts}
        setLoadedFonts={setLoadedFonts}
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
