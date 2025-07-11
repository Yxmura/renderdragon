// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Keep for now in case it's a dependency of drawer
import { Toggle } from "@/components/ui/toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from './Logo';
import PixelSvgIcon from './PixelSvgIcon';
import AuthDialog from './auth/AuthDialog'; // Added for auth
import UserMenu from './auth/UserMenu'; // Added for auth
import { useAuth } from '@/hooks/useAuth'; // Added for auth

interface NavLink {
  name: string;
  path: string;
  icon: string;
  tag?: string; // optional badge/tag (e.g. "NEW")
}

interface NavDropdown {
  name: string;
  icon: string;
  links: NavLink[];
}

// Small badge for marking new/updated links
function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-cow-purple text-white text-[10px] leading-none uppercase tracking-wide">
      {label}
    </span>
  );
}

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Kept, but managed by Drawer now
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const isMobile = useIsMobile();
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // Added for auth
  const { user, loading } = useAuth(); // Added for auth
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Manages Drawer open state

  const mainLinks: (NavLink | NavDropdown)[] = [
    { name: t('navbar.home'), path: '/', icon: 'home' },
    { name: t('navbar.contact'), path: '/contact', icon: 'contact' },
    { 
      name: t('navbar.resources'), 
      icon: 'resources',
      links: [
        { name: t('navbar.resourcesHub'), path: '/resources', icon: 'resources-hub' },
        { name: t('navbar.guides'), path: '/guides', icon: 'guides' },
        { name: t('navbar.utilities'), path: '/utilities', icon: 'software' },
        { name: t('navbar.community'), path: '/community', icon: 'yt-videos' },
      ]
    },
    {
      name: t('navbar.tools'),
      icon: 'tools',
      links: [
        { name: t('navbar.musicCopyrightChecker'), path: '/gappa', icon: 'music' },
        { name: t('navbar.backgroundGenerator'), path: '/background-generator', icon: 'background' },
        { name: t('navbar.playerRenderer'), path: '/player-renderer', icon: 'player' },
        { name: t('navbar.textGenerator'), path: '/text-generator', icon: 'text' },
        { name: t('navbar.youtubeDownloader'), path: '/youtube-downloader', icon: 'yt-downloader', tag: t('navbar.newTag') },
        { name: t('navbar.contentGenerators'), path: '/generators', icon: 'text' }
      ]
    }
  ];

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
        setMobileMenuOpen(false); // Close mobile menu on resize to desktop
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.documentElement.setAttribute('data-theme', theme);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Handle favorites visibility
  const handleShowFavorites = () => {
    // Logic to show favorites, e.g., navigate to a favorites page
    // or open a favorites modal.
    // For now, let's just log it.
    console.log("Show favorites clicked");
    // Example navigation:
    // navigate('/favorites');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
    setOpenMobileCollapsible(prev => (prev === name ? null : name));
  };

  const isLinkActive = (path: string) => {
    // Special case for home page to avoid matching every path
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdown: NavDropdown) => {
    return dropdown.links.some(link => isLinkActive(link.path));
  };

  const getBackgroundStyle = () => {
    if (scrolled) {
      return {
        backgroundColor: `rgba(var(--background-rgb), ${scrollProgress * 0.8})`,
        backdropFilter: `blur(${scrollProgress * 10}px)`,
        WebkitBackdropFilter: `blur(${scrollProgress * 10}px)`,
        borderBottom: `1px solid rgba(var(--border-rgb), ${scrollProgress * 0.2})`
      };
    }
    return { 
      backgroundColor: 'transparent', 
      borderBottom: '1px solid transparent'
    };
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out pixel-corners-bottom-sm"
        style={getBackgroundStyle()}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
              <span className="font-bold text-lg font-vt323">Renderdragon</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {mainLinks.map((link) => (
                'links' in link ? (
                  <DropdownMenu 
                    key={link.name}
                    open={activeDropdown === link.name}
                    onOpenChange={(isOpen) => setActiveDropdown(isOpen ? link.name : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost"
                        onMouseEnter={() => handleDropdownMouseEnter(link.name)}
                        onMouseLeave={handleDropdownMouseLeave}
                        className={`font-vt323 text-sm px-3 ${isDropdownActive(link) ? 'text-cow-purple' : ''}`}
                      >
                        <PixelSvgIcon name={link.icon} className="mr-2 h-4 w-4" />
                        {link.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" style={{ transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      onMouseEnter={() => handleDropdownMouseEnter(link.name)}
                      onMouseLeave={handleDropdownMouseLeave}
                      className="w-56 pixel-corners bg-background/80 backdrop-blur-sm border-border/50"
                    >
                      <DropdownMenuGroup>
                        {link.links.map(subLink => (
                          <DropdownMenuItem key={subLink.path} asChild>
                            <Link 
                              to={subLink.path} 
                              className={`w-full flex items-center justify-between font-vt323 ${isLinkActive(subLink.path) ? 'text-cow-purple' : ''}`}
                            >
                              <div className="flex items-center">
                                <PixelSvgIcon name={subLink.icon} className="mr-2 h-4 w-4" />
                                {subLink.name}
                              </div>
                              {subLink.tag && <TagBadge label={subLink.tag} />}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button key={link.name} asChild variant="ghost">
                    <Link to={link.path} className={`font-vt323 text-sm px-3 ${isLinkActive(link.path) ? 'text-cow-purple' : ''}`}>
                      <PixelSvgIcon name={link.icon} className="mr-2 h-4 w-4" />
                      {link.name}
                    </Link>
                  </Button>
                )
              ))}
              <Button asChild variant="outline" className="ml-2 pixel-btn-secondary">
                  <a href="https://patreon.com/renderdragon" target="_blank" rel="noopener noreferrer">{t('navbar.becomePartner')}</a>
              </Button>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-2">
              {loading ? (
                <div className="w-24 h-10 animate-pulse bg-muted rounded-md" />
              ) : user ? (
                <UserMenu />
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)} className="pixel-btn-primary font-vt323">{t('navbar.signIn')}</Button>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation Trigger */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full flex flex-col">
                <div className="p-4 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="flex items-center gap-2" onClick={() => setIsDrawerOpen(false)}>
                      <Logo className="h-8 w-auto" />
                      <span className="font-bold text-lg font-vt323">Renderdragon</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    {mainLinks.map((link) => (
                      'path' in link ? (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-md text-base font-vt323 transition-colors ${isLinkActive(link.path) ? 'bg-muted text-cow-purple' : 'hover:bg-muted'}`}
                        >
                          <PixelSvgIcon name={link.icon} className="h-5 w-5" />
                          <span>{link.name}</span>
                        </Link>
                      ) : (
                        <Collapsible key={link.name} open={openMobileCollapsible === link.name} onOpenChange={() => handleMobileCollapsibleToggle(link.name)}>
                          <CollapsibleTrigger className={`w-full flex items-center justify-between gap-3 p-3 rounded-md text-base font-vt323 transition-colors ${isDropdownActive(link) ? 'bg-muted text-cow-purple' : 'hover:bg-muted'}`}>
                            <div className="flex items-center gap-3">
                              <PixelSvgIcon name={link.icon} className="h-5 w-5" />
                              <span>{link.name}</span>
                            </div>
                            <ChevronDown className={`h-5 w-5 transition-transform ${openMobileCollapsible === link.name ? 'rotate-180' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="pl-8 pt-2 flex flex-col gap-1">
                              {link.links.map((subLink) => (
                                <Link
                                  key={subLink.path}
                                  to={subLink.path}
                                  onClick={() => setIsDrawerOpen(false)}
                                  className={`flex items-center justify-between gap-3 p-2 rounded-md text-sm font-vt323 transition-colors ${isLinkActive(subLink.path) ? 'bg-muted/80 text-cow-purple' : 'hover:bg-muted/80'}`}
                                >
                                  <span>{subLink.name}</span>
                                  {(subLink as NavLink).tag && (
                                    <TagBadge label={(subLink as NavLink).tag!} />
                                  )}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    ))}
                  </nav>
                  {/* Mobile Auth Section */}
                  <div className="pt-4 border-t border-border mt-4">
                    {loading ? (
                      <div className="w-full h-10 animate-pulse bg-muted rounded-md" />
                    ) : user ? (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-vt323">{user.email}</div>
                        <Button
                          onClick={() => { handleShowFavorites(); setIsDrawerOpen(false); }}
                          variant="outline"
                          className="w-full pixel-corners font-vt323"
                        >
                          {t('navbar.myFavorites')}
                        </Button>
                        <Button
                          onClick={() => {
                            // Assuming sign out logic is handled elsewhere, e.g., via useAuth context
                            // You might need to add a sign-out function here if useAuth doesn't provide one
                            // Example: signOut();
                            setIsDrawerOpen(false);
                          }}
                          variant="outline"
                          className="w-full pixel-corners font-vt323"
                        >
                          {t('navbar.signOut')}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setAuthDialogOpen(true);
                          setIsDrawerOpen(false); // Close drawer when opening auth dialog
                        }}
                        className="w-full pixel-btn-primary font-vt323"
                      >
                        {t('navbar.signIn')}
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center border-t border-border bg-background">
                  <Toggle 
                    pressed={theme === 'dark'} 
                    onPressedChange={toggleTheme}
                    className="w-full flex items-center justify-center gap-2 py-2 font-vt323"
                  >
                    {theme === 'dark' ? (
                      <>
                        <PixelSvgIcon name="moon" className="h-5 w-5" />
                        <span>{t('navbar.darkMode')}</span>
                      </>
                    ) : (
                      <>
                        <PixelSvgIcon name="sun" className="h-5 w-5" />
                        <span>{t('navbar.lightMode')}</span>
                      </> 
                    )}
                  </Toggle>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        
        {scrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-background/20 z-20">
            <div 
              className="h-full bg-cow-purple transition-all duration-300 animate-pulse-neon"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        )}
      </header>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </>
  );
};

export default React.memo(Navbar);