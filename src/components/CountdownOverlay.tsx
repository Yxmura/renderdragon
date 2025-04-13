
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import CountdownService from '@/services/CountdownService';

interface CountdownOverlayProps {
  targetDate: Date;
}

const CountdownOverlay = ({ targetDate }: CountdownOverlayProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const countdownService = CountdownService.getInstance();

  // Initialize visibility state from service
  useEffect(() => {
    const shouldBeVisible = countdownService.getIsVisible();
    setIsVisible(shouldBeVisible);

    // Add specific class to body when countdown is visible to prevent scrolling
    if (shouldBeVisible) {
      document.body.classList.add('countdown-active');
    }

    return () => {
      document.body.classList.remove('countdown-active');
    };
  }, []);

  // Setup countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // If the target date has passed, hide the countdown globally
      if (difference <= 0) {
        countdownService.setIsVisible(false);
        setIsVisible(false);
        clearInterval(interval);
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  // Monitor for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Admin shortcut with 'm' key
      if (event.key === 'm') {
        // Check if admin password was previously entered
        if (countdownService.getHasEnteredAdminPassword()) {
          countdownService.setIsVisible(false);
          setIsVisible(false);
          return;
        }
        
        // Show browser prompt for password
        const password = prompt("Enter admin password to bypass countdown:");
        if (password !== null) {
          const isValid = countdownService.verifyAdminPassword(password);
          
          if (isValid) {
            setIsVisible(false);
            toast.success("Admin access granted");
          } else {
            setPasswordAttempts(prev => prev + 1);
            
            if (passwordAttempts >= 2) {
              toast.error("Too many failed attempts. Try again later.");
              // Reset attempts after a delay
              setTimeout(() => setPasswordAttempts(0), 30000);
            } else {
              toast.error("Incorrect password");
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [passwordAttempts]);

  // Anti-tampering protection
  useEffect(() => {
    if (!isVisible || !overlayRef.current) return;
    
    // Monitor for style changes that might hide the overlay
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const element = mutation.target as HTMLElement;
          
          // Check if someone tried to hide the overlay with style changes
          if (element.style.display === 'none' || 
              element.style.visibility === 'hidden' || 
              element.style.opacity === '0' ||
              parseFloat(element.style.opacity) === 0) {
            
            // Reset the styles
            element.style.display = 'flex';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            
            // Show warning
            toast.error("Nice try! The countdown can't be hidden that way.");
          }
        }
      });
    });
    
    observer.observe(overlayRef.current, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });
    
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div 
          id="countdown-overlay"
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center"
          style={{ pointerEvents: 'all' }}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-8 md:mb-12">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto relative">
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                    {[0, 1, 2, 3].map((index) => (
                      <img
                        key={index}
                        src={`/renderdragon${index}.png`}
                        alt={`Renderdragon Logo ${index}`}
                        className={`absolute w-full h-full object-contain transition-opacity duration-300 ${
                          Math.floor(seconds % 4) === index ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <motion.h1 
                  className="text-3xl md:text-5xl lg:text-7xl font-bold mt-6 md:mt-8 mb-2 md:mb-4 text-white"
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  RENDERDRAGON
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl lg:text-2xl text-cow-purple mb-8 md:mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  The ultimate platform for Minecraft content creators
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-6 lg:gap-8 justify-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="bg-black/50 border border-cow-purple/30 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">{days}</div>
                  <div className="text-cow-purple text-xs md:text-sm uppercase tracking-wide">Days</div>
                </div>
                <div className="bg-black/50 border border-cow-purple/30 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">{hours}</div>
                  <div className="text-cow-purple text-xs md:text-sm uppercase tracking-wide">Hours</div>
                </div>
                <div className="bg-black/50 border border-cow-purple/30 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">{minutes}</div>
                  <div className="text-cow-purple text-xs md:text-sm uppercase tracking-wide">Minutes</div>
                </div>
                <div className="bg-black/50 border border-cow-purple/30 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">{seconds}</div>
                  <div className="text-cow-purple text-xs md:text-sm uppercase tracking-wide">Seconds</div>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                We're launching on May 1st, 2025. Get ready for an amazing collection of free resources and tools for Minecraft creators!
              </motion.p>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountdownOverlay;
