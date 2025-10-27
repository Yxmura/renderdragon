
import { useUserFavorites } from './useUserFavorites';
import { useAuth } from './useAuth';

export const useHeartedResources = () => {
  const { user } = useAuth();
  const userFavorites = useUserFavorites();

  // If user is logged in, use user favorites, otherwise fall back to localStorage
  if (user) {
    return {
      heartedResources: userFavorites.favorites,
      toggleHeart: userFavorites.toggleFavorite,
      isHearted: userFavorites.isFavorited
    };
  }

  // Legacy localStorage fallback for non-authenticated users
  const localStorageKey = 'heartedResources';
  
  const getLocalHeartedResources = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(localStorageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const setLocalHeartedResources = (resources: string[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(localStorageKey, JSON.stringify(resources));
  };

  const heartedResources = getLocalHeartedResources();

  const toggleHeart = (resourceId: string) => {
    const current = getLocalHeartedResources();
    const newHearted = current.includes(resourceId)
      ? current.filter(id => id !== resourceId)
      : [...current, resourceId];
    
    setLocalHeartedResources(newHearted);
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('localFavoritesChanged'));
  };

  const isHearted = (resourceId: string) => {
    return getLocalHeartedResources().includes(resourceId);
  };

  return {
    heartedResources,
    toggleHeart,
    isHearted
  };
};
