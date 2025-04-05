
import { useEffect } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <PopularTools />
        <Testimonials />
        <Stats />
      </main>
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Index;
