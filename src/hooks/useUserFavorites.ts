import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useUserFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('resource_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setFavorites(data?.map(fav => fav.resource_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, fetchFavorites]);

  const toggleFavorite = useCallback(async (resourceId: string) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    const isFavorited = favorites.includes(resourceId);
    
    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('resource_id', resourceId);

        if (error) throw error;
        
        setFavorites(prev => prev.filter(id => id !== resourceId));
        toast.success('Removed from favorites');
      } else {
        const { error } = await supabase
          .from('user_favorites')
          .insert({ user_id: user.id, resource_id: resourceId });

        if (error) throw error;
        
        setFavorites(prev => [...prev, resourceId]);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  }, [user, favorites]);

  const isFavorited = (resourceId: string) => favorites.includes(resourceId);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorited,
  };
};