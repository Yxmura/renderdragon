
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Music, Bot, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const tools: Tool[] = [
  {
    id: 1,
    title: 'YouTube Downloader',
    description: 'Download videos from YouTube to use in your content',
    icon: Download,
    path: '/construction',
    color: 'from-red-500/80 to-red-600/80'
  },
  {
    id: 2,
    title: 'Music Copyright Checker',
    description: 'Check if music tracks are safe to use in your videos',
    icon: Music,
    path: '/music-copyright',
    color: 'from-blue-500/80 to-blue-600/80'
  },
  {
    id: 3,
    title: 'AI Title Helper',
    description: 'Generate catchy titles for your YouTube videos',
    icon: Bot,
    path: '/ai-title-helper',
    color: 'from-purple-500/80 to-purple-600/80'
  },
  {
    id: 4,
    title: 'Background Generator',
    description: 'Create unique backgrounds for your videos and streams',
    icon: Image,
    path: '/background-generator',
    color: 'from-green-500/80 to-green-600/80'
  }
];

const PopularTools = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Popular <span className="text-cow-purple">Tools</span>
          </h2>
          <p className=" max-w-2xl mx-auto">
            Free tools to streamline your content creation workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.id}
              to={tool.path}
              className="block"
              onMouseEnter={() => setHoveredId(tool.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={cn(
                  "h-full pixel-corners flex flex-col p-6 bg-gradient-to-br border-2",
                  tool.color,
                  "border-white/10 text-white transition-all duration-300",
                  hoveredId === tool.id ? "border-white/30 shadow-lg scale-[1.02]" : ""
                )}
              >
                <div className="p-3 bg-white/10 rounded-md w-fit mb-4">
                  <tool.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-vt323 mb-2">{tool.title}</h3>
                
                <p className="text-white/70 text-sm flex-grow">
                  {tool.description}
                </p>
                
                <div className={cn(
                  "mt-4 text-sm font-semibold",
                  "transition-transform duration-300",
                  hoveredId === tool.id ? "translate-x-2" : ""
                )}>
                  Try it now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTools;
