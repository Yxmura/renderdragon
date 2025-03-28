
import { Coffee } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-40 bg-cow-purple hover:bg-cow-purple-dark animate-float"
      >
        <Coffee className="h-6 w-6" />
        <span className="sr-only">Donate</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="pixel-corners border-2 border-cow-purple">
          <DialogHeader>
            <DialogTitle className="text-2xl font-vt323">Buy Me a Coffee</DialogTitle>
            <DialogDescription>
              Support Creator On Wheels to keep everything 100% free for everyone!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <img
              src="https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2675&q=80"
              alt="Coffee cup"
              className="w-32 h-32 rounded-md object-cover pixel-corners"
            />
            <p className="text-center">
              Your support helps us create more free resources for content creators!
            </p>
            <a
              href="https://www.buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Coffee className="h-5 w-5" />
              <span>Buy Me A Coffee</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonateButton;
