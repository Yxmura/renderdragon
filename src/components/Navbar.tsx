
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  MessageSquare, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Download, 
  Music, 
  Bot, 
  Image
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface NavDropdown {
  name: string;
  icon: React.ElementType;
  links: NavLink[];
}

const mainLinks: (NavLink | NavDropdown)[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Contact', path: '/contact', icon: MessageSquare },
  { 
    name: 'Resources', 
    icon: BookOpen,
    links: [
      { name: 'Resources Hub', path: '/resources', icon: BookOpen },
      { name: 'Guides', path: '/guides', icon: BookOpen },
      { name: 'YouTube Videos', path: '/youtube-videos', icon: Video },
      { name: 'Discord Servers', path: '/discord-servers', icon: MessageCircle },
    ]
  },
  {
    name: 'Tools',
    icon: Download,
    links: [
      { name: 'YouTube Downloader', path: '/youtube-downloader', icon: Download },
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: Music },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: Bot },
      { name: 'Background Generator', path: '/background-generator', icon: Image },
    ]
  }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 backdrop-blur-md bg-background/90 shadow-md' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl md:text-2xl font-pixel tracking-wider"
        >
          <div className="w-8 h-8 bg-cow-purple text-white flex items-center justify-center font-pixel text-xs pixel-corners">COW</div>
          {!isMobile && (
            <span className="hidden md:inline animate-glow">Creator On Wheels</span>
          )}
          {isMobile && <span>COW</span>}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainLinks.map((link, index) => (
            'path' in link ? (
              <Link 
                key={index} 
                to={link.path} 
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ) : (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border border-border">
                  <DropdownMenuGroup>
                    {link.links.map((subLink, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link 
                          to={subLink.path} 
                          className="flex items-center space-x-2 px-2 py-2 cursor-pointer"
                        >
                          <subLink.icon className="w-4 h-4" />
                          <span>{subLink.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 pt-20 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        } md:hidden`}
      >
        <nav className="h-full overflow-y-auto flex flex-col p-6 space-y-6">
          {mainLinks.map((link, index) => (
            'path' in link ? (
              <Link 
                key={index} 
                to={link.path} 
                className="flex items-center space-x-3 text-lg py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ) : (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-3 text-lg py-2 border-b border-border">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
                <div className="pl-8 space-y-4 mt-2">
                  {link.links.map((subLink, subIndex) => (
                    <Link 
                      key={subIndex}
                      to={subLink.path}
                      className="flex items-center space-x-3 text-base py-1 text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <subLink.icon className="w-4 h-4" />
                      <span>{subLink.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
