import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, PenTool, Film, Code, Gamepad } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet';

interface Software {
  name: string;
  description: string;
  url: string;
  category: 'graphic-design' | 'editing' | 'minecraft-shaders' | 'minecraft-mods';
  isFree: boolean;
}

const software: Software[] = [
  {
    name: 'GIMP',
    description: 'Free and open source image editor, great Photoshop alternative',
    url: 'https://www.gimp.org/',
    category: 'graphic-design',
    isFree: true
  },
  {
    name: 'Inkscape',
    description: 'Professional vector graphics editor',
    url: 'https://inkscape.org/',
    category: 'graphic-design',
    isFree: true
  },
  {
    name: 'DaVinci Resolve',
    description: 'Professional video editing software with a free version',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve/',
    category: 'editing',
    isFree: true
  },
  {
    name: 'OpenShot',
    description: 'Easy to use, open-source video editor',
    url: 'https://www.openshot.org/',
    category: 'editing',
    isFree: true
  },
  {
    name: 'BSL Shaders',
    description: 'Beautiful, realistic Minecraft shaders',
    url: 'https://bitslablab.com/',
    category: 'minecraft-shaders',
    isFree: true
  },
  {
    name: 'Sildurs Vibrant Shaders',
    description: 'Popular shaders with great performance',
    url: 'https://sildurs-shaders.github.io/',
    category: 'minecraft-shaders',
    isFree: true
  },
  {
    name: 'OptiFine',
    description: 'Essential mod for Minecraft performance and shader support',
    url: 'https://optifine.net/',
    category: 'minecraft-mods',
    isFree: true
  },
  {
    name: 'Fabric',
    description: 'Lightweight, modern mod loader for Minecraft',
    url: 'https://fabricmc.net/',
    category: 'minecraft-mods',
    isFree: true
  }
];

const UsefulSoftware = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('graphic-design');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'graphic-design':
        return <PenTool className="h-5 w-5" />;
      case 'editing':
        return <Film className="h-5 w-5" />;
      case 'minecraft-shaders':
        return <Code className="h-5 w-5" />;
      case 'minecraft-mods':
        return <Gamepad className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Useful Software - Renderdragon</title>
        <meta name="description" content="Discover essential software tools for Minecraft content creators. Find video editing, recording, and streaming software recommendations." />
        <meta property="og:title" content="Useful Software - Renderdragon" />
        <meta property="og:description" content="Discover essential software tools for Minecraft content creators. Find video editing, recording, and streaming software recommendations." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/software.png" />
        <meta property="og:url" content="https://renderdragon.org/useful-software" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Useful Software - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/software.png" />
      </Helmet>
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-24">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-pixel mb-4">
            Useful <span className="text-cow-purple">Software</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of free and premium software to enhance your content creation workflow
          </p>
        </motion.div>

        <Tabs defaultValue="graphic-design" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0">
            {['graphic-design', 'editing', 'minecraft-shaders', 'minecraft-mods'].map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="pixel-corners data-[state=active]:bg-cow-purple data-[state=active]:text-white flex items-center gap-2 h-12"
              >
                {getCategoryIcon(category)}
                <span className="capitalize">{category.replace('-', ' ')}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {['graphic-design', 'editing', 'minecraft-shaders', 'minecraft-mods'].map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              >
                {software
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredCard(item.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <Card className="h-full transition-all duration-300 hover:shadow-xl pixel-corners border-2 border-primary/20 hover:border-primary/40">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="font-vt323 text-xl">{item.name}</span>
                              {item.isFree && (
                                <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-md">
                                  Free
                                </span>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <motion.div
                              className="flex items-center text-sm font-medium text-primary"
                              animate={{
                                x: hoveredCard === item.name ? 5 : 0
                              }}
                            >
                              Visit Website
                              <ArrowUpRight className="ml-1 h-4 w-4" />
                            </motion.div>
                          </CardContent>
                        </Card>
                      </a>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UsefulSoftware;