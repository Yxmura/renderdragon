import { useState, useEffect } from 'react';
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
import { useTheme } from 'next-themes'; // Assuming you're using next-themes

const DonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const { theme } = useTheme(); // Access the current theme

  const handleDonateClick = () => {
    // Close the dialog
    setIsOpen(false);

    // Show the iframe
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  // ESC key listener
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleCloseIframe();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showIframe]);

  // Dynamically determine background and text colors based on the theme
  const iframeBackgroundColor =
    theme === 'dark' ? 'hsl(var(--secondary))' : 'hsl(var(--muted))';
  const closeButtonColor =
    theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--secondary-foreground))';
  const closeButtonHoverColor =
    theme === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))';
  const textColor =
    theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--background))';

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg z-40 bg-cow-purple hover:bg-cow-purple-dark transition-all duration-300 group motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[250ms] motion-ease-spring-bouncier"
        aria-label="Donate"
      >
        <div className="absolute inset-0 rounded-full bg-cow-purple-dark/30 group-hover:bg-cow-purple-dark/50 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/heart.png"
            alt="donate"
            className="w-11 h-11 object-contain scale-150"
          />
        </div>
        <span className="sr-only">Donate</span>
      </Button>

      {/* Dialog (Donate Modal) */}
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

              {/* Donate Button (that opens the iframe SEPARATELY) */}
              <Button
                onClick={handleDonateClick}
                className="bg-cow-purple hover:bg-cow-purple-dark text-white font-bold py-3 px-4 rounded-md w-full flex items-center justify-center space-x-2 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-48 w-48 bg-white/10 rounded-full animate-ping"></div>
                </div>
                <Coffee className="h-5 w-5" />
                <span>Donate - every penny matters</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Iframe Container (Rendered SEPARATELY) */}
      {showIframe && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
          <div
            className="rounded-lg shadow-lg relative"
            style={{ width: '80vw', maxWidth: '900px' }}
          >
            {/* Close Button */}
            <Button
              onClick={handleCloseIframe}
              className="absolute top-2 right-2 rounded-full w-10 h-10 flex items-center justify-center"
              style={{
                backgroundColor: closeButtonColor,
                color: textColor,
              }}
            >
              X
            </Button>
            <iframe
              id="kofiframe"
              src="https://ko-fi.com/renderdragon/?hidefeed=true&widget=true&embed=true&preview=true"
              style={{
                border: 'none',
                width: '100%',
                padding: '4px',
                background: iframeBackgroundColor,
              }}
              height="712"
              title="renderdragon"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateButton;
