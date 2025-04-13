import { useState, useEffect, useCallback, useMemo } from 'react';
import { Resource, ResourcesData } from '@/types/resources';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});
  const [lastAction, setLastAction] = useState<string>('');
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/resources.json');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch resources: ${response.status} ${response.statusText}`,
        );
      }
      const resourcesData = (await response.json()) as ResourcesData;

      const allResources: Resource[] = Object.entries(resourcesData).flatMap(
        ([category, resources]) =>
          resources.map((resource) => ({ 
            ...resource, 
            category: category as 'music' | 'sfx' | 'image' | 'animations' | 'fonts' | 'presets',
            downloads: 0 // Set all resources to have 0 downloads by default
          })),
      );

      setResources(allResources);
      
      // Initialize download counts
      const counts: Record<number, number> = {};
      allResources.forEach(resource => {
        counts[resource.id] = 0; // Set all resources to have 0 downloads initially
      });
      setDownloadCounts(counts);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSearching(true);
    setLastAction('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setLastAction('clear');
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // When changing category, reset subcategory unless we're selecting 'presets'
    if (category !== 'presets') {
      setSelectedSubcategory(null);
    }
    setLastAction('category');
  };

  const handleSubcategoryChange = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    setLastAction('subcategory');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLastAction('search');
    
    if (e.target.value === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  // Check if we have resources in the current selected category
  const hasCategoryResources = useMemo(() => {
    if (!selectedCategory) return true;
    return resources.some(resource => resource.category === selectedCategory);
  }, [resources, selectedCategory]);

  // Determine which resources to display based on filters
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Apply search query filter
      const matchesSearch = !isSearching || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.subcategory || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply category filter
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      
      // Apply subcategory filter
      const matchesSubcategory = !selectedSubcategory || resource.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [resources, selectedCategory, selectedSubcategory, searchQuery, isSearching]);

  const getDownloadURL = (resource: Resource) => {
    if (!resource || !resource.filetype) return '';
    
    const titleLowered = resource.title
      .toLowerCase()
      .replace(/ /g, '%20');
    
    // Same URL structure for all resource types
    return `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${resource.filetype}`;
  };

  const handleDownload = (resource: Resource) => {
    if (!resource) return;

    const downloadURL = getDownloadURL(resource);

    if (downloadURL) {
      window.open(downloadURL, '_blank'); 
      
      // Update download count
      setDownloadCounts(prev => {
        const newCount = (prev[resource.id] || 0) + 1;
        return {
          ...prev,
          [resource.id]: newCount
        };
      });
      
      return true;
    }
    
    return false;
  };

  return {
    resources,
    selectedResource,
    setSelectedResource,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    isLoading,
    isSearching,
    downloadCounts,
    lastAction,
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
    getDownloadURL
  };
};
