import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const tools: Tool[] = [
    {
      id: 1,
      title: t('popularTools.tools.musicCopyright.title'),
      description: t('popularTools.tools.musicCopyright.description'),
      icon: Music,
      path: '/gappa',
      color: 'from-blue-500/80 to-blue-600/80'
    },
    {
      id: 2,
      title: t('popularTools.tools.videoDownloader.title'),
      description: t('popularTools.tools.videoDownloader.description'),
      icon: Download,
      path: '/youtube-downloader',
      color: 'from-purple-500/80 to-purple-600/80'
    },
    {
      id: 3,
      title: t('popularTools.tools.backgroundGenerator.title'),
      description: t('popularTools.tools.backgroundGenerator.description'),
      icon: Image,
      path: '/background-generator',
      color: 'from-green-500/80 to-green-600/80'
    },
    {
      id: 4,
      title: t('popularTools.tools.playerRenderer.title'),
      description: t('popularTools.tools.playerRenderer.description'),
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
            {t('popularTools.title')} <span className="text-cow-purple">{t('popularTools.titleHighlight')}</span>
          </h2>
          <p className=" max-w-2xl mx-auto">
            {t('popularTools.description')}
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
                    {t('popularTools.tryItNow')}
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