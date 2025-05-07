import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { ChevronRight, ChevronLeft, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';

interface VideoCategory {
  id: number;
  name: string;
  description: string;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  creator: string;
  duration: string;
  url: string;
  thumbnail: string;
}

const generateVideoData = (id: string, title: string, creator: string, duration: string): Video => {
  return {
    id,
    title,
    creator,
    duration,
    url: `https://www.youtube.com/watch?v=${id}`,
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
};

const defaultVideoCategories: VideoCategory[] = [
  {
    id: 1,
    name: 'How to Make Thumbnails',
    description: 'Learn how to create eye-catching Minecraft thumbnails that get clicks',
    videos: [
      generateVideoData(
        '9QkyhxA38NU',
        'How to make CLEAN Minecraft Thumbnails! (photoshop)',
        'painpega',
        '12:17'
      ),
      generateVideoData(
        'BuwyONAeqqc',
        'How To Create Minecraft Thumbnails || 2022 [UPDATED]',
        'Seltop',
        '9:00'
      ),
      generateVideoData(
        't3E7hZmfN3g',
        'How To Make CLEAN Bedwars Thumbnails! (Photoshop)',
        'painpega',
        '15:43'
      ),
      generateVideoData(
        'GLxrsOQj9qs',
        'How to Make INSANE Minecraft 1v1 THUMBNAILS',
        'wkso',
        '49:50'
      ),
      generateVideoData(
        'XPTlycqda2o',
        'How To Make Perfect Highlights | 3 Different Methods',
        'Seltop',
        '3:46'
      ),
      generateVideoData(
        'GNEAhE8c5sM',
        'How To Make FREE Minecraft PVP Texture Pack Thumbnail (Photopea)',
        'TriplePVP',
        '15:57'
      ),
      generateVideoData(
        'GfSpbUOjvLA',
        'How to make Minecraft Thumbnails BETTER',
        'ItsProger',
        '7:08'
      ),
    ],
  },
  {
    id: 2,
    name: 'How to Edit in Premiere Pro',
    description: 'Tutorials for editing Minecraft videos in Adobe Premiere Pro & After Effects',
    videos: [
      generateVideoData(
        'yO52Tx60Keg',
        'Premiere Pro Tutorial for Beginners 2025 - Everything You NEED to KNOW! (UPDATED)',
        'Vince Opra',
        '28:58'
      ),
      generateVideoData(
        'rNJMh4lHxp4',
        'After Effects For Beginners 2025 | Everything You NEED to KNOW!',
        'Vince Opra',
        '17:46'
      ),
      generateVideoData(
        'RmMpeXWP3I8',
        'How To Edit VIRAL Minecraft Videos',
        'ItsProger',
        '11:19'
      ),
      generateVideoData(
        'lYj7Mouw-dc',
        'How to Edit a Gaming Video in 2023 (For Beginners)',
        'Finzar',
        '13:54'
      ),
      generateVideoData(
        'sLgHqZSe2o0',
        'How to edit SO good your viewers get addicted to your videos',
        'Learn By Leo',
        '14:31'
      ),
      generateVideoData(
        '5Z0L6WlmpvU',
        'How To Create The BEST 3D Minecraft Animations (Like ccLeaf)',
        'JMLG',
        '13:22'
      ),
    ]
  },
  {
    id: 3,
    name: 'How to Edit in DaVinci Resolve',
    description: 'Tutorials for editing Minecraft videos in DaVinci Resolve',
    videos: [
      generateVideoData(
        'qDHnCFMZ9HA',
        'Introduction to DaVinci Resolve - [Full Course] for Beginners (2024)',
        'Casey Faris',
        '4:39:23'
      ),
      generateVideoData(
        '4DJm9Ki8nwo',
        'Intro To 3D | DaVinci Resolve Tutorial',
        'EliableFX',
        '12:58'
      ),
      generateVideoData(
        'yh-ilLqKMmM',
        "Motion Graphics: A Beginner's Guide (Everything You Need To Know)",
        'Filmic Footprints - Felix Bäuml',
        '15:59'
      ),
      generateVideoData(
        'cBGaCgHC-6k',
        "How To Import and Animate 3D Minecraft Objects in DaVinci Resolve",
        'Kire Atanasov',
        '0:29'
      ),
      generateVideoData(
        '9rNe-BUJNKM',
        "How To Edit A Gaming Montage \\ Davinci Resolve No Plugins \\ Basics Editing Tutorial",
        'Yume',
        '16:48'
      ),
    ]
  }
];

const YouTubeVideos = () => {
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setVideoCategories(defaultVideoCategories);
    setOpenCategories([1]);
    setIsLoading(false);
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
      <Helmet>
        <title>YouTube Videos - Renderdragon</title>
        <meta name="description" content="Watch helpful tutorials and guides for Minecraft content creation. Learn from experienced creators in our curated video collection." />
        <meta property="og:title" content="YouTube Videos - Renderdragon" />
        <meta property="og:description" content="Watch helpful tutorials and guides for Minecraft content creation. Learn from experienced creators in our curated video collection." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/videos.png" />
        <meta property="og:url" content="https://renderdragon.org/youtube-videos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Videos - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/videos.png" />
      </Helmet>
      
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
      <DonateButton />
      
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
