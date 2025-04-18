import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
      { name: 'YouTube Videos', path: '/youtube-videos', icon: 'yt-videos' },
      { name: 'Discord Servers', path: '/discord-servers', icon: 'discord' },
    ],
  },
  {
    name: 'Tools',
    icon: 'tools',
    links: [
      { name: 'YouTube Downloader', path: '/construction', icon: 'yt-downloader' },
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: 'music' },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: 'bot' },
      { name: 'Background Generator', path: '/background-generator', icon: 'background' },
    ],
  },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (
      (localStorage.getItem('theme') as 'light' | 'dark') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const progress = Math.min(offset / 300, 1);
      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setActiveDropdown(null);
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
    setActiveDropdown(null);
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
    setOpenMobileCollapsible((prev) => (prev === name ? null : name));
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdown: NavDropdown) => {
    return dropdown.links.some((link) => isLinkActive(link.path));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        width: 'calc(100vw - 12px)',
        backgroundColor: theme === 'dark'
          ? `rgba(10, 10, 20, ${scrolled ? scrollProgress * 0.95 : 0.25})`
          : `rgba(255, 255, 255, ${scrolled ? scrollProgress * 0.95 : 0.25})`,
        borderBottom: `1px solid rgba(155, 135, 245, ${scrolled ? scrollProgress * 0.2 : 0.1})`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        right: 0,
        left: 0,
        pointerEvents: 'auto',
        paddingRight: '12px', // leave space for scrollbar
        // Promote to own layer to fix rendering issues
        transform: 'translateZ(0)',
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wider"
        >
          <div className="flex items-center justify-center">
            <Logo size={isMobile ? 'sm' : 'md'} />
          </div>
          {!isMobile && <span className="hidden md:inline animate-glow">Renderdragon</span>}
          {isMobile && <span>RD</span>}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {mainLinks.map((link, index) =>
            'path' in link ? (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center transition-colors ${
                  isLinkActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
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
                      className={`flex items-center transition-colors ${
                        isDropdownActive(link) ? 'text-primary' : 'text-foreground hover:text-primary'
                      }`}
                      style={{ transform: 'none' }}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-popover border border-border z-50"
                  >
                    <DropdownMenuGroup>
                      {link.links.map((subLink, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link
                            to={subLink.path}
                            className={`flex items-center px-2 py-2 cursor-pointer ${
                              isLinkActive(subLink.path) ? 'text-primary bg-accent/50' : ''
                            }`}
                          >
                            <span>{subLink.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          )}
        </nav>

        <div className="flex items-center">
          <ThemeToggle className="mr-4" />

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[75vh] rounded-t-xl bg-background border-t border-border">
              {/* Mobile menu content here */}
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-background/20 z-20">
          <div
            className="h-full bg-cow-purple transition-all duration-300 animate-pulse-neon"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
