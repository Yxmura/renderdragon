import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Image,
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
      { name: 'YouTube Downloader', path: '/construction', icon: Download },
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: Music },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: Bot },
      { name: 'Background Generator', path: '/background-generator', icon: Image },
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

  const navbarStyle = scrolled ? {
    backdropFilter: 'blur(10px)',
    backgroundColor: theme === 'dark' 
      ? `rgba(20, 20, 30, ${scrollProgress * 0.8})` 
      : `rgba(255, 255, 255, ${scrollProgress * 0.8})`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderBottom: `1px solid rgba(155, 135, 245, ${scrollProgress * 0.3})`
  } : {
    backgroundColor: 'transparent',
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={navbarStyle}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wider"
        >
          <div className="bg-cow-purple text-white flex items-center justify-center font-bold text-xs pixel-corners">
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
                className={`flex items-center space-x-1 transition-colors ${isLinkActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                <link.icon className="w-4 h-4" />
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
                      className={`flex items-center space-x-1 transition-colors ${isDropdownActive(link) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                      style={{ transform: 'none' }}
                    >
                      <link.icon className="w-4 h-4" />
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
                            className={`flex items-center space-x-2 px-2 py-2 cursor-pointer ${isLinkActive(subLink.path) ? 'text-primary bg-accent/50' : ''}`}
                          >
                            <subLink.icon className="w-4 h-4" />
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
                    <div className="w-8 h-8 bg-cow-purple text-white flex items-center justify-center font-bold text-xs pixel-corners">
                      <ImageRotator />
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
                        <link.icon className="w-5 h-5" />
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
                            <link.icon className="w-5 h-5" />
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
                                <subLink.icon className="w-4 h-4" />
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
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-5 w-5" />
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
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-background/20">
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
