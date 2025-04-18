
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

interface VideoCategory {
  id: number;
  name: string;
  description: string;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  creator: string;
  duration: string;
  description: string;
  url: string;
}

// Mock videos data
const mockVideoCategories: VideoCategory[] = [
  {
    id: 1,
    name: 'How to Make Thumbnails',
    description: 'Learn how to create eye-catching Minecraft thumbnails that get clicks',
    videos: [
      {
        id: 'v1',
        title: 'Create Professional Minecraft Thumbnails (Free Tools)',
        thumbnail: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&q=80&w=2532',
        creator: 'PixelPro',
        duration: '12:34',
        description: 'Learn how to create professional Minecraft thumbnails using only free tools like GIMP and Canva. This tutorial covers composition, text placement, and visual effects.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v2',
        title: 'Thumbnail Psychology: Colors That Get Clicks',
        thumbnail: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=2574',
        creator: 'MinecraftMastery',
        duration: '8:27',
        description: 'Discover the psychology behind thumbnail colors and how they affect click-through rates. Learn which color combinations work best for different types of Minecraft content.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v3',
        title: 'Text Effects for Minecraft Thumbnails',
        thumbnail: 'https://images.unsplash.com/photo-1633051501119-9756c6fb094e?auto=format&fit=crop&q=80&w=1995',
        creator: 'CreativeBlocker',
        duration: '15:42',
        description: 'Master text effects that make your thumbnail titles pop. Learn techniques for 3D text, glowing effects, and custom shadows in Photoshop.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v4',
        title: '5 Thumbnail Mistakes to Avoid',
        thumbnail: 'https://images.unsplash.com/photo-1617296538902-887900d9b592?auto=format&fit=crop&q=80&w=2070',
        creator: 'RedstoneRocket',
        duration: '10:18',
        description: 'Avoid these common thumbnail mistakes that could be hurting your channel growth. Learn what works and what doesn\'t based on data from successful Minecraft channels.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 2,
    name: 'How to Edit in Premiere Pro',
    description: 'Tutorials for editing Minecraft videos in Adobe Premiere Pro',
    videos: [
      {
        id: 'v5',
        title: 'Premiere Pro Basics for Minecraft Content Creators',
        thumbnail: 'https://images.unsplash.com/photo-1635514569146-8e8bb34fe2f5?auto=format&fit=crop&q=80&w=1877',
        creator: 'EditMaster',
        duration: '22:16',
        description: 'Start your Premiere Pro journey with this comprehensive beginner tutorial designed specifically for Minecraft content creators. Learn the interface, basic cuts, and essential tools.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v6',
        title: 'Custom Transitions for Minecraft Videos',
        thumbnail: 'https://images.unsplash.com/photo-1614680376739-8360a29eb024?auto=format&fit=crop&q=80&w=2574',
        creator: 'PremierePro Tips',
        duration: '14:53',
        description: 'Create custom transitions that match your Minecraft content style. This tutorial shows you how to design transitions that look professional without using expensive plugins.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v7',
        title: 'Color Grading Minecraft Footage',
        thumbnail: 'https://images.unsplash.com/photo-1626379801357-537572de4ad6?auto=format&fit=crop&q=80&w=1932',
        creator: 'ColorGuru',
        duration: '18:09',
        description: 'Learn how to color grade your Minecraft footage to create different moods and visual styles. This tutorial covers Lumetri Color tools and basic color theory.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 3,
    name: 'How to Edit in DaVinci Resolve',
    description: 'Tutorials for editing Minecraft videos in DaVinci Resolve',
    videos: [
      {
        id: 'v8',
        title: 'DaVinci Resolve: Complete Guide for Minecraft YouTubers',
        thumbnail: 'https://images.unsplash.com/photo-1634757439914-e7ffc3c79fdc?auto=format&fit=crop&q=80&w=1964',
        creator: 'ResolveMaster',
        duration: '28:45',
        description: 'A comprehensive guide to DaVinci Resolve for Minecraft content creators. Learn how to set up your project, edit footage, add effects, and optimize your export settings.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v9',
        title: 'Advanced Color Grading in DaVinci Resolve',
        thumbnail: 'https://images.unsplash.com/photo-1613484838923-bfbbbf3a4d4a?auto=format&fit=crop&q=80&w=2070',
        creator: 'ColorNode',
        duration: '20:37',
        description: 'Take your Minecraft videos to the next level with advanced color grading techniques in DaVinci Resolve. Learn how to use nodes, power windows, and custom LUTs.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'v10',
        title: 'Fusion Effects for Minecraft Videos',
        thumbnail: 'https://images.unsplash.com/photo-1611651105904-5fa9be0292e3?auto=format&fit=crop&q=80&w=2071',
        creator: 'FusionFrenzy',
        duration: '16:22',
        description: 'Create custom visual effects for your Minecraft videos using the Fusion tab in DaVinci Resolve. Learn how to make particle effects, text animations, and more.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  }
];

const YouTubeVideos = () => {
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'YouTube Tutorials - Renderdragon';
    
    // Simulate API fetch
    setTimeout(() => {
      setVideoCategories(mockVideoCategories);
      setOpenCategories([1]); // Open the first category by default
      setIsLoading(false);
    }, 500);
  }, []);

  const toggleCategory = (categoryId: number) => {
    setOpenCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">YouTube</span> Tutorials
            </h1>
            
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Watch these hand-picked tutorials to level up your Minecraft content creation skills.
              From beginners to advanced creators, there's something for everyone.
            </p>
            
            {isLoading ? (
              <div className="space-y-8 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card rounded-md h-20"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {videoCategories.map(category => (
                  <Collapsible 
                    key={category.id} 
                    open={openCategories.includes(category.id)}
                    onOpenChange={() => toggleCategory(category.id)}
                    className="border border-border rounded-md pixel-corners overflow-hidden"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="bg-card p-4 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors">
                        <div>
                          <h2 className="text-2xl font-vt323">{category.name}</h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            {category.description}
                          </p>
                        </div>
                        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${
                          openCategories.includes(category.id) ? 'transform rotate-90' : ''
                        }`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 bg-background/80">
                        <div className="relative">
                          <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
                            {category.videos.map(video => (
                              <div 
                                key={video.id}
                                className="min-w-[300px] max-w-[300px] pixel-card cursor-pointer hover:border-primary transition-all group"
                                onClick={() => setSelectedVideo(video)}
                              >
                                <div className="relative rounded-md overflow-hidden mb-3">
                                  <img 
                                    src={video.thumbnail} 
                                    alt={video.title}
                                    className="w-full h-[168px] object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                                    >
                                      <Play className="h-5 w-5 text-white" fill="white" />
                                      <span className="sr-only">Play</span>
                                    </Button>
                                  </div>
                                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                                    {video.duration}
                                  </div>
                                </div>
                                
                                <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                  {video.title}
                                </h3>
                                
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span>{video.creator}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Video skibidi Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-4xl pixel-corners overflow-y-auto max-h-[90vh] custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-vt323">{selectedVideo?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="secondary">
                {selectedVideo?.creator}
              </Badge>
              <Badge variant="outline">
                {selectedVideo?.duration}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="video-player-container">
              <iframe
                src={selectedVideo?.url.replace('watch?v=', 'embed/')}
                title={selectedVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-md"
              ></iframe>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-vt323">Description</h3>
              <p className="text-muted-foreground">
                {selectedVideo?.description}
              </p>
            </div>
            
            <Button 
              className="w-full pixel-btn-primary"
              onClick={() => window.open(selectedVideo?.url, '_blank')}
            >
              Watch on YouTube
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YouTubeVideos;
