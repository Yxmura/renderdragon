import { useState, useEffect, useRef } from 'react';
import { Users, Download, Star, ThumbsUp } from 'lucide-react';

interface Stat {
  value: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
}

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<Stat[]>([
    {
      value: 50,
      label: 'Content Creators',
      icon: Users,
      suffix: '+'
    },
    {
      value: 100,
      label: 'Assets Downloaded',
      icon: Download,
      suffix: '+',
    },
    {
      value: 4.6,
      label: 'Average Rating',
      icon: Star,
      suffix: '/5'
    },
    {
      value: 90,
      label: 'Satisfaction Rate',
      icon: ThumbsUp,
      suffix: '%'
    }
  ]);
  const [counts, setCounts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countingStarted = useRef(false);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) {
      return '0';
    }
    
    if (Number.isInteger(num)) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    }
    
    return num.toFixed(1);
  };

  useEffect(() => {
    setCounts(stats.map(() => 0));
  }, [stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !countingStarted.current) {
      countingStarted.current = true;
      
      stats.forEach((stat, index) => {
        const target = stat.value;
        const duration = 2000;
        const stepTime = 50; 
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = current;
            return newCounts;
          });
        }, stepTime);
      });
    }
  }, [isVisible, stats]);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Trusted By <span className="text-cow-purple">Creators</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of content creators who use our resources daily
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-6 pixel-card">
              <div className="mb-4 p-3 bg-primary/10 text-primary rounded-full">
                <stat.icon className="h-6 w-6" />
              </div>
              
              <div className="text-3xl md:text-4xl font-vt323 mb-2 text-primary animate-glow">
                {formatNumber(counts[index])}{stat.suffix}
              </div>
              
              <div className="text-muted-foreground text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
