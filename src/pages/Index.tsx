import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedResources from '@/components/FeaturedResources';
import PopularTools from '@/components/PopularTools';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';

const Index = () => {
  useEffect(() => {
    document.title = 'Renderdragon - Free Resources for Content Creators';
    
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
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stats />
        </motion.div>
      </main>
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Index;
