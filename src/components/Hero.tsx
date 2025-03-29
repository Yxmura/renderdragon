
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [offset, setOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollTop = window.scrollY;
      setOffset(scrollTop * 0.5);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate mouse position as percentage of window dimensions
      const x = (clientX / windowWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / windowHeight - 0.5) * 2; // -1 to 1
      
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
    <section ref={parallaxRef} className="relative min-h-screen flex items-center overflow-hidden cow-grid-bg">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1605490005049-7c7ab3b5bb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          transform: `translateY(${offset * 0.15}px) translateX(${mousePosition.x * -10}px)`,
          filter: 'blur(3px) brightness(0.4) contrast(1.2)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Cityscape Layer */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/tLHtS8F.png')",
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'repeat-x',
          opacity: 0.7,
          transform: `translateY(${-offset * 0.1}px) translateX(${mousePosition.x * 15}px)`,
          filter: 'brightness(0.4) contrast(1.2)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(155, 135, 245, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(155, 135, 245, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translateY(${offset * 0.3}px) translateX(${mousePosition.x * 5}px)`,
          opacity: 0.4,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Floating Items */}
      {!isMobile && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-12 h-12 bg-cow-purple/30 rounded-lg pixel-corners"
              style={{ 
                top: '20%', 
                left: '20%', 
                transform: `translate(${offset * 0.2 + mousePosition.x * 30}px, ${-offset * 0.1 + mousePosition.y * 30}px) rotate(${offset * 0.05}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
            <div 
              className="absolute w-16 h-16 bg-cow-purple/30 rounded-lg pixel-corners"
              style={{ 
                top: '60%', 
                right: '25%', 
                transform: `translate(${-offset * 0.3 + mousePosition.x * -30}px, ${offset * 0.05 + mousePosition.y * 40}px) rotate(${-offset * 0.05}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
            <div 
              className="absolute w-10 h-10 border-2 border-cow-purple/40 pixel-corners"
              style={{ 
                top: '30%', 
                right: '10%', 
                transform: `translate(${-offset * 0.4 + mousePosition.x * -40}px, ${offset * 0.2 + mousePosition.y * 20}px) rotate(${offset * 0.1}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
            <div 
              className="absolute w-8 h-8 border-2 border-cow-purple/40 pixel-corners"
              style={{ 
                bottom: '35%', 
                left: '15%', 
                transform: `translate(${offset * 0.3 + mousePosition.x * 50}px, ${-offset * 0.15 + mousePosition.y * -30}px) rotate(${-offset * 0.1}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </div>
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-20 md:mt-0">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-glow"
            style={{ 
              fontFamily: "'Press Start 2P', cursive",
              fontSize: isMobile ? '2rem' : '4rem',
              lineHeight: '1.2',
              animation: 'float 6s ease-in-out infinite, animate-glow 2s infinite',
              transform: `translateY(${mousePosition.y * -10}px) translateX(${mousePosition.x * -10}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <span className="text-cow-purple">Unlock</span> Your <br />
            <span className="text-cow-purple">Minecraft</span> <br />
            <span className="text-cow-purple">Creation</span> Potential
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 text-white/80 max-w-lg mx-auto md:mx-0"
            style={{
              transform: `translateY(${mousePosition.y * -5}px) translateX(${mousePosition.x * -5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            Free assets, tools, and resources for Minecraft content creators, all in one place.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            style={{
              transform: `translateY(${mousePosition.y * -3}px) translateX(${mousePosition.x * -3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Link 
              to="/resources" 
              className="pixel-btn-primary group flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <span>Browse Resources</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/guides" 
              className="pixel-btn-secondary hover:scale-105 transition-transform"
            >
              <span>View Guides</span>
            </Link>
          </div>
          
          <p 
            className="mt-6 text-white/70 text-sm md:text-base animate-pulse"
            style={{
              transform: `translateY(${mousePosition.y * -2}px) translateX(${mousePosition.x * -2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <span className="bg-cow-purple/20 px-2 py-1 rounded-md">
              100% Free. No strings attached.
            </span>
          </p>
        </div>
      </div>

      {/* Particle effect */}
      <div className="particle-container absolute inset-0 pointer-events-none">
        {!isMobile && Array.from({ length: 25 }).map((_, index) => (
          <div 
            key={index}
            className="absolute bg-cow-purple/30 rounded-full"
            style={{
              width: Math.random() * 8 + 2 + 'px',
              height: Math.random() * 8 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 6 + 4}s linear infinite`,
              animationDelay: `-${Math.random() * 5}s`,
              transform: `translateY(${offset * (Math.random() * 0.2)}px) translateX(${mousePosition.x * Math.random() * 30}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-20px) translateX(0);
          }
          75% {
            transform: translateY(-10px) translateX(-5px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
