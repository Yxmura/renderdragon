import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { JoinServerIcon } from '@/components/JoinServerIcon';
import { Badge } from '@/components/ui/badge';
import DonateButton from '@/components/DonateButton';
import { Helmet } from 'react-helmet';

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
    inviteUrl: 'https://discord.gg/thumbnail',
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
    image: 'https://cdn.discordapp.com/icons/1317605088558190602/7217661b197ef804501ddbe6eb749cd0.webp?size=100&quality=lossless',
    categories: ['editing', 'design']
  }
];

const formatMemberCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const DiscordServers = () => {
  const [servers, setServers] = useState<DiscordServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Discord Servers - Renderdragon';
    
    setTimeout(() => {
      setServers(SERVERS_DATA);
      setIsLoading(false);
    }, 500);
  }, []); 

  const handleJoinServer = (server: DiscordServer) => {
    window.open(server.inviteUrl, '_blank');
    toast.success(`Opening invite to ${server.name}`, {
      description: "You'll be redirected to Discord",
    });
  };

  const filteredServers = servers; 

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Discord Servers - Renderdragon</title>
        <meta name="description" content="Join our Discord servers to connect with other Minecraft content creators, get feedback on your videos, and find collaboration opportunities." />
        <meta property="og:title" content="Discord Servers - Renderdragon" />
        <meta property="og:description" content="Join our Discord servers to connect with other Minecraft content creators, get feedback on your videos, and find collaboration opportunities." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/discords.png" />
        <meta property="og:url" content="https://renderdragon.org/discord-servers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discord Servers - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/discords.png" />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Discord</span> Servers
            </h1>
            
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Connect with other Minecraft content creators, get feedback on your videos,
              and find collaboration opportunities in these Discord communities.
            </p>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-card rounded-md h-64"></div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServers.map(server => (
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
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {formatMemberCount(server.members)} members
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
                          Join Server
                          <JoinServerIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <DonateButton />
    </div>
  );
};

export default DiscordServers;
