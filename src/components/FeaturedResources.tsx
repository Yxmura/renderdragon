
import { useState, useEffect } from 'react';
import { Music, Image, Video, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Resource {
  id: number;
  title: string;
  category: string;
  description: string;
  author?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'music':
      return <Music className="h-6 w-6" />;
    case 'image':
      return <Image className="h-6 w-6" />;
    case 'video':
      return <Video className="h-6 w-6" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'music':
      return 'bg-blue-500/10 text-blue-500';
    case 'image':
      return 'bg-purple-500/10 text-purple-500';
    case 'video':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-green-500/10 text-green-500';
  }
};

const FeaturedResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedResources = async () => {
      try {
        console.log('Fetching featured resources...');
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .limit(4);
        
        if (error) {
          console.error('Error fetching featured resources:', error);
          throw error;
        }
        
        console.log('Featured resources:', data);
        if (data) {
          setResources(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch featured resources:', error);
        // Fall back to static data if fetching fails
        setResources([
          {
            id: 1,
            title: 'Epic Cinematic Track',
            category: 'music',
            description: 'Perfect for dramatic scenes and trailers',
            author: 'MusicMaster'
          },
          {
            id: 2,
            title: 'Pixel Art Background Pack',
            category: 'image',
            description: 'Set of 20 cyberpunk pixel art backgrounds',
            author: 'PixelArtist'
          },
          {
            id: 3,
            title: 'Motion Graphics Pack',
            category: 'video',
            description: 'Animated lower thirds and transitions',
          },
          {
            id: 4,
            title: 'Cinematic Color Grading',
            category: 'preset',
            description: 'DaVinci Resolve professional grade presets',
            author: 'ColorGuru'
          }
        ]);
        setIsLoading(false);
      }
    };

    fetchFeaturedResources();
  }, []);

  return (
    <section className="py-20 bg-background cow-grid-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Featured <span className="text-cow-purple">Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular free resources to enhance your content creation
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="pixel-card animate-pulse h-52"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={cn(
                  "pixel-card group transition-all duration-500 hover:shadow-lg cursor-pointer",
                  hoveredId === resource.id ? "scale-105" : ""
                )}
                onMouseEnter={() => setHoveredId(resource.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="mb-4">
                  <div className={cn("inline-flex items-center justify-center p-2 rounded-md", getCategoryColor(resource.category))}>
                    {getCategoryIcon(resource.category)}
                  </div>
                </div>
                
                <h3 className="text-xl font-vt323 mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {resource.description || "No description available"}
                </p>
                
                <div className="flex items-center justify-between">
                  {resource.author ? (
                    <span className="text-xs bg-secondary px-2 py-1 rounded-md">
                      by {resource.author}
                    </span>
                  ) : (
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-md">
                      No credit needed
                    </span>
                  )}
                  
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link 
            to="/resources" 
            className="pixel-btn-secondary inline-flex items-center space-x-2 group"
          >
            <span>View All Resources</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
