import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sun,
  Moon,
  Skull
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from './Logo';
import PixelSvgIcon from './PixelSvgIcon';

interface NavLink {
  name: string;
  path: string;
  icon: string;
}

interface NavDropdown {
  name: string;
  icon: string;
  links: NavLink[];
}

const mainLinks: (NavLink | NavDropdown)[] = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Contact', path: '/contact', icon: 'contact' },
  { 
    name: 'Resources', 
    icon: 'resources',
    links: [
      { name: 'Resources Hub', path: '/resources', icon: 'resources-hub' },
      { name: 'Guides', path: '/guides', icon: 'guides' },
      { name: 'Utilities', path: '/utilities', icon: 'software' },
      { name: 'YouTube Videos', path: '/youtube-videos', icon: 'yt-videos' },
      { name: 'Discord Servers', path: '/discord-servers', icon: 'discord' },
    ]
  },
  {
    name: 'Tools',
    icon: 'tools',
    links: [
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: 'music' },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: 'bot' },
      { name: 'Background Generator', path: '/background-generator', icon: 'background' },
      { name: 'Player Renderer', path: '/player-renderer', icon: 'player' },
      { name: 'Renderbot', path: '/renderbot', icon: 'bot' }
    ]
  }
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(offset / 300, 1);
      
      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleDropdownMouseEnter = (dropdownName: string) => {
    if (!isMobile) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const handleMobileCollapsibleToggle = (name: string) => {
    setOpenMobileCollapsible(prev => prev === name ? null : name);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdown: NavDropdown) => {
    return dropdown.links.some(link => isLinkActive(link.path));
  };

  const navbarStyle = {
    backgroundColor: theme === 'dark' 
      ? `rgba(10, 10, 20, ${scrolled ? scrollProgress * 0.95 : 0.25})` 
      : `rgba(255, 255, 255, ${scrolled ? scrollProgress * 0.95 : 0.25})`,
    borderBottom: `1px solid rgba(155, 135, 245, ${scrolled ? scrollProgress * 0.2 : 0.1})`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    width: 'calc(100vw - 12px)' 
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div 
        className="absolute inset-0"
        style={{
          zIndex: -1,
          ...navbarStyle,
        }}
      />
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wider"
        >
          <div className="flex items-center justify-center">
            <Logo size={isMobile ? "sm" : "md"} />
          </div>
          {!isMobile && (
            <span className="hidden md:inline animate-glow">Renderdragon</span>
          )}
          {isMobile && <span>RD</span>}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {mainLinks.map((link, index) => (
            'path' in link ? (
              <Link 
                key={index} 
                to={link.path} 
                className={`flex items-center transition-colors ${isLinkActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                {/* no icons for desktop */}
                <span>{link.name}</span>
              </Link>
            ) : (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => handleDropdownMouseEnter(link.name)}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <DropdownMenu
                  open={activeDropdown === link.name}
                  onOpenChange={(open) => {
                    if (!open) setActiveDropdown(null);
                    if (open) setActiveDropdown(link.name);
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={`flex items-center transition-colors ${isDropdownActive(link) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                      style={{ transform: 'none' }}
                    >
                      {/* no icons on desktop */}
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover border border-border z-50">
                    <DropdownMenuGroup>
                      {link.links.map((subLink, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link 
                            to={subLink.path} 
                            className={`flex items-center px-2 py-2 cursor-pointer ${isLinkActive(subLink.path) ? 'text-primary bg-accent/50' : ''}`}
                          >
                            {/* fuck the desktop icons */}
                            <span>{subLink.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          ))}
        </nav>

        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[75vh] rounded-t-xl bg-background border-t border-border">
              <div className="px-4 py-6 max-h-[calc(100%-60px)] overflow-auto">
                <div className="flex items-center justify-between mb-6">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 text-xl font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-xs">
                      <Logo size="sm" />
                    </div>
                    <span>Renderdragon</span>
                  </Link>
                </div>
                
                <nav className="space-y-4">
                  {mainLinks.map((link, index) => (
                    'path' in link ? (
                      <Link 
                        key={index} 
                        to={link.path} 
                        className={`flex items-center space-x-3 text-lg py-3 border-b border-border ${isLinkActive(link.path) ? 'text-primary' : ''}`}
                      >
                        <PixelSvgIcon name={link.icon} className="w-5 h-5" />
                        <span>{link.name}</span>
                      </Link>
                    ) : (
                      <Collapsible 
                        key={index} 
                        className="w-full border-b border-border"
                        open={openMobileCollapsible === link.name}
                        onOpenChange={() => handleMobileCollapsibleToggle(link.name)}
                      >
                        <CollapsibleTrigger className="w-full flex items-center justify-between text-lg py-3">
                          <div className="flex items-center space-x-3">
                            <PixelSvgIcon name={link.icon} className="w-5 h-5" />
                            <span>{link.name}</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              openMobileCollapsible === link.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="animate-accordion-down">
                          <div className="pl-8 pb-3 space-y-3">
                            {link.links.map((subLink, subIndex) => (
                              <Link 
                                key={subIndex}
                                to={subLink.path}
                                className={`flex items-center space-x-3 py-2 ${isLinkActive(subLink.path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                              >
                                <PixelSvgIcon name={subLink.icon} className="w-4 h-4" />
                                <span>{subLink.name}</span>
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  ))}
                </nav>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center border-t border-border bg-background">
                <Toggle 
                  pressed={theme === 'dark'} 
                  onPressedChange={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-2"
                >
                  {theme === 'dark' ? (
                    <>
                      <PixelSvgIcon name="moon" className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <PixelSvgIcon name="sun" className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </Toggle>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-background/20 z-20">
          <div 
            className="h-full bg-cow-purple transition-all duration-300 animate-pulse-neon"
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Navbar;