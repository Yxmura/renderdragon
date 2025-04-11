
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useKBar } from 'kbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { useResources } from '@/hooks/useResources';
import { Resource } from '@/types/resources';
import ResourceFilters from '@/components/resources/ResourceFilters';
import ResourcesList from '@/components/resources/ResourcesList';
import ResourceDetailDialog from '@/components/resources/ResourceDetailDialog';

const ResourcesHub = () => {
  const {
    resources,
    selectedResource,
    setSelectedResource,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    isLoading,
    isSearching,
    downloadCounts,
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

  const inputRef = useRef<HTMLInputElement>(null);
  const { query } = useKBar();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Resources Hub - Creator On Wheels';

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        query.toggle();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    query.inputRefSetter(inputRef.current);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      query.inputRefSetter(null);
    };
  }, [query]);

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
    <div className="min-h-screen flex flex-col">
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
        downloadCount={selectedResource?.id ? downloadCounts[selectedResource.id] || 0 : 0}
        loadedFonts={loadedFonts}
        setLoadedFonts={setLoadedFonts}
      />
    </div>
  );
};

export default ResourcesHub;
