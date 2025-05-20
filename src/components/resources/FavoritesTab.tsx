import React from 'react';
import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { useHeartedResources } from '@/hooks/useHeartedResources';

interface FavoritesTabProps {
  downloadCounts: Record<string, number>;
  onSelectResource: (resource: Resource) => void;
  allResources: Resource[];
}

const FavoritesTab = ({ downloadCounts, onSelectResource, allResources }: FavoritesTabProps) => {
  const { heartedResources } = useHeartedResources();
  
  const favoriteResources = allResources.filter(resource => 
    heartedResources.includes(String(resource.id))
  );

  if (favoriteResources.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">
          You have no favorited resources yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favoriteResources.map((resource) => (
        <ResourceCard
          key={`resource-${resource.id}`}
          resource={resource}
          downloadCount={downloadCounts[resource.id] || 0}
          onClick={onSelectResource}
          isFavorited={true}
        />
      ))}
    </div>
  );
};

export default FavoritesTab;