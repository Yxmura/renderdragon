
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DiscordServer {
  id: number;
  name: string;
  description: string;
  members: number;
  categories: string[];
  inviteUrl: string;
  verified: boolean;
  image?: string;
}

// Mock Discord servers data
const mockServers: DiscordServer[] = [
  {
    id: 1,
    name: 'Minecraft Builders',
    description: 'A community focused on Minecraft building techniques, tutorials, and showcasing your creations. Perfect for content creators looking for build inspiration.',
    members: 25842,
    categories: ['building', 'tutorials', 'showcase'],
    inviteUrl: 'https://discord.gg/example',
    verified: true,
    image: 'https://images.unsplash.com/photo-1614680376408-16afbd2f6b4b?auto=format&fit=crop&q=80&w=2574'
  },
  {
    id: 2,
    name: 'Content Creator Hub',
    description: 'Connect with other Minecraft content creators, share tips, get feedback on your videos, and find collaboration opportunities.',
    members: 14503,
    categories: ['networking', 'feedback', 'collaboration'],
    inviteUrl: 'https://discord.gg/example',
    verified: true,
    image: 'https://images.unsplash.com/photo-1611651105904-5fa9be0292e3?auto=format&fit=crop&q=80&w=2071'
  },
  {
    id: 3,
    name: 'Redstone Engineers',
    description: 'For Minecraft technical players and content creators focused on redstone contraptions, farms, and technical builds.',
    members: 32104,
    categories: ['redstone', 'technical', 'farms'],
    inviteUrl: 'https://discord.gg/example',
    verified: false,
    image: 'https://images.unsplash.com/photo-1613484838923-bfbbbf3a4d4a?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 4,
    name: 'Minecraft Thumbnails & Graphics',
    description: 'A server dedicated to the art of creating eye-catching thumbnails, channel art, and graphics for Minecraft content.',
    members: 8752,
    categories: ['design', 'thumbnails', 'graphics'],
    inviteUrl: 'https://discord.gg/example',
    verified: true,
    image: 'https://images.unsplash.com/photo-1617296538902-887900d9b592?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 5,
    name: 'Minecraft SMP Community',
    description: 'The place to find SMP (Survival Multiplayer) partners and servers for your Minecraft content. Great for storyline and collaboration content.',
    members: 18935,
    categories: ['smp', 'roleplay', 'survival'],
    inviteUrl: 'https://discord.gg/example',
    verified: false,
    image: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&q=80&w=2532'
  },
  {
    id: 6,
    name: 'Minecraft Mods & Plugins',
    description: 'Discover the latest mods and plugins for your Minecraft content. Get technical support and connect with mod developers.',
    members: 29764,
    categories: ['mods', 'plugins', 'technical'],
    inviteUrl: 'https://discord.gg/example',
    verified: true,
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=2574'
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Discord Servers - Renderdragon';
    
    // Simulate API fetch
    setTimeout(() => {
      setServers(mockServers);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleJoinServer = (server: DiscordServer) => {
    window.open(server.inviteUrl, '_blank');
    toast.success(`Opening invite to ${server.name}`, {
      description: "You'll be redirected to Discord",
    });
  };

  const filterCategories = (servers: DiscordServer[]): string[] => {
    const categories = new Set<string>();
    servers.forEach(server => {
      server.categories.forEach(category => {
        categories.add(category);
      });
    });
    return Array.from(categories).sort();
  };

  const filteredServers = selectedCategory
    ? servers.filter(server => server.categories.includes(selectedCategory))
    : servers;

  return (
    <div className="min-h-screen flex flex-col">
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
                <div className="mb-8 flex flex-wrap gap-2 justify-center">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="pixel-corners"
                  >
                    All Categories
                  </Button>
                  
                  {filterCategories(servers).map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="pixel-corners"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServers.map(server => (
                    <div 
                      key={server.id}
                      className="pixel-card overflow-hidden"
                    >
                      {server.image && (
                        <div className="h-40 overflow-hidden -mx-4 -mt-4 mb-4 relative">
                          <img 
                            src={server.image} 
                            alt={server.name} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-vt323">
                          {server.name} 
                          {server.verified && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </h3>
                        
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {formatMemberCount(server.members)} members
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {server.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {server.categories.map(category => (
                          <span 
                            key={category}
                            className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => handleJoinServer(server)}
                        className="w-full pixel-btn-primary flex items-center justify-center"
                      >
                        Join Server
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscordServers;
