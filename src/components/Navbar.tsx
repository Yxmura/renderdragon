import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
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
} from 'lucide-react';
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
      {
        name: 'Discord Servers',
        path: '/discord-servers',
        icon: MessageCircle,
      },
    ],
  },
  {
    name: 'Tools',
    icon: Download,
    links: [
      { name: 'YouTube Downloader', path: '/youtube-downloader', icon: Download },
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: Music },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: Bot },
      { name: 'Background Generator', path: '/background-generator', icon: Image },
    ],
  },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const siteOverlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    const handleResize = () => {
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !siteOverlayRef.current) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (siteOverlayRef.current && event.target === siteOverlayRef.current) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 backdrop-blur-md bg-background/90 shadow-md'
          : 'py-4'
      }`}
      style={{ minWidth: '320px' }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wider"
        >
          <div className="w-8 h-8 bg-cow-purple text-white flex items-center justify-center font-bold text-xs pixel-corners">
            COW
          </div>
          {!isMobile && (
            <span className="hidden md:inline animate-glow">
              Creator On Wheels
            </span>
          )}
          {isMobile && <span>COW</span>}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainLinks.map((link, index) =>
            'path' in link ? (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center space-x-1 transition-colors ${
                  isLinkActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
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
                      className={`flex items-center space-x-1 transition-colors ${
                        isDropdownActive(link)
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                      style={{ transform: 'none' }}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-popover border border-border z-50 absolute"
                  >
                    <DropdownMenuGroup>
                      {link.links.map((subLink, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link
                            to={subLink.path}
                            className={`flex items-center space-x-2 px-2 py-2 cursor-pointer min-w-[150px] ${
                              isLinkActive(subLink.path)
                                ? 'text-primary bg-accent/50'
                                : ''
                            }`}
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
          )}
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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Site Overlay when Mobile Menu is Open */}
      {mobileMenuOpen && (
        <div
          ref={siteOverlayRef}
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 pt-16 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* This empty div allows clicking outside the menu to close it */}
        </div>
      )}

      {/* Enhanced Mobile Menu - Full width, partial height */}
      <div
        className={`fixed left-0 right-0 top-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
        style={{
          height: '60vh', // Adjust the height as needed
          backgroundColor: 'rgba(10, 10, 10, 0.95)', // Dark background
          backdropFilter: 'blur(10px)',
          paddingTop: '60px', // Adjust to match header height
        }}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            className="h-8 w-8 text-white"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="h-full overflow-y-auto custom-scrollbar flex flex-col p-6 space-y-4">
          {mainLinks.map((link, index) =>
            'path' in link ? (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center space-x-3 text-lg py-3 rounded-md hover:bg-cow-purple/20 text-white transition-colors duration-200 pixel-corners ${
                  isLinkActive(link.path) ? 'text-primary' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ borderBottom: '2px solid rgba(155, 135, 245, 0.3)' }}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ) : (
              <Collapsible key={index} className="space-y-2 w-full">
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex items-center justify-between text-lg py-3 rounded-md hover:bg-cow-purple/20 text-white transition-colors duration-200 pixel-corners ${
                      isDropdownActive(link) ? 'text-primary' : ''
                    }`}
                    style={{ borderBottom: '2px solid rgba(155, 135, 245, 0.3)' }}
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-8 space-y-2 mt-2">
                    {link.links.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subLink.path}
                        className={`flex items-center space-x-3 text-base py-2 rounded-md hover:bg-cow-purple/10 text-white/80 transition-colors duration-200 pixel-corners ${
                          isLinkActive(subLink.path)
                            ? 'text-primary'
                            : 'hover:text-white'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <subLink.icon className="w-4 h-4" />
                        <span>{subLink.name}</span>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          )}
        </nav>

        {/* Theme Toggle at Bottom */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
