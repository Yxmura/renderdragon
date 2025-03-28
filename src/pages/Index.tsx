
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedResources from '@/components/FeaturedResources';
import PopularTools from '@/components/PopularTools';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';

const Index = () => {
  useEffect(() => {
    document.title = 'Creator On Wheels - Free Resources for Content Creators';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <PopularTools />
        <Stats />
      </main>
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Index;
