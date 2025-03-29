import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Mail,
  BookOpen,
  Wrench,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from './Logo';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'; // Assuming you have Drawer component

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
  { name: 'Contact', path: '/contact', icon: Mail },
  {
    name: 'Resources',
    icon: BookOpen,
    links: [
      { name: 'Resources Hub', path: '/resources', icon: BookOpen },
      { name: 'Guides', path: '/guides', icon: BookOpen },
      { name: 'YouTube Videos', path: '/youtube-videos', icon: BookOpen },
      {
        name: 'Discord Servers',
        path: '/discord-servers',
        icon: BookOpen,
      },
    ],
  },
  {
    name: 'Tools',
    icon: Wrench,
    links: [
      { name: 'YouTube Downloader', path: '/youtube-downloader', icon: Wrench },
      { name: 'Music Copyright Checker', path: '/music-copyright', icon: Wrench },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: Wrench },
      { name: 'Background Generator', path: '/background-generator', icon: Wrench },
    ],
  },
];

interface MobileNavigationProps {
  resourcesLinks: Array<{ name: string; path: string }>;
  toolsLinks: Array<{ name: string; path: string }>;
  isAuthenticated: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  resourcesLinks,
  toolsLinks,
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDropdown = (dropdown: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setDrawerOpen(false);
  };

  const handleLoginClick = () => {
    if (onLogin) onLogin();
    setDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setDrawerOpen(false);
  };

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-4rem)] flex flex-col p-0 rounded-t-lg">
        <div className="flex items-center justify-between border-b p-4">
          <Logo isMobile={true} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 mobile-nav-content">
          <nav className="space-y-6">
            <Link
              to="/"
              className="flex items-center p-3 rounded-md hover:bg-muted transition-all duration-300 transform hover:translate-x-1"
              onClick={handleLinkClick}
            >
              <Home className="h-4 w-4 mr-3" />
              <span className="font-medium">{t('home')}</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center p-3 rounded-md hover:bg-muted transition-all duration-300 transform hover:translate-x-1"
              onClick={handleLinkClick}
            >
              <Mail className="h-4 w-4 mr-3" />
              <span className="font-medium">{t('contact')}</span>
            </Link>

            <div className="border-t border-border/20 pt-4">
              <button
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-muted"
                onClick={(e) => toggleDropdown('resources-mobile', e)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-3" />
                  <span className="font-medium">{t('resources')}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openDropdown === 'resources-mobile' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'resources-mobile' && (
                <div className="ml-4 mt-2 space-y-2 animate-slide-down border-l-2 border-primary/20 pl-4">
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block p-2 rounded hover:bg-muted transition-all duration-300 transform hover:translate-x-1"
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border/20 pt-4">
              <button
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-muted"
                onClick={(e) => toggleDropdown('tools-mobile', e)}
              >
                <div className="flex items-center">
                  <Wrench className="h-4 w-4 mr-3" />
                  <span className="font-medium">{t('tools')}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openDropdown === 'tools-mobile' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'tools-mobile' && (
                <div className="ml-4 mt-2 space-y-2 animate-slide-down border-l-2 border-primary/20 pl-4">
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block p-2 rounded hover:bg-muted transition-all duration-300 transform hover:translate-x-1"
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border/20 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center p-3 rounded-md hover:bg-muted transition-all duration-300 transform hover:translate-x-1"
                    onClick={handleLinkClick}
                  >
                    <User className="h-4 w-4 mr-3" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button
                    className="flex items-center w-full p-3 rounded-md hover:bg-muted transition-all duration-300 transform hover:translate-x-1 text-destructive"
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLoginClick}
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Sign In
                  </Button>
                  <Button
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/signup');
                      setDrawerOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-border/50 flex justify-center">
          <ThemeToggle />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface NavbarProps {
  isAuthenticated: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogin, onLogout }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = false; //useIsMobile(); // Disabling the isMobile hook for now
  const resourcesLinks = mainLinks.find((link) => link.name === 'Resources')?.links || [];
  const toolsLinks = mainLinks.find((link) => link.name === 'Tools')?.links || [];

  const { t } = useLanguage();

  useLayoutEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDropdownMouseEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
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
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainLinks.map((link) =>
            'path' in link ? (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 transition-colors ${
                  isLinkActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {/* @ts-expect-error */}
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ) : (
              <div
                key={link.name}
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
                      {/* @ts-expect-error */}
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
                      {link.links.map((subLink) => (
                        <DropdownMenuItem key={subLink.path} asChild>
                          <Link
                            to={subLink.path}
                            className={`flex items-center space-x-2 px-2 py-2 cursor-pointer min-w-[150px] ${
                              isLinkActive(subLink.path)
                                ? 'text-primary bg-accent/50'
                                : ''
                            }`}
                          >
                            {/* @ts-expect-error */}
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

        {/* Mobile Navigation */}
        <MobileNavigation
          resourcesLinks={resourcesLinks}
          toolsLinks={toolsLinks}
          isAuthenticated={isAuthenticated}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};

export default Navbar;
