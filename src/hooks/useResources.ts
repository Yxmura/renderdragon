import { useState, useEffect, useCallback, useMemo } from 'react';
import { Resource, ResourcesData } from '@/types/resources';
import { useDownloadCounts } from '@/hooks/useDownloadCounts'

let resourceIds: number[] = [];

// Utility to normalize numbers and words
const numberWordMap: Record<string, string> = {
  'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
  'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
  'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13', 'fourteen': '14',
  'fifteen': '15', 'sixteen': '16', 'seventeen': '17', 'eighteen': '18', 'nineteen': '19',
  'twenty': '20'
};
const digitWordMap: Record<string, string> = Object.fromEntries(
  Object.entries(numberWordMap).map(([k, v]) => [v, k])
);
function normalizeText(text: string): string {
  let normalized = text.toLowerCase();
  // Replace number words with digits
  for (const [word, digit] of Object.entries(numberWordMap)) {
    normalized = normalized.replace(new RegExp(`\\b${word}\\b`, 'g'), digit);
  }
  // Replace digits with number words
  for (const [digit, word] of Object.entries(digitWordMap)) {
    normalized = normalized.replace(new RegExp(`\\b${digit}\\b`, 'g'), word);
  }
  return normalized;
}

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { downloadCounts: externalDownloadCounts, incrementDownload } = useDownloadCounts(resourceIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
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

      let globalIndex = 0; // Global index to ensure unique IDs across categories
      const allResources: Resource[] = Object.entries(resourcesData).flatMap(
        ([category, resources]) =>
          resources.map((resource) => ({ 
            ...resource, 
            id: resource.id || `${category}-${globalIndex++}`, // Generate unique ID using category and global index
            category: category as 'music' | 'sfx' | 'images' | 'animations' | 'fonts' | 'presets',
            downloads: 0 // Set all resources to have 0 downloads by default
          })),
      );

      setResources(allResources);
      resourceIds = allResources.map(r => r.id); // Set resourceIds after resources are fetched
      
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
    const normalizedQuery = normalizeText(searchQuery);
    return resources.filter((resource) => {
      const titleNorm = normalizeText(resource.title || '');
      const categoryNorm = normalizeText(resource.category || '');
      const subcategoryNorm = normalizeText(resource.subcategory || '');
      const matchesSearch = !isSearching || 
        titleNorm.includes(normalizedQuery) ||
        categoryNorm.includes(normalizedQuery) ||
        subcategoryNorm.includes(normalizedQuery);
      
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      
      const matchesSubcategory = 
        !selectedSubcategory || 
        (selectedCategory !== 'presets' ? true : resource.subcategory === selectedSubcategory);
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [resources, selectedCategory, selectedSubcategory, searchQuery, isSearching]);


  const handleDownload = async (resource: Resource) => {
    if (!resource) return;
  
    const titleLowered = resource.title.toLowerCase().replace(/ /g, '%20');
    const creditName = resource.credit?.replace(/ /g, '__');
    const filetype = resource.filetype;
  
    let fileUrl = '';
    if (resource.category === 'presets' && resource.subcategory) {
      fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${resource.subcategory}/${titleLowered}${resource.credit ? `__${creditName}` : ''}.${filetype}`;
    } else if (resource.credit) {
      fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}__${creditName}.${filetype}`;
    } else {
      fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${filetype}`;
    }
  
    const filename = `${resource.title}.${filetype}`;
  
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const blob = await res.blob();
  
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
  
      // Count download
      incrementDownload(resource.id);
    } catch (err) {
      console.error('Download failed', err);
    }
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
    downloadCounts: externalDownloadCounts,
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
  };
};
