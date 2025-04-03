import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-background pt-22 md:pt-32"
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Pixel Art Shapes - Background elements */}
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

      {/* Main Content - Two column layout on desktop, stacked on mobile */}
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left md:pr-8 mt-8 md:mt-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground dark:text-white"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                lineHeight: '1.2',
                textShadow:
                  '0 0 10px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.3)',
                // Removed transform here to keep text fixed
              }}
            >
              <span className="text-cow-purple block mb-2">UNLOCK</span>
              YOUR <span className="text-cow-purple">MINECRAFT</span>
              <br />
              <span className="text-cow-purple">CREATION</span> POTENTIAL
            </h1>

            <p
              className="text-lg md:text-xl mb-8 mx-auto md:mx-0 text-foreground/90 dark:text-white/80"
              style={{
                // Removed transform here to keep text fixed
                maxWidth: '500px',
              }}
            >
              Free assets, tools, and resources for Minecraft content creators, all
              in one place.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 w-full md:w-auto"
              // Removed style with transform to keep buttons fixed
            >
              <Link
                to="/resources"
                className="pixel-btn-primary group flex items-center justify-center space-x-2 hover:scale-105 transition-transform w-full sm:w-auto"
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

            <div className="mt-8 w-full md:w-auto">
              <span className="inline-block bg-cow-purple/20 px-4 py-2 rounded-md pixel-corners text-foreground/70 dark:text-white/70 text-sm md:text-base">
                100% Free. No strings attached.
              </span>
            </div>
          </div>
          
          {/* Dragon Animation - Keep this static too */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div 
              className="relative w-64 h-64 md:w-80 md:h-80"
              // Removed transform here to keep dragon fixed
            >
              <img 
                src="https://gamepedia.cursecdn.com/minecraft_gamepedia/0/0a/Ender_Dragon.gif" 
                alt="Minecraft Ender Dragon" 
                className="w-full h-auto object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pixel art border frame */}
      <div className="absolute inset-4 border-2 border-dashed border-cow-purple/30 pointer-events-none hidden" />
    </section>
  );
};

export default Hero;