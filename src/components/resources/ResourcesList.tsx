import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { FolderX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeartedResources } from '@/hooks/useHeartedResources';
import { useState } from 'react';

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
  const { heartedResources, toggleHeart } = useHeartedResources();
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

  // Update the filter to work with string IDs
  const displayedResources = selectedCategory === 'favorites'
    ? sortedResources.filter(resource => heartedResources.includes(String(resource.id)))
    : sortedResources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">Loading resources...</p>
      </div>
    );
  }

  // Update condition to check category and displayedResources length
  const shouldShowNoResourcesMessage =
    (displayedResources.length === 0) ||
    (selectedCategory && selectedCategory !== 'favorites' && !hasCategoryResources);

  if (shouldShowNoResourcesMessage) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="flex justify-center mb-4">
          <FolderX className="h-12 w-12 text-yellow-500" />
        </div>
        <h3 className="text-2xl font-semibold">No resources found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isSearching
            ? `No resources match your search for "${searchQuery}"`
            : selectedCategory === 'favorites'
            ? 'You have no favorited resources yet'
            : selectedCategory
            ? `No resources found in the "${selectedCategory}" category`
            : 'No resources found with the current filters'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
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
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedResources.map((resource) => (
          <ResourceCard
            key={`resource-${resource.id}`}
            resource={resource}
            downloadCount={downloadCounts[resource.id] || 0}
            onClick={onSelectResource}
            onFavoriteToggle={() => toggleHeart(String(resource.id))}
            isFavorited={heartedResources.includes(String(resource.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;
