import { useState, useEffect } from 'react';

export const useHeartedResources = () => {
  const [heartedResources, setHeartedResources] = useState<string[]>([]);

  useEffect(() => {
    // Load hearted resources from localStorage on mount
    const stored = localStorage.getItem('heartedResources');
    if (stored) {
      setHeartedResources(JSON.parse(stored));
    }
  }, []);

  const toggleHeart = (resourceId: string) => {
    setHeartedResources(prev => {
      const newHearted = prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId];
      
      // Save to localStorage
      localStorage.setItem('heartedResources', JSON.stringify(newHearted));
      return newHearted;
    });
  };

  const isHearted = (resourceId: string) => {
    return heartedResources.includes(resourceId);
  };

  return {
    heartedResources,
    toggleHeart,
    isHearted
  };
};