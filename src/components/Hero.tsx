import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-background px-6 py-20 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40}px, 0)`,
        }}
      >
        <div className="absolute left-[10%] top-[15%] w-16 h-16 border-2 border-cow-purple/30 rounded-lg rotate-45 animate-float-vertical" />
        <div className="absolute right-[12%] top-[20%] w-10 h-10 bg-cow-purple/20 rounded-full animate-float-horizontal" />
        <div className="absolute left-[20%] bottom-[20%] w-12 h-12 bg-cow-purple/20 rotate-12 pixel-corners animate-float-vertical" />
        <div className="absolute right-[25%] bottom-[15%] w-8 h-8 bg-cow-purple/30 pixel-corners animate-float-horizontal" />
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 text-foreground dark:text-white leading-tight"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            lineHeight: '1.1',
            textShadow:
              '0 0 12px rgba(155, 135, 245, 0.6), 0 0 24px rgba(155, 135, 245, 0.4)',
          }}
        >
          UNLOCK YOUR <br />
          <span className="text-cow-purple">MINECRAFT POTENTIAL</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 dark:text-white/80 max-w-2xl mx-auto mb-10">
          Tools, textures, sounds, inspiration, and everything in between — handcrafted for Minecraft creators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/resources"
            className="pixel-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm hover:scale-105 transition-transform"
          >
            <ArrowRight className="w-4 h-4" />
            Browse Resources
          </Link>

          <Link
            to="/guides"
            className="pixel-btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm hover:scale-105 transition-transform"
          >
            <BookOpen className="w-4 h-4" />
            View Guides
          </Link>
        </div>

        <div className="mt-10">
          <span className="text-xl text-foreground/70 dark:text-white/70 bg-cow-purple/10 px-4 py-2 rounded pixel-corners">
            100% Free. No strings attached.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
