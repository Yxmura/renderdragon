import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { ChevronRight, Play, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { JoinServerIcon } from '@/components/JoinServerIcon';
import CommunityPageSkeleton from '@/components/skeletons/CommunityPageSkeleton';

// Types
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

type Category = 'editing' | 'design';

interface DiscordServer {
  id: number;
  name: string;
  description: string;
  members: number;
  inviteUrl: string;
  image?: string;
  categories: Category[];
}

// Data
const SERVERS_DATA: DiscordServer[] = [
  {
    id: 1,
    name: 'Creator Coaster',
    description: "Creator Coaster server will be your best friend through out your content creation journey, varying from assets up to professional editors & artists that are willing to help you no matter what! No matter what you need help in, we're down to help you by having active staff & helpers that would be pleased to help!",
    members: 12500,
    inviteUrl: 'https://discord.gg/uvWYV82f8J',
    image: 'https://cdn.discordapp.com/icons/1075932452842909806/a_40d64cc9e3aabcd7b42a6027a399d2e6.webp?size=100&quality=lossless',
    categories: ['editing', 'design']
  },
  {
    id: 2,
    name: 'Minecraft Design Hub',
    description: 'The Minecraft Design Hub is run by qualified designers with an extensive background in the GFX industry. We enjoy making designs, playing games and helping the community. In this community, you can purchase designs from our top notch designers.',
    members: 6000,
    inviteUrl: 'https://discord.gg/vYprQ9sK4v',
    image: 'https://cdn.discordapp.com/icons/972091816004444170/f4457c7980f91b0bbbc2ecb7af0f0ecf.webp?size=100&quality=lossless',
    categories: ['design']
  },
  {
    id: 3,
    name: 'Thumbnailers',
    description: "Thumbnailers is a thriving community for Minecraft thumbnail designers. Whether you're a beginner or a pro, you'll find resources, feedback, and help to improve your skills and showcase your work. Join us to elevate your designs!",
    members: 2500,
    inviteUrl: 'https://discord.gg/4Q8MwTaSyh',
    image: 'https://cdn.discordapp.com/icons/1102968474894082081/1f868f37cb129b50e27497984a7b020d.png?size=4096',
    categories: ['design']
  },
  {
    id: 4,
    name: 'EditHub',
    description: "EditHub is the ultimate content creation hub for editors, designers, and creators looking to grow and improve. Whether you're searching for high-quality presets, assets, or expert advice, this server has everything you need in one place. Connect with like-minded individuals who are passionate about editing, content creation, and digital media.",
    members: 1500,
    inviteUrl: 'https://discord.gg/rrFFMAut3r',
    image: 'https://cdn.discordapp.com/icons/1014715191075811328/a_609aa97aad2f2726480ffe8b5b15567c.webp',
    categories: ['design', 'editing']
  },
  {
    id: 5,
    name: 'Renderdragon',
    description: "Our official Discord server where you can suggest assets, contact us for questions or suggestions and more. We live by our community and we'd love to hear your feedback!", 
    members: 100,
    inviteUrl: 'https://discord.gg/d9zxkkdBWV',
    image: '/renderdragon.png',
    categories: ['editing', 'design']
  }
];

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

const formatMemberCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const Community = () => {
  const { t } = useTranslation('community');
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>([]);
  const [servers, setServers] = useState<DiscordServer[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setVideoCategories(defaultVideoCategories);
      setServers(SERVERS_DATA);
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleCategory = (categoryId: number) => {
    setOpenCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleJoinServer = (server: DiscordServer) => {
    window.open(server.inviteUrl, '_blank');
    toast.success(`Opening invite to ${server.name}`, {
      description: t('toast.description'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{t('seo.title')} - Renderdragon</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/community.png" />
        <meta property="og:url" content="https://renderdragon.org/community" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/community.png" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-24 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-4 text-center">
              {t('title.prefix')} <span className="text-cow-purple">{t('title.highlight')}</span>
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
            
            {isLoading ? <CommunityPageSkeleton /> : (
            <Tabs defaultValue="tutorials" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="tutorials">{t('tabs.tutorials')}</TabsTrigger>
                <TabsTrigger value="servers">{t('tabs.servers')}</TabsTrigger>
              </TabsList>

              <TabsContent value="tutorials">
                {isLoading ? (
                  <div className="space-y-8 animate-pulse">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-card rounded-md h-20"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-12">
                    {videoCategories.map((category) => (
                      <div key={category.id} className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-vt323">{t(`tutorials.${category.id}.name`)}</h2>
                          <p className="text-sm text-muted-foreground">{t('common.videoCount', { count: category.videos.length })}</p>
                        </div>
                        <p className="text-muted-foreground">{t(`tutorials.${category.id}.description`)}</p>
                        <Collapsible 
                          key={category.id} 
                          open={openCategories.includes(category.id)}
                          onOpenChange={() => toggleCategory(category.id)}
                          className="border border-border rounded-md pixel-corners overflow-hidden"
                        >
                          <CollapsibleTrigger asChild>
                            <div className="bg-card p-4 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors">
                              <div>
                                <h2 className="text-2xl font-vt323">{t(`tutorials.${category.id}.name`)}</h2>
                                <p className="text-muted-foreground text-sm mt-1">
                                  {t(`tutorials.${category.id}.description`)}
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
                                            <span className="sr-only">{t('common.playVideo')}</span>
                                          </Button>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                                          {video.duration}
                                        </div>
                                      </div>
                                      
                                      <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{video.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                          {t('common.creator', { creator: video.creator })} • {video.duration}
                                        </p>
                                      </div>
                                      <Button variant="ghost" size="icon" className="flex-shrink-0" aria-label={t('common.playVideo')}>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="servers">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-card rounded-md h-64"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {servers.map(server => (
                      <div 
                        key={server.id}
                        className="pixel-card overflow-hidden p-6 flex flex-col h-full"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          {server.image && (
                            <div className="flex-shrink-0">
                              <img 
                                src={server.image} 
                                alt={server.name} 
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                              />
                            </div>
                          )}
                          
                          <div className="flex flex-col">
                            <h3 className="text-xl font-vt323">
                              {server.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex gap-2">
                                {server.categories.map((category) => (
                                  <Badge 
                                    key={category}
                                    variant="secondary" 
                                    className="capitalize"
                                  >
                                    {t(`categories.${category}`)}
                                  </Badge>
                                ))}
                              </div>
                              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {formatMemberCount(server.members)} {t('common.members')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground flex-grow">
                          {server.description}
                        </p>
                        
                        <div className="mt-4">
                          <Button 
                            onClick={() => handleJoinServer(server)}
                            className="w-full pixel-btn-primary flex items-center justify-center"
                          >
                            {t('common.joinServer')}
                            <JoinServerIcon />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <DonateButton />
      
      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>
              {t('common.byCreator', { creator: selectedVideo?.creator })} • {selectedVideo?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <div className="flex justify-end">
            <Button asChild variant="outline">
              <a
                href={selectedVideo?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {t('common.watchOnYouTube')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;