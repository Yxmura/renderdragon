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
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg z-40 bg-cow-purple hover:bg-cow-purple-dark transition-all duration-300 group motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[250ms] motion-ease-spring-bouncier"
        aria-label="Donate"
      >
        <div className="absolute inset-0 rounded-full bg-cow-purple-dark/30 group-hover:bg-cow-purple-dark/50 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center">
          <img src="/assets/heart.png" alt="donate" className="w-11 h-11 object-contain scale-150" />
        </div>
        <span className="sr-only">Donate</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl border-2 border-cow-purple bg-gradient-to-b from-background to-background/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
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

              {/* Ko-fi iframe with loading animation */}
              <div className="relative w-full rounded-md overflow-hidden shadow-md border border-muted bg-[#f9f9f9] min-h-[500px]">
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                    <div className="h-6 w-6 border-4 border-cow-purple border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  id="kofiframe"
                  src="https://ko-fi.com/renderdragon/?hidefeed=true&widget=true&embed=true&preview=true"
                  style={{
                    border: 'none',
                    width: '100%',
                    background: '#f9f9f9',
                  }}
                  height="500"
                  title="renderdragon"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonateButton;
