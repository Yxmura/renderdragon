
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollTop = window.scrollY;
      setOffset(scrollTop * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={parallaxRef} className="relative min-h-screen flex items-center overflow-hidden cow-grid-bg">
      {/* Background Layer */}
      <div 
        className="parallax-layer"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1605490005049-7c7ab3b5bb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          transform: `translateY(${offset * 0.15}px)`,
          filter: 'blur(3px) brightness(0.4) contrast(1.2)'
        }}
      />
      
      {/* Cityscape Layer */}
      <div 
        className="parallax-layer"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/tLHtS8F.png')",
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'repeat-x',
          height: '40%',
          bottom: 0,
          top: 'auto',
          opacity: 0.7,
          transform: `translateY(${-offset * 0.1}px)`,
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      />
      
      {/* Grid Lines */}
      <div 
        className="parallax-layer"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(155, 135, 245, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(155, 135, 245, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translateY(${offset * 0.3}px)`,
          opacity: 0.4
        }}
      />

      {/* Floating Items */}
      {!isMobile && (
        <>
          <div className="parallax-layer pointer-events-none">
            <div 
              className="absolute w-12 h-12 bg-cow-blue rounded-lg opacity-30 pixel-corners"
              style={{ 
                top: '20%', 
                left: '20%', 
                transform: `translate(${offset * 0.2}px, ${-offset * 0.1}px) rotate(${offset * 0.05}deg)` 
              }}
            />
            <div 
              className="absolute w-16 h-16 bg-cow-purple rounded-lg opacity-30 pixel-corners"
              style={{ 
                top: '60%', 
                right: '25%', 
                transform: `translate(${-offset * 0.3}px, ${offset * 0.05}px) rotate(${-offset * 0.05}deg)` 
              }}
            />
            <div 
              className="absolute w-10 h-10 border-2 border-cow-purple opacity-40 pixel-corners"
              style={{ 
                top: '30%', 
                right: '10%', 
                transform: `translate(${-offset * 0.4}px, ${offset * 0.2}px) rotate(${offset * 0.1}deg)` 
              }}
            />
            <div 
              className="absolute w-8 h-8 border-2 border-cow-blue opacity-40 pixel-corners"
              style={{ 
                bottom: '35%', 
                left: '15%', 
                transform: `translate(${offset * 0.3}px, ${-offset * 0.15}px) rotate(${-offset * 0.1}deg)` 
              }}
            />
          </div>
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-20 md:mt-0">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel mb-6 text-white leading-tight animate-glow">
            <span className="text-cow-purple">Unlock</span> Your <br />
            <span className="text-cow-blue">Content Creation</span> <br />
            <span className="text-cow-purple">Potential</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-lg mx-auto md:mx-0">
            Free assets, tools, and resources for content creators, all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link 
              to="/resources" 
              className="pixel-btn-primary group flex items-center space-x-2"
            >
              <span>Browse Resources</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/guides" 
              className="pixel-btn-secondary"
            >
              <span>View Guides</span>
            </Link>
          </div>
          
          <p className="mt-6 text-white/70 text-sm md:text-base">
            <span className="bg-cow-purple/20 px-2 py-1 rounded-md">
              100% Free. No strings attached.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
