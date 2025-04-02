
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Skull } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-background pt-22 md:pt-32"
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Minecraft Dragon Animation */}
      <div 
        className="absolute w-full h-full pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x * -30}px, ${
            mousePosition.y * -30
          }px, 0px)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div className="dragon-container absolute inset-0 flex items-center justify-center">
          <div className="dragon relative w-64 h-64">
            {/* Dragon Body - Animated cube blocks */}
            <div className="dragon-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="dragon-head w-16 h-16 bg-purple-900 pixel-corners absolute -top-4 -left-4 animate-float-vertical" 
                style={{ animationDelay: '0s', transformOrigin: 'center' }}></div>
              <div className="dragon-body-segment w-12 h-12 bg-purple-800 pixel-corners absolute top-8 left-0 animate-float-vertical" 
                style={{ animationDelay: '-0.2s', transformOrigin: 'center' }}></div>
              <div className="dragon-body-segment w-10 h-10 bg-purple-700 pixel-corners absolute top-16 left-8 animate-float-vertical" 
                style={{ animationDelay: '-0.4s', transformOrigin: 'center' }}></div>
              <div className="dragon-body-segment w-8 h-8 bg-purple-600 pixel-corners absolute top-20 left-16 animate-float-vertical" 
                style={{ animationDelay: '-0.6s', transformOrigin: 'center' }}></div>
              <div className="dragon-tail w-6 h-6 bg-purple-500 pixel-corners absolute top-24 left-24 animate-float-vertical" 
                style={{ animationDelay: '-0.8s', transformOrigin: 'center' }}></div>
              
              {/* Dragon Wings */}
              <div className="dragon-wing w-20 h-16 bg-purple-800/60 pixel-corners absolute -top-2 -left-20 animate-float-vertical" 
                style={{ animationDelay: '-0.3s', transformOrigin: 'right center', animation: 'float-vertical 3s ease-in-out infinite' }}></div>
              <div className="dragon-wing w-20 h-16 bg-purple-800/60 pixel-corners absolute -top-2 left-12 animate-float-vertical" 
                style={{ animationDelay: '-0.7s', transformOrigin: 'left center', animation: 'float-vertical 3.2s ease-in-out infinite' }}></div>
              
              {/* Dragon Eyes */}
              <div className="dragon-eye w-2 h-2 bg-purple-300 absolute -top-1 -left-1"></div>
              <div className="dragon-eye w-2 h-2 bg-purple-300 absolute -top-1 left-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel Art Shapes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x * -50}px, ${
            mousePosition.y * -50
          }px, 100px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div className="absolute left-[15%] top-[10%] w-20 h-20 border-2 border-cow-purple/30 rounded-lg transform rotate-45 animate-float-vertical" />
        <div
          className="absolute right-[20%] top-[20%] w-16 h-16 border-2 border-cow-purple/30 rounded-full animate-float-vertical"
          style={{ animationDelay: '-3s' }}
        />
        <div
          className="absolute left-[25%] bottom-[25%] w-18 h-18 border-2 border-cow-purple/30 transform rotate-12 animate-float-vertical"
          style={{ animationDelay: '-6s' }}
        />
        {/* Pixel art rectangles */}
        <div className="absolute top-[40%] left-[40%] w-12 h-8 bg-cow-purple/20 rounded-sm pixel-corners" />
        <div className="absolute bottom-[30%] right-[30%] w-8 h-12 bg-cow-purple/20 rounded-sm pixel-corners" />
        
        {/* Additional pixel art elements */}
        <div className="absolute top-[15%] right-[15%] w-6 h-6 bg-cow-purple/30 pixel-corners" />
        <div className="absolute bottom-[15%] left-[15%] w-6 h-6 bg-cow-purple/30 pixel-corners" />
        <div className="absolute top-[60%] left-[10%] w-4 h-10 bg-cow-purple/20 pixel-corners" />
        <div className="absolute top-[25%] left-[60%] w-10 h-4 bg-cow-purple/20 pixel-corners" />
      </div>

      {/* Main Content */}
      <div 
        className="container relative z-10 mx-auto px-4 text-center"
        style={{
          transform: `translateZ(80px)`,
        }}
      >
        {/* Dragon logo */}
        <div className="mb-8 inline-block relative animate-float">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-900 to-purple-600 rounded-full animate-pixel-spin transform-gpu pixel-corners">
            <Skull className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          <div className="absolute inset-0 bg-transparent border-4 border-white/20 rounded-full pixel-corners" />
          {/* Example of adding more pixel-style elements */}
          <div
            className="absolute w-3 h-3 text-yellow-300 animate-spin-slow rounded-full bg-yellow-300 pixel-corners"
            style={{
              top: '5%',
              left: '85%',
              transformOrigin: '-15px 30px',
              animationDuration: '12s',
            }}
          />
          <div
            className="absolute w-2 h-2 text-yellow-300 animate-spin-slow rounded-full bg-yellow-300 pixel-corners"
            style={{
              bottom: '5%',
              right: '85%',
              transformOrigin: '35px -15px',
              animationDuration: '18s',
              animationDirection: 'reverse',
            }}
          />
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground dark:text-white text-center"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            lineHeight: '1.2',
            textShadow:
              '0 0 10px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.3)',
            transform: `translateZ(100px) translateY(${
              mousePosition.y * -20
            }px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <span className="text-cow-purple block mb-2">UNLOCK</span>
          YOUR <span className="text-cow-purple">MINECRAFT</span>
          <br />
          <span className="text-cow-purple">CREATION</span> POTENTIAL
        </h1>

        <p
          className="text-lg md:text-xl mb-8 max-w-lg mx-auto text-center text-foreground/90 dark:text-white/80"
          style={{
            transform: `translateZ(50px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Free assets, tools, and resources for Minecraft content creators, all
          in one place.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto"
          style={{
            transform: `translateZ(150px)`,
          }}
        >
          <Link
            to="/resources"
            className="pixel-btn-primary group flex items-center space-x-2 hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <span>Browse Resources</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/guides"
            className="pixel-btn-secondary hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <span>View Guides</span>
          </Link>
        </div>

        <p className="mt-6 text-foreground/70 dark:text-white/70 text-sm md:text-base">
          <span className="bg-cow-purple/20 px-2 py-1 rounded-md pixel-corners">
            100% Free. No strings attached.
          </span>
        </p>
      </div>

      {/* Pixel art border frame */}
      <div className="absolute inset-4 border-2 border-dashed border-cow-purple/30 pointer-events-none hidden" />
    </section>
  );
};

export default Hero;
