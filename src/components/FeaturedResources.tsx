'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/lib/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Resource } from '@/types/resources';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceCardSkeleton from './resources/ResourceCardSkeleton';

const FeaturedResources = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/resources.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
        }
        const resourcesData = await response.json();

        const allResources: Resource[] = Object.entries(resourcesData).flatMap(
          ([category, resources]) =>
            (resources as any[]).map((resource) => ({ 
              ...resource, 
              category: category as 'music' | 'sfx' | 'images' | 'animations' | 'fonts' | 'presets',
            })),
        );
        
        const sortedResources = [...allResources].slice(0, 4);
        
        setFeaturedResources(sortedResources);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25
      }
    }
  };

  return (
    <section className="py-20 bg-background cow-grid-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Featured <span className="text-cow-purple">Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of our most popular resources to get started.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
              >
                <Link
                  to="/resources"
                  onMouseEnter={() => setHoveredId(resource.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group"
                >
                  <ResourceCard
                    resource={resource}
                    downloadCount={0}
                    onClick={() => {}} 
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/resources" 
            className="pixel-btn-secondary inline-flex items-center space-x-2 group"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedResources);