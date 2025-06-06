
import { motion } from 'framer-motion';
import { useHeartedResources } from '@/hooks/useHeartedResources';
import { useResources } from '@/hooks/useResources';
import { Heart, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FavoritesTab = () => {
  const { heartedResources, toggleHeart } = useHeartedResources();
  const { resources, isLoading } = useResources();

  const favoriteResources = resources.filter(resource => 
    heartedResources.includes(resource.id.toString())
  );

  const handleDownload = (resource: any) => {
    // Track download
    fetch('/api/download-tracker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId: resource.id })
    }).catch(console.error);

    // Open download link
    window.open(resource.download_url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg pixel-corners" />
        ))}
      </div>
    );
  }

  if (favoriteResources.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-vt323 mb-2">No favorites yet</h3>
        <p className="text-muted-foreground">
          Start exploring resources and add them to your favorites!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteResources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="pixel-corners overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={resource.image_url}
                alt={resource.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                onClick={() => toggleHeart(resource.id.toString())}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-vt323 text-lg text-cow-purple mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {resource.category}
                  </Badge>
                  {resource.category && (
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleDownload(resource)}
                    className="flex-1 pixel-btn-primary text-sm"
                    size="sm"
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                  
                  {resource.preview_url && (
                    <Button
                      onClick={() => window.open(resource.preview_url, '_blank')}
                      variant="outline"
                      size="sm"
                      className="pixel-corners"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {resource.download_count && (
                  <p className="text-xs text-muted-foreground">
                    {resource.download_count.toLocaleString()} downloads
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FavoritesTab;
