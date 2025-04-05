import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, Github, Twitter, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { ImageRotator } from './Navbar';

const Footer = () => {
  const [cartClicked, setCartClicked] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const currentYear = new Date().getFullYear();

  const handleCartClick = () => {
    if (cartClicked) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    myConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.8 }
    });
    
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
    
    toast("Website made by Team Wheels", {
      description: "Thanks for visiting Renderdragon!",
      position: "bottom-center",
      duration: 3000,
    });
    
    setCartClicked(true);
    
    // Animate the cart off screen
    if (cartButtonRef.current) {
      cartButtonRef.current.style.transform = 'translateX(150%)';
    }
  };

  return (
    <footer className="bg-cow-dark text-white overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-xl mb-4">
              <div className="w-8 h-8 bg-cow-purple text-white flex items-center justify-center font-pixel text-xs pixel-corners">
                <ImageRotator />
              </div>
              <span className="font-pixel">Renderdragon</span>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md">
              Empowering Minecraft content creators with free resources, tools, and guides.
              100% free, no strings attached.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.976-.608 1.413a18.273 18.273 0 0 0-5.487 0 12.675 12.675 0 0 0-.617-1.413.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055c1.997 1.464 3.949 2.378 5.945 2.95a.08.08 0 0 0 .088-.028c.379-.508.716-1.038 1.005-1.589a.076.076 0 0 0-.041-.106 12.37 12.37 0 0 1-1.838-.878.077.077 0 0 1-.009-.125c.125-.093.25-.19.368-.289a.074.074 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.366.29a.077.077 0 0 1-.006.125c-.598.344-1.22.635-1.841.88a.076.076 0 0 0-.041.106c.29.55.626 1.08 1.004 1.589a.078.078 0 0 0 .086.028c2.003-.572 3.954-1.486 5.952-2.95a.077.077 0 0 0 .032-.055c.502-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-vt323 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/70 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-vt323 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/youtube-downloader" className="text-white/70 hover:text-white transition-colors">
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link to="/music-copyright" className="text-white/70 hover:text-white transition-colors">
                  Music Copyright Checker
                </Link>
              </li>
              <li>
                <Link to="/ai-title-helper" className="text-white/70 hover:text-white transition-colors">
                  AI Title Helper
                </Link>
              </li>
              <li>
                <Link to="/background-generator" className="text-white/70 hover:text-white transition-colors">
                  Background Generator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/faq" className="text-white/70 hover:text-white transition-colors">
              FAQ
            </Link>
            
            <Link to="/tos" className="text-white/70 hover:text-white transition-colors">
              Terms
            </Link>
            
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          
          <div className="flex items-center">
            <p className="text-white/70 text-sm">
              &copy; {currentYear} Renderdragon
            </p>
            
            <button 
              ref={cartButtonRef}
              onClick={handleCartClick}
              className="ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-1000"
              aria-label="Easter egg"
              disabled={cartClicked}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
