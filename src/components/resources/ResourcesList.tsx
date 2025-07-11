import React from 'react';
import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { FolderX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserFavorites } from '@/hooks/useUserFavorites';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ResourceCardSkeleton from './ResourceCardSkeleton';

interface ResourcesListProps {
  resources: Resource[];
  isLoading: boolean;
  isSearching: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  downloadCounts: Record<string, number>;
  onSelectResource: (resource: Resource) => void;
  onClearFilters: () => void;
  hasCategoryResources: boolean;
  loadMoreResources: () => void;
  hasMore: boolean;
  filteredResources: Resource[];
}

const ResourcesList = ({ 
  resources,
  isLoading,
  isSearching,
  selectedCategory,
  searchQuery,
  downloadCounts,
  onSelectResource,
  onClearFilters,
  hasCategoryResources,
  loadMoreResources,
  hasMore,
  filteredResources,
}: ResourcesListProps) => {
  const { t } = useTranslation();

  if (isLoading && resources.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <ResourceCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const shouldShowNoResourcesMessage =
    (filteredResources.length === 0 && !isLoading) ||
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
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <FolderX className="h-12 w-12 text-yellow-500" />
        </motion.div>
        <h3 className="text-2xl font-bold font-vt323 tracking-wider text-white">{t('no_resources_found')}</h3>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isSearching
            ? t('no_resources_match', { query: searchQuery })
            : selectedCategory === 'favorites'
            ? t('no_favorites_message')
            : selectedCategory
            ? t('no_resources_in_category', { category: t(`${selectedCategory}_category`) })
            : t('no_resources_found')}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Button onClick={onClearFilters} variant="outline" className="pixel-corners">
            <X className="mr-2 h-4 w-4" />
            {t('clear_filters')}
          </Button>
          <Button
            className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
            onClick={() => window.open('https://discord.renderdragon.org', '_blank')}
          >
            <img src="/assets/discord_icon.png" alt="Discord" className="h-4 w-4 mr-2" />
            {t('contribute_resources')}
          </Button>
          <Button asChild className="mt-4 pixel-corners">
            <a href="https://renderdragon.com">{t('check_old_site')}</a>
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {filteredResources.map((resource, index) => (
          <motion.div
            key={`resource-${resource.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
          >
            <ResourceCard
              resource={resource}
              downloadCount={downloadCounts[resource.id] || 0}
              onClick={onSelectResource}
            />
          </motion.div>
        ))}

        {/* Skeleton loaders while fetching additional resources */}
        {isLoading && resources.length > 0 && (
          Array.from({ length: 6 }).map((_, idx) => (
            <ResourceCardSkeleton key={`loader-skeleton-${idx}`} />
          ))
        )}
      </motion.div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMoreResources} disabled={isLoading}>
            {isLoading ? t('loading') : t('load_more')}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(ResourcesList);