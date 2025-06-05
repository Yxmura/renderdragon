
import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { FolderX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserFavorites } from '@/hooks/useUserFavorites';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ResourcesListProps {
  resources: Resource[];
  filteredResources: Resource[];
  isLoading: boolean;
  isSearching: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  downloadCounts: Record<string, number>;
  onSelectResource: (resource: Resource) => void;
  onClearFilters: () => void;
  hasCategoryResources: boolean;
}

const ResourcesList = ({
  resources,
  filteredResources,
  isLoading,
  isSearching,
  selectedCategory,
  searchQuery,
  downloadCounts,
  onSelectResource,
  onClearFilters,
  hasCategoryResources,
}: ResourcesListProps) => {
  const { favorites } = useUserFavorites();
  const [sortOption, setSortOption] = useState('default');

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOption === 'downloads') {
      return (downloadCounts[b.id] || 0) - (downloadCounts[a.id] || 0);
    } else if (sortOption === 'alphabetical-az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'alphabetical-za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const displayedResources = selectedCategory === 'favorites'
    ? sortedResources.filter(resource => favorites.includes(String(resource.id)))
    : sortedResources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (isLoading) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-xl text-muted-foreground">Loading resources...</p>
      </motion.div>
    );
  }

  const shouldShowNoResourcesMessage =
    (displayedResources.length === 0) ||
    (selectedCategory && selectedCategory !== 'favorites' && !hasCategoryResources);

  if (shouldShowNoResourcesMessage) {
    return (
      <motion.div 
        className="text-center py-16 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <FolderX className="h-12 w-12 text-yellow-500" />
        </motion.div>
        <motion.h3 
          className="text-2xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No resources found
        </motion.h3>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isSearching
            ? `No resources match your search for "${searchQuery}"`
            : selectedCategory === 'favorites'
            ? 'You have no favorited resources yet'
            : selectedCategory
            ? `No resources found in the "${selectedCategory}" category`
            : 'No resources found with the current filters'}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={onClearFilters} variant="outline" className="pixel-corners">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Button
            className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
            onClick={() => window.open('https://discord.renderdragon.org', '_blank')}
          >
            <img src="/assets/discord_icon.png" alt="Discord" className="h-4 w-4 mr-2" />
            Contribute Resources
          </Button>
          <Button
            className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
            onClick={() => window.open('https://creatoronwheels.netlify.app/resources', '_blank')}
          >
            <img src="/assets/domain_icon.png" alt="Old site" className="h-4 w-4 mr-2" />
            Check our Old Site
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="pixel-corners border border-input bg-background text-foreground px-3 py-2"
        >
          <option value="default">Default</option>
          <option value="downloads">Most Downloads</option>
          <option value="alphabetical-az">Alphabetical (A-Z)</option>
          <option value="alphabetical-za">Alphabetical (Z-A)</option>
        </select>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {displayedResources.map((resource, index) => (
          <motion.div
            key={`resource-${resource.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <ResourceCard
              resource={resource}
              downloadCount={downloadCounts[resource.id] || 0}
              onClick={onSelectResource}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ResourcesList;
