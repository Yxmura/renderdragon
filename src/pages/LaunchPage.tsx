'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card component
import { Separator } from '@/components/ui/separator'; // shadcn/ui Separator component

const LaunchPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const launchDate = new Date('2025-5-0T00:00:00Z').getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen p-4',
        'bg-gradient-to-br from-purple-400 to-pink-500',
        'text-white font-mono'
      )}
    >
      <Card className="w-full max-w-md bg-opacity-20 backdrop-blur-lg border border-white border-opacity-20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold pixel-font">Website Launching Soon!</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-3xl pixel-font">{timeRemaining.days}</div>
              <div className="text-sm">Days</div>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white bg-opacity-30" />
            <div className="text-center">
              <div className="text-3xl pixel-font">{timeRemaining.hours}</div>
              <div className="text-sm">Hours</div>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white bg-opacity-30" />
            <div className="text-center">
              <div className="text-3xl pixel-font">{timeRemaining.minutes}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white bg-opacity-30" />
            <div className="text-center">
              <div className="text-3xl pixel-font">{timeRemaining.seconds}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .pixel-font {
          font-family: monospace;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default LaunchPage;