import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { FolderX, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeartedResources } from '@/hooks/useHeartedResources';

interface ResourcesListProps {
  resources: Resource[];
  filteredResources: Resource[];
  isLoading: boolean;
  isSearching: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  downloadCounts: Record<number, number>;
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
  const { heartedResources } = useHeartedResources();

  // Sort resources to show hearted ones first
  const sortedResources = [...filteredResources].sort((a, b) => {
    const aHearted = heartedResources.includes(a.id);
    const bHearted = heartedResources.includes(b.id);
    if (aHearted && !bHearted) return -1;
    if (!aHearted && bHearted) return 1;
    return 0;
  });

  //  no resources match filters or the category has 0 resources
  const shouldShowNoResourcesMessage = filteredResources.length === 0 || (selectedCategory && !hasCategoryResources);
  
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">
          Loading resources...
        </p>
      </div>
    );
  }

  if (shouldShowNoResourcesMessage) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="flex justify-center mb-4">
          <FolderX className="h-12 w-12 text-yellow-500" />
        </div>
        <h3 className="text-2xl font-semibold">No resources found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isSearching ? 
            `No resources match your search for "${searchQuery}"` : 
            selectedCategory ? 
              `No resources found in the "${selectedCategory}" category` :
              "No resources found with the current filters"}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button 
            onClick={onClearFilters} 
            variant="outline"
            className="pixel-corners"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Button 
            className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
            onClick={() => window.open("https://discord.renderdragon.org", "_blank")}
          >
            <img src="/assets/discord_icon.png" alt="Discord" className="h-4 w-4 mr-2" />
            Contribute Resources
          </Button>
          <Button 
            className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
            onClick={() => window.open("https://creatoronwheels.netlify.app/resources", "_blank")}
          >
            <img src="/assets/domain_icon.png" alt="Old site" className="h-4 w-4 mr-2" />
            Check our Old Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {sortedResources.map((resource) => (
        <ResourceCard
          key={`resource-${resource.id}`}
          resource={resource}
          downloadCount={downloadCounts[resource.id] || 0}
          onClick={onSelectResource}
        />
      ))}
    </div>
  );
};

export default ResourcesList;
