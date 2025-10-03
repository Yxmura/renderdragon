'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Supporter {
  name: string;
  amount?: string;
}

const supporters: Supporter[] = [
  { name: "Bermo", amount: "$1" },
  { name: "VovoPlay", amount: "$2" },
];

const SupportersList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);

  const getAmountValue = (amount: string | undefined) => {
    if (!amount) return 0;
    return parseFloat(amount.replace('$', ''));
  };

  const getNameColor = (amount: string | undefined) => {
    const value = getAmountValue(amount);
    if (value >= 10) return 'text-[#7848c7]';
    if (value >= 5) return 'text-[#ff5c38]';
    if (value >= 2) return 'text-[#ffb67c]';
    return '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((current) => (current + 1) % supporters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full py-3 overflow-hidden bg-accent/30 rounded-lg">
      <div className="flex flex-col items-center space-y-2">
        <div className="text-sm font-medium text-muted-foreground">Recent Supporters</div>
        
        <div className="relative h-12 w-full">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className={`absolute inset-y-0 flex items-center justify-center transition-all duration-500 transform w-full
                ${index === currentIndex ? 
                  'opacity-100 translate-x-0' : 
                  index === previousIndex ?
                    'opacity-0 translate-x-full' :
                    'opacity-0 -translate-x-full'
                }`}
              style={{
                transitionProperty: 'transform, opacity',
                zIndex: index === currentIndex ? 2 : index === previousIndex ? 1 : 0
              }}
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-cow-purple" />
                <span className={`font-medium ${getNameColor(supporter.amount)}`}>
                  {supporter.name}
                </span>
                {supporter.amount && (
                  <span className="text-sm text-muted-foreground">({supporter.amount})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportersList;