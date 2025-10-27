'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedResources from '@/components/FeaturedResources';
import PopularTools from '@/components/PopularTools';
import Testimonials from '@/components/Testimonials';
import Partnership from '@/components/Partnership';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';

const Index = () => {
  useEffect(() => {
    const fontLinks = [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Chakra+Petch:wght@300;400;500;600;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
      }
    ];
    
    fontLinks.forEach(font => {
      const linkElement = document.createElement('link');
      linkElement.rel = font.rel;
      linkElement.href = font.href;
      document.head.appendChild(linkElement);
    });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>RenderDragon - Free Resources for Creators</title>
        <meta name="description" content="The ultimate hub for creators. Find free resources for your next project, including music, sound effects, images, and more." />
        <meta property="og:title" content="RenderDragon - Free Resources for Creators" />
        <meta property="og:description" content="The ultimate hub for creators. Find free resources for your next project, including music, sound effects, images, and more." />
        <meta property="og:image" content="https://renderdragon.org/ogimg.png" />
        <meta property="og:url" content="https://renderdragon.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RenderDragon - Free Resources for Creators" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg.png" />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>
        
        <motion.div {...fadeInUp}>
          <FeaturedResources />
        </motion.div>

        <motion.div {...fadeInUp}>
          <PopularTools />
        </motion.div>

        <motion.section {...stagger}>
          <Testimonials />
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Partnership/>
        </motion.div>
      </main>
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Index;