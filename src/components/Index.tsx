
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
    
    // Load Geist font
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'; // Using Inter as a substitute for Geist
    document.head.appendChild(linkElement);
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
