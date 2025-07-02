
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Resource } from '@/types/resources';
import { useDownloadCounts } from '@/hooks/useDownloadCounts';
import { supabase } from '@/integrations/supabase/client';

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
  const { downloadCounts: externalDownloadCounts, incrementDownload } = useDownloadCounts();
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
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const allResources: Resource[] = (data || []).map(resource => ({
        ...resource,
        downloads: 0 // Set all resources to have 0 downloads by default
      }));

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
    if (!selectedCategory || selectedCategory === 'favorites') return true;
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
      
      // Don't apply category filter for favorites
      const matchesCategory = selectedCategory === 'favorites' || !selectedCategory || resource.category === selectedCategory;
      
      const matchesSubcategory = 
        !selectedSubcategory || 
        (selectedCategory !== 'presets' ? true : resource.subcategory === selectedSubcategory);
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [resources, selectedCategory, selectedSubcategory, searchQuery, isSearching]);

  const handleDownload = async (resource: Resource) => {
    if (!resource) return;

    // Use the download_url from the database if available, otherwise construct it
    let fileUrl = resource.download_url;
    
    if (!fileUrl) {
      // Fallback to the old URL construction method
      const titleLowered = encodeURIComponent(resource.title.toLowerCase());
      const creditName = resource.credit ? encodeURIComponent(resource.credit) : '';
      const filetype = resource.filetype;

      if (resource.category === 'presets' && resource.subcategory) {
        fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${resource.subcategory}/${titleLowered}${creditName ? `__${creditName}` : ''}.${filetype}`;
      } else if (resource.credit) {
        fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}__${creditName}.${filetype}`;
      } else {
        fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${filetype}`;
      }
    }

    const filename = `${resource.title}.${resource.filetype || 'file'}`;
    const shouldForceDownload = ['presets', 'images'].includes(resource.category);

    try {
      if (shouldForceDownload) {
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
      } else {
        // Let the browser handle the download (works well for audio, fonts, etc.)
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

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
