import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedResources from '@/components/FeaturedResources';
import PopularTools from '@/components/PopularTools';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import Partnership from '@/components/Partnership';
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
      <Helmet>
        <title>Renderdragon - Tools & Resources for Minecraft Content Creators</title>
        <meta name="description" content="Free tools and resources for Minecraft content creators. Generate titles with AI, Copyright-free Resources Hub, Check Music Copyright, Background Generator, Player Renderer, and more tools and assets to enhance your content creation workflow." />
        <meta property="og:title" content="Renderdragon - Ad-free Tools & Resources for Minecraft Content Creators" />
        <meta property="og:description" content="Free tools and resources for Minecraft content creators. Generate titles, check music copyright, download videos, and more to enhance your content creation workflow." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/index.png" />
        <meta property="og:url" content="https://renderdragon.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Renderdragon - Tools & Resources for Minecraft Content Creators" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/index.png" />
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
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stats />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
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
