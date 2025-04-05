
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface CountdownOverlayProps {
  targetDate: Date;
}

const CountdownOverlay = ({ targetDate }: CountdownOverlayProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'm') {
        setShowPasswordDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setShowPasswordDialog(false);
      setIsVisible(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center">
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
            
            <motion.p
              className="text-white/50 text-xs md:text-sm mt-8 md:mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Press 'M' key to access admin panel
            </motion.p>
          </motion.div>
        </div>
      </div>

      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent className="border-cow-purple/30 bg-black/95">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-cow-purple" />
              Admin Access Required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Enter the admin password to close the countdown overlay.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="py-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-black/50 border-cow-purple/30 focus:border-cow-purple focus:ring-cow-purple ${
                  passwordError ? 'border-red-500 animate-shake' : ''
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">Incorrect password. Try again.</p>
              )}
            </div>
            <AlertDialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowPasswordDialog(false)}
                className="w-full sm:w-auto border-cow-purple/30 text-white hover:bg-cow-purple/20"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-cow-purple hover:bg-cow-purple-dark text-white"
              >
                Unlock
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CountdownOverlay;
