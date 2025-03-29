
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
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
    <section className="relative h-screen flex items-center overflow-hidden cow-grid-bg pt-20 md:pt-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent opacity-50 z-10"></div>
      
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1623224316517-dfbe3bf5e612?q=80&w=2670&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.x * -10}px)`,
          filter: 'blur(3px) brightness(0.4) contrast(1.2)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(155, 135, 245, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(155, 135, 245, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 5}px)`,
          opacity: 0.4,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Digital cityscape silhouette */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/tLHtS8F.png')",
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'repeat-x',
          opacity: 0.7,
          transform: `translateY(${-scrollY * 0.1}px) translateX(${mousePosition.x * 15}px)`,
          filter: 'brightness(0.4) contrast(1.2)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Floating elements */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className={`absolute ${index % 2 === 0 ? 'bg-cow-purple/20' : 'border-2 border-cow-purple/20'} rounded-lg pixel-corners`}
              style={{ 
                width: `${Math.random() * 16 + 8}px`,
                height: `${Math.random() * 16 + 8}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                transform: `translate(${scrollY * 0.1 * (index - 3) + mousePosition.x * (index * 5)}px, ${-scrollY * 0.05 * (index - 3) + mousePosition.y * (index * 5)}px) rotate(${scrollY * 0.02 * index}deg)`,
                transition: 'transform 0.1s ease-out',
                animationDelay: `${index * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main content */}
      <div className="container relative z-20 mx-auto px-4 flex flex-col items-center md:items-start">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground dark:text-white text-center md:text-left"
          style={{ 
            fontFamily: "'Press Start 2P', cursive",
            lineHeight: "1.2",
            textShadow: "0 0 10px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.3)",
            transform: `translateY(${mousePosition.y * -5}px) translateX(${mousePosition.x * -5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <span className="text-cow-purple block mb-2">UNLOCK</span>
          YOUR <span className="text-cow-purple">MINECRAFT</span>
          <br />
          <span className="text-cow-purple">CREATION</span> POTENTIAL
        </h1>
        
        <p 
          className="text-lg md:text-xl mb-8 max-w-lg text-center md:text-left text-foreground/80 dark:text-white/80"
          style={{
            transform: `translateY(${mousePosition.y * -3}px) translateX(${mousePosition.x * -3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          Free assets, tools, and resources for Minecraft content creators, all in one place.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full md:w-auto"
          style={{
            transform: `translateY(${mousePosition.y * -2}px) translateX(${mousePosition.x * -2}px)`,
            transition: 'transform 0.1s ease-out'
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
        
        <p 
          className="mt-6 text-foreground/70 dark:text-white/70 text-sm md:text-base"
          style={{
            transform: `translateY(${mousePosition.y * -1}px) translateX(${mousePosition.x * -1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <span className="bg-cow-purple/20 px-2 py-1 rounded-md">
            100% Free. No strings attached.
          </span>
        </p>
      </div>
      
      {/* Subtle particles */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={`particle-${index}`}
              className="absolute bg-cow-purple/30 rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `-${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>
        {`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
