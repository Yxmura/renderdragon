import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, Github, Twitter, Youtube, Discord } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import Logo from './Logo';

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
              <div className="bg-cow-purple text-white flex items-center justify-center font-pixel text-xs pixel-corners">
                <Logo size="sm" />
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
                <Discord className="h-5 w-5" />
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
