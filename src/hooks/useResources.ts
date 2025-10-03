import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Resource } from '@/types/resources';
import { useDownloadCounts } from '@/hooks/useDownloadCounts';
import { supabase } from '@/integrations/supabase/client';

type Category = Resource['category'];
type Subcategory = Resource['subcategory'];

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
const normalize = (str: string) => str.replace(/ /g, '%20');

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null | 'favorites'>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});
  const [lastAction, setLastAction] = useState<string>('');
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const RESOURCES_PER_PAGE = 20;

  const fetchResources = useCallback(async (isNewSearch = false, pageToFetch = 0) => {
    try {
      setIsLoading(true);

      if (!hasMore && !isNewSearch) {
        setIsLoading(false);
        return;
      }

      const from = isNewSearch ? 0 : pageToFetch * RESOURCES_PER_PAGE;
      const to = from + RESOURCES_PER_PAGE - 1;

      let query = supabase
        .from('resources')
        .select('*', { count: 'exact' })
        .range(from, to);

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      if (selectedCategory && selectedCategory !== 'favorites') {
        query = query.eq('category', selectedCategory);
      }
      // Use eq for exact match on subcategory, ensuring correct type for Supabase query
      if (
        selectedSubcategory &&
        selectedSubcategory !== 'all' &&
        // Ensure selectedSubcategory is a valid subcategory type
        (['davinci', 'adobe'] as const).includes(selectedSubcategory as any)
      ) {
        // Cast to the correct literal type for Supabase
        query = query.eq('subcategory', selectedSubcategory as 'davinci' | 'adobe');
      }

      switch (sortOrder) {
        case 'popular':
          query = query.order('downloads', { ascending: false });
          break;
        case 'a-z':
          query = query.order('title', { ascending: true });
          break;
        case 'z-a':
          query = query.order('title', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const newResources: Resource[] = (data || []).map(resource => ({
        ...resource,
        downloads: 0 // Set all resources to have 0 downloads by default
      }));
      
      // Merge new resources with previous ones while ensuring uniqueness by `id`
      setResources(prevResources => {
        if (isNewSearch) {
          return newResources;
        }
        const combined = [...prevResources, ...newResources];
        const seenIds = new Set<number>();
        return combined.filter(res => {
          if (seenIds.has(res.id)) return false;
          seenIds.add(res.id);
          return true;
        });
      });

      if (count !== null) {
        const totalLoaded = isNewSearch ? newResources.length : (pageToFetch + 1) * RESOURCES_PER_PAGE;
        setHasMore(count > totalLoaded);
      } else {
        setHasMore(newResources.length === RESOURCES_PER_PAGE);
      }

    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, searchQuery, selectedCategory, selectedSubcategory, sortOrder]);

  // Track current page for load more functionality
  const [currentPage, setCurrentPage] = useState(0);

  // Initial load and filter changes
  useEffect(() => {
    setCurrentPage(0);
    setHasMore(true);
    fetchResources(true, 0);
  }, [searchQuery, selectedCategory, selectedSubcategory, sortOrder, fetchResources]);
  
  // Stable load more function that prevents race conditions
  const loadMoreResources = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchResources(false, nextPage);
  }, [isLoading, hasMore, currentPage, fetchResources]);


  const handleSearchSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setIsSearching(true);
    setLastAction('search');
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
    setLastAction('clear');
  }, []);

  const handleCategoryChange = useCallback((category: Category | null | 'favorites') => {
    setIsLoading(true);
    setSelectedCategory(category);
    // When changing category, reset subcategory unless we're selecting 'presets'
    if (category !== 'presets') {
      setSelectedSubcategory(null);
    }
    setLastAction('category');
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const handleSubcategoryChange = useCallback((subcategory: Subcategory | 'all' | null) => {
    setIsLoading(true);
    setSelectedSubcategory(subcategory);
    setLastAction('subcategory');
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLastAction('search');
    
    if (e.target.value === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }, []);

  // Check if we have resources in the current selected category
  const hasCategoryResources = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'favorites') return true;
    return resources.some(resource => resource.category === selectedCategory);
  }, [resources, selectedCategory]);

  // Determine which resources to display based on filters
  const filteredResources = useMemo(() => {
    // With backend filtering, resources are already filtered.
    // We might still need client side filtering for some cases, but for now this is simpler.
    return resources;
  }, [resources]);

  const handleDownload = useCallback(async (resource: Resource): Promise<boolean> => {
    if (!resource) return false;

    // Use the download_url from the database if available, otherwise construct it
    // let fileUrl = resource.download_url;
    let fileUrl = '';
    
    if (!fileUrl) {
      // Fallback to the old URL construction method
      const titleLowered = normalize(resource.title.toLowerCase());
      const creditName = resource.credit ? encodeURIComponent(resource.credit) : '';
      const filetype = resource.filetype;

      if (resource.category === 'presets') {
        const subcategory = resource.subcategory?.toLowerCase().trim();
        if (subcategory === 'adobe' || subcategory === 'davinci') {
          fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/presets/${subcategory}/${titleLowered}${creditName ? `__${creditName}` : ''}.${filetype}`;
        } else {
          alert('Preset resource is missing a valid subcategory (adobe or davinci).');
          return false;
        }
      } else if (resource.credit) {
        fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}__${creditName}.${filetype}`;
      } else {
        fileUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${filetype}`;
      }
    }

    if (!fileUrl) return false;

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
      return true;
    } catch (err) {
      console.error('Download failed', err);
      return false;
    }
  }, [incrementDownload]);   

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
    sortOrder,
    handleSortOrderChange: setSortOrder,
    handleSearch,
    handleDownload,
    loadMoreResources,
    hasMore,
  };
};