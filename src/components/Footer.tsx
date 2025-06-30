import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Github, Twitter, Youtube, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import Logo from './Logo';
import HyperpingBadge from '@/components/ui/StatusBadge';

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
    
    if (cartButtonRef.current) {
      cartButtonRef.current.style.transform = 'translateX(150%)';
    }
  };

  return (
    <footer className="bg-cow-dark text-white overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold mb-4"
            >
              <div className="flex items-center justify-center">
                <Logo size="sm" />
              </div>
              <span className="font-pixel">Renderdragon</span>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md">
              Empowering Minecraft content creators with free resources, tools, and guides.
              100% free, no strings attached.
            </p>
            
            <div className="flex space-x-4 mb-3">
              <a 
                href="https://discord.renderdragon.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Discord"
              >
                <img className="w-6 h-6" src="/assets/discord_icon.png" alt="Discord" />
              </a>
              
              <a 
                href="https://x.com/_renderdragon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Twitter"
              >
                <img className="w-6 h-6" src="/assets/twitter_icon.png" alt="Twitter" />
              </a>
              
              <a 
                href="https://www.youtube.com/channel/UCOheNYpPEHcS2ljttRmllxg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="YouTube"
              >
                <img className="w-6 h-6" src="/assets/youtube_icon.png" alt="YouTube" />
              </a>
              
              <a 
                href="https://github.com/Yxmura/renderdragon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <img className="w-6 h-6" src="/assets/github_icon.png" alt="GitHub" />
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
                  Resources Hub
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-white/70 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/utilities" className="text-white/70 hover:text-white transition-colors">
                  Utilities
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
                <Link to="/gappa" className="text-white/70 hover:text-white transition-colors">
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
              <li>
                <Link to="/player-renderer" className="text-white/70 hover:text-white transition-colors">
                  Player Renderer
                </Link>
              </li>
              <li>
                <Link to="/renderbot" className="text-white/70 hover:text-white transition-colors">
                  Renderbot
                </Link>
              </li>
              <li>
                <Link to="/text-generator" className="text-white/70 hover:text-white transition-colors">
                  Text Generator
                </Link>
              </li>
              <li>
                <Link to="/generators" className="text-white/70 hover:text-white transition-colors">
                  Content Generators
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/faq" className="text-white/70 hover:text-white transition-colors text-sm relative">
              FAQ
            </Link>
            
            <Link to="/tos" className="text-white/70 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
              Privacy
            </Link>

            <Link to="/renderbot" className="text-white/70 hover:text-white transition-colors text-sm">
              Renderbot
            </Link>

            <HyperpingBadge status="online" />

            <div className="text-white/70 text-sm">
              <span className="mr-4">Not associated with Mojang or Microsoft</span>
              <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons" className="hover:text-white transition-colors">Flaticon</a>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-white/70 text-sm">
              &copy; {currentYear} Renderdragon
            </p>
            
            <button 
              ref={cartButtonRef}
              onClick={handleCartClick}
              className="ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-1000"
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
