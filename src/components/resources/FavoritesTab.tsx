
import React from 'react';
import { motion } from 'framer-motion';
import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';
import { useUserFavorites } from '@/hooks/useUserFavorites';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Heart, LogIn } from 'lucide-react';

interface FavoritesTabProps {
  downloadCounts: Record<string, number>;
  onSelectResource: (resource: Resource) => void;
  allResources: Resource[];
  onShowAuth: () => void;
}

const FavoritesTab = ({ downloadCounts, onSelectResource, allResources, onShowAuth }: FavoritesTabProps) => {
  const { user } = useAuth();
  const { favorites, loading } = useUserFavorites();
  
  const favoriteResources = allResources.filter(resource => 
    favorites.includes(String(resource.id))
  );

  if (!user) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
        </motion.div>
        <h3 className="text-2xl font-vt323 mb-4">Sign in to see your favorites</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Create an account to save your favorite resources and access them from any device.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onShowAuth} className="pixel-btn-primary">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-xl text-muted-foreground">Loading your favorites...</p>
      </div>
    );
  }

  if (favoriteResources.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        </motion.div>
        <h3 className="text-2xl font-vt323 mb-4">No favorites yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Start exploring resources and click the heart icon to add them to your favorites!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {favoriteResources.map((resource, index) => (
        <motion.div
          key={`resource-${resource.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <ResourceCard
            resource={resource}
            downloadCount={downloadCounts[resource.id] || 0}
            onClick={onSelectResource}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FavoritesTab;
