
import { useState, useEffect, useRef } from 'react';
import { Users, Download, Star, ThumbsUp } from 'lucide-react';

interface Stat {
  value: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
  dynamicFetch?: boolean;
}

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<Stat[]>([
    {
      value: 20000,
      label: 'Content Creators',
      icon: Users,
      suffix: '+'
    },
    {
      value: 0, // Will be fetched dynamically
      label: 'Assets Downloaded',
      icon: Download,
      suffix: '+',
      dynamicFetch: true
    },
    {
      value: 4.8,
      label: 'Average Rating',
      icon: Star,
      suffix: '/5'
    },
    {
      value: 98,
      label: 'Satisfaction Rate',
      icon: ThumbsUp,
      suffix: '%'
    }
  ]);
  const [counts, setCounts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countingStarted = useRef(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  useEffect(() => {
    // Fetch dynamic data (downloads count)
    const fetchDownloadsCount = async () => {
      try {
        const response = await fetch('/api/stats/downloads');
        const data = await response.json();
        
        // Update the downloads count in the stats array
        setStats(prevStats => {
          return prevStats.map(stat => {
            if (stat.dynamicFetch) {
              return { ...stat, value: data.downloads || 125000 }; // fallback to 125000 if API fails
            }
            return stat;
          });
        });
      } catch (error) {
        console.error('Failed to fetch download stats:', error);
        // Set a fallback value if fetch fails
        setStats(prevStats => {
          return prevStats.map(stat => {
            if (stat.dynamicFetch) {
              return { ...stat, value: 125000 };
            }
            return stat;
          });
        });
      }
    };

    fetchDownloadsCount();
  }, []);

  useEffect(() => {
    // Initialize counts array based on stats length
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !countingStarted.current) {
      countingStarted.current = true;
      
      stats.forEach((stat, index) => {
        const target = stat.value;
        const duration = 2000; // ms
        const stepTime = 50; // ms
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
            newCounts[index] = Math.floor(current);
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
                {stat.value === 4.8 ? counts[index].toFixed(1) : formatNumber(counts[index])}{stat.suffix}
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
