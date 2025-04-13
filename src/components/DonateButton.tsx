
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
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg z-40 bg-cow-purple hover:bg-cow-purple-dark"
      >
        <div className="pixel-art-coffee">
          <div className="pixel-art-coffee-mug"></div>
          <div className="pixel-art-coffee-steam"></div>
        </div>
        <span className="sr-only">Donate</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="pixel-corners border-2 border-cow-purple">
          <DialogHeader>
            <DialogTitle className="text-2xl font-vt323">Buy Us a Coffee</DialogTitle>
            <DialogDescription>
              Support Renderdragon to keep everything 100% free for everyone!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <img
              src="https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2675&q=80"
              alt="Coffee cup"
              className="w-32 h-32 rounded-md object-cover pixel-corners"
            />
            <p className="text-center">
              Everything we built, is free, our only source of income is donations
            </p>
            <a
              href="https://www.buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn-primary w-full flex items-center justify-center space-x-2"
            >
              <div className="pixel-art-coffee-small mr-2"></div>
              <span>Buy Us A Coffee</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <style>
        {`
        .pixel-art-coffee {
          width: 24px;
          height: 24px;
          position: relative;
        }
        
        .pixel-art-coffee-mug {
          width: 16px;
          height: 12px;
          background-color: #FFF;
          border: 2px solid #000;
          position: absolute;
          bottom: 0;
          left: 4px;
        }
        
        .pixel-art-coffee-mug:before {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border: 2px solid #000;
          border-left: none;
          border-radius: 0 3px 3px 0;
          right: -8px;
          top: 1px;
        }
        
        .pixel-art-coffee-steam {
          position: absolute;
          top: 0;
          left: 7px;
          width: 2px;
          height: 4px;
          background-color: #FFF;
          box-shadow: 4px -2px 0 0 #FFF, 8px -4px 0 0 #FFF;
          animation: steam 2s infinite;
        }
        
        .pixel-art-coffee-small {
          transform: scale(0.7);
          display: inline-block;
          width: 18px;
          height: 18px;
          position: relative;
        }
        
        .pixel-art-coffee-small:before {
          content: '';
          width: 12px;
          height: 9px;
          background-color: #FFF;
          border: 2px solid #000;
          position: absolute;
          bottom: 0;
          left: 3px;
        }
        
        .pixel-art-coffee-small:after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border: 2px solid #000;
          border-left: none;
          border-radius: 0 3px 3px 0;
          right: 0;
          bottom: 3px;
        }
        
        @keyframes steam {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-4px); }
        }
        `}
      </style>
    </>
  );
};

export default DonateButton;
