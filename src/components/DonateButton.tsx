import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Coffee, Sparkles } from 'lucide-react';
import SupportersList from './SupportersList';

const DonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg z-40 bg-cow-purple hover:bg-cow-purple-dark transition-all duration-300 group"
        aria-label="Donate"
      >
        <div className="absolute inset-0 rounded-full bg-cow-purple-dark/30 group-hover:bg-cow-purple-dark/50 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center">
          <img className='w-7 h-7' src='/assets/donate.png' alt='donate'></img>
        </div>
        <span className="sr-only">Donate</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md+1 border-2 border-cow-purple bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Coffee className="h-6 w-6 text-cow-purple" />
              <span>Support Renderdragon</span>
            </DialogTitle>
            <DialogDescription>
              Donations are our only source of income
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <SupportersList />
            
            <div className="space-y-4 w-full">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">Why Donate?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cow-purple" />
                    <span>Keep all resources 100% free for everyone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cow-purple" />
                    <span>Help us develop more tools and assets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cow-purple" />
                    <span>Support the Minecraft creator community</span>
                  </li>
                </ul>
              </div>
              
              <a
                href="https://www.buymeacoffee.com/renderdragon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cow-purple hover:bg-cow-purple-dark text-white font-bold py-3 px-4 rounded-md w-full flex items-center justify-center space-x-2 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-48 w-48 bg-white/10 rounded-full animate-ping"></div>
                </div>
                <Coffee className="h-5 w-5" />
                <span>Donate - every penny matters</span>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonateButton;
