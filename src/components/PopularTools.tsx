import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Music, Bot, Image, PersonStanding } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const PopularTools = () => {
  const tools: Tool[] = [
    {
      id: 1,
      title: 'Music Copyright Checker',
      description: 'Check if a song is copyrighted before using it in your videos.',
      icon: Music,
      path: '/gappa',
      color: 'from-blue-500/80 to-blue-600/80'
    },
    {
      id: 2,
      title: 'YouTube Video Downloader',
      description: 'Download YouTube videos in various formats and resolutions.',
      icon: Download,
      path: '/youtube-downloader',
      color: 'from-purple-500/80 to-purple-600/80'
    },
    {
      id: 3,
      title: 'Background Generator',
      description: 'Create unique and stunning backgrounds for your thumbnails.',
      icon: Image,
      path: '/background-generator',
      color: 'from-green-500/80 to-green-600/80'
    },
    {
      id: 4,
      title: 'Player Renderer',
      description: 'Render a 3D model of a Minecraft player skin.',
      icon: PersonStanding,
      path: '/player-renderer',
      color: 'from-red-500/80 to-red-600/80'
    }
  ];
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Popular <span className="text-cow-purple">Tools</span>
          </h2>
          <p className=" max-w-2xl mx-auto">
            A collection of our most used tools to help you with your content creation.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
            >
              <Link 
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
                  <motion.div 
                    className="p-3 bg-white/10 rounded-md w-fit mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <tool.icon className="h-6 w-6" />
                  </motion.div>
                  
                  <h3 className="text-xl font-vt323 mb-2">{tool.title}</h3>
                  
                  <p className="text-white/70 text-sm flex-grow">
                    {tool.description}
                  </p>
                  
                  <motion.div 
                    className={cn(
                      "mt-4 text-sm font-semibold",
                      "transition-transform duration-300",
                      hoveredId === tool.id ? "translate-x-2" : ""
                    )}
                    whileHover={{ x: 5 }}
                  >
                    Try it now
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(PopularTools);