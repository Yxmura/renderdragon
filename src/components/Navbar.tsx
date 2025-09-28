
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Sun, Moon, Skull } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Keep for now in case it's a dependency of drawer
import { Toggle } from "@/components/ui/toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from "./Logo";
import PixelSvgIcon from "./PixelSvgIcon";
import AuthDialog from "./auth/AuthDialog"; // Added for auth
import UserMenu from "./auth/UserMenu"; // Added for auth
import { useAuth } from "@/hooks/useAuth"; // Added for auth

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

// Helper function to get display name consistently
const getDisplayName = (user: any) => {
  // Priority: 1. User metadata display_name, 2. Email username
  if (user.user_metadata?.display_name) {
    return user.user_metadata.display_name;
  }
  if (user.email) {
    return user.email.split("@")[0] || "User";
  }
  return "User";
};

const mainLinks: (NavLink | NavDropdown)[] = [
  { name: "Home", path: "/", icon: "home" },
  { name: "Contact", path: "/contact", icon: "contact" },
  {
    name: "Resources",
    icon: "resources",
    links: [
      { name: "Resources Hub", path: "/resources", icon: "resources-hub" },
      { name: "Guides", path: "/guides", icon: "guides" },
      { name: "Utilities", path: "/utilities", icon: "software" },
      { name: "Community", path: "/community", icon: "yt-videos" },
    ],
  },
  {
    name: "Tools",
    icon: "tools",
    links: [
      { name: "Music Copyright Checker", path: "/gappa", icon: "music" },
      {
        name: "Background Generator",
        path: "/background-generator",
        icon: "background",
      },
      { name: "Player Renderer", path: "/player-renderer", icon: "player" },
      { name: "Text Generator", path: "/text-generator", icon: "text" },
      {
        name: "YouTube Downloader",
        path: "/youtube-downloader",
        icon: "yt-downloader",
        tag: "NEW",
      },
      { name: "Content Generators", path: "/generators", icon: "text" },
    ],
  },
];

// Small badge for marking new/updated links
function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-cow-purple text-white text-[10px] leading-none uppercase tracking-wide">
      {label}
    </span>
  );
}

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Kept, but managed by Drawer now
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState<
    string | null
  >(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });
  const isMobile = useIsMobile();
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // Added for auth
  const { user, loading } = useAuth(); // Added for auth
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Manages Drawer open state

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(offset / 300, 1);

      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); // This will still close the old mobile menu state, but is less critical now
        setIsDrawerOpen(false); // Close drawer on desktop size
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close old mobile menu state on location change
    setIsDrawerOpen(false); // Close drawer on location change
    setActiveDropdown(null); // Close desktop dropdowns on page change
  }, [location]);

  // Handle favorites visibility
  const handleShowFavorites = () => {
    if (location.pathname === "/resources") {
      // If already on resources page, just dispatch event
      window.dispatchEvent(new CustomEvent("showFavorites"));
    } else {
      // Navigate to resources page with favorites tab
      window.location.href = "/resources?tab=favorites";
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdown: NavDropdown) => {
    return dropdown.links.some((link) => isLinkActive(link.path));
  };

  const getBackgroundStyle = () => {
    let baseStyle: React.CSSProperties = {};
    if (scrolled) {
      baseStyle = {
        opacity: Math.min(scrollProgress * 1.5, 0.98),
        backdropFilter: `blur(${scrollProgress * 8}px)`,
        background:
          "linear-gradient(to right, hsl(var(--background)), hsl(var(--background)/0.95), hsl(var(--background)))",
        boxShadow: "inset 0 -1px 0 0 hsl(var(--border))",
      };
    }

    if (!isMobile) {
      return {
        ...baseStyle,
        width: "calc(100% - 17px)", // Standard scrollbar width
        right: "17px", // Offset for scrollbar
      };
    }

    return baseStyle;
  };

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
          scrolled
            ? "shadow-lg shadow-cow-purple/10 border-b border-cow-purple/20 backdrop-blur-sm"
            : ""
        }`}
      >
        <div
          className={`absolute inset-0 z-[-1] pointer-events-none transition-all duration-300 ${
            isTransparent
              ? "bg-transparent"
              : "bg-gradient-to-r from-background via-background/95 to-background dark:from-cow-purple/5 dark:via-background/90 dark:to-background/95 border-b border-cow-purple/10"
          }`}
          style={getBackgroundStyle()}
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
              <span className="hidden md:inline animate-glow font-vt323 text-cow-purple">
                Renderdragon
              </span>
            )}
            {isMobile && <span className="font-vt323 text-cow-purple">RD</span>}
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {mainLinks.map((link, index) =>
              "path" in link ? (
                <Link
                  key={index}
                  to={link.path}
                  className={`flex items-center gap-1 transition-colors font-vt323 text-xl ${isLinkActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"}`}
                >
                  {/* no icons for desktop */}
                  <span>{link.name}</span>
                  {link.tag && <TagBadge label={link.tag} />}
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
                        className={`flex items-center transition-colors font-vt323 text-xl ${isDropdownActive(link) ? "text-primary" : "text-foreground hover:text-primary"}`}
                        style={{ transform: "none" }}
                      >
                        {/* no icons on desktop */}
                        <span>{link.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-popover border border-border z-50 pixel-corners"
                    >
                      <DropdownMenuGroup>
                        {link.links.map((subLink, subIndex) => (
                          <DropdownMenuItem key={subIndex} asChild>
                            <Link
                              to={subLink.path}
                              className={`flex items-center gap-1 px-2 py-2 cursor-pointer font-vt323 text-xl pixel-corners ${isLinkActive(subLink.path) ? "text-primary bg-accent/50" : ""}`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {/* sub link name */}
                              <span>{subLink.name}</span>
                              {(subLink as NavLink).tag && (
                                <TagBadge label={(subLink as NavLink).tag!} />
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex">
              {loading ? (
                <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
              ) : user ? (
                <UserMenu
                  key={user.id + (user.user_metadata?.display_name || "")}
                  onShowFavorites={handleShowFavorites}
                />
              ) : (
                <Button
                  onClick={() => setAuthDialogOpen(true)}
                  className="pixel-btn-primary"
                >
                  Sign In
                </Button>
              )}
            </div>
            {/* Desktop Theme Toggle */}
            <ThemeToggle className="hidden md:block" />

            {/* Mobile Menu Trigger */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[90vh] rounded-t-xl bg-background border-t border-border">
                <div className="px-4 py-6 max-h-[calc(100%-60px)] overflow-auto">
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      to="/"
                      className="flex items-center space-x-2 text-xl font-bold"
                      onClick={() => setIsDrawerOpen(false)} // Close drawer on logo click
                    >
                      <div className="w-8 h-8 flex items-center justify-center font-bold text-xs">
                        <Logo size="sm" />
                      </div>
                      <span className="font-vt323">Renderdragon</span>
                    </Link>
                  </div>

                  <nav className="space-y-4">
                    {mainLinks.map((link, index) =>
                      "path" in link ? (
                        <Link
                          key={index}
                          to={link.path}
                          className={`flex items-center gap-1 text-xl py-3 border-b border-border font-vt323 ${isLinkActive(link.path) ? "text-primary" : ""}`}
                          onClick={() => setIsDrawerOpen(false)} // Close drawer on link click
                        >
                          <span>{link.name}</span>
                          {link.tag && <TagBadge label={link.tag} />}
                        </Link>
                      ) : (
                        <Collapsible
                          key={index}
                          className="w-full border-b border-border"
                          open={openMobileCollapsible === link.name}
                          onOpenChange={() =>
                            handleMobileCollapsibleToggle(link.name)
                          }
                        >
                          <CollapsibleTrigger className="w-full flex items-center justify-between text-xl py-3">
                            <div className="flex items-center space-x-3 font-vt323">
                              <span>{link.name}</span>
                              {link.tag && <TagBadge label={link.tag} />}
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                openMobileCollapsible === link.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="animate-accordion-down">
                            <div className="pl-8 pb-3 space-y-3">
                              {link.links.map((subLink, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subLink.path}
                                  className={`flex items-center space-x-3 py-2 font-vt323 text-xl ${isLinkActive(subLink.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                                  onClick={() => setIsDrawerOpen(false)} // Close drawer on sub-link click
                                >
                                  <span>{subLink.name}</span>
                                  {(subLink as NavLink).tag && (
                                    <TagBadge
                                      label={(subLink as NavLink).tag!}
                                    />
                                  )}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ),
                    )}
                  </nav>
                  {/* Mobile Auth Section */}
                  <div className="pt-4 border-t border-border mt-4">
                    {loading ? (
                      <div className="w-full h-10 animate-pulse bg-muted rounded-md" />
                    ) : user ? (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-vt323">
                          {getDisplayName(user)}
                        </div>
                        <Button
                          onClick={() => {
                            handleShowFavorites();
                            setIsDrawerOpen(false);
                          }}
                          variant="outline"
                          className="w-full pixel-corners font-vt323"
                        >
                          My Favorites
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
                          Sign Out
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
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center border-t border-border bg-background">
                  <Toggle
                    pressed={theme === "dark"}
                    onPressedChange={toggleTheme}
                    className="w-full flex items-center justify-center gap-2 py-2 font-vt323"
                  >
                    {theme === "dark" ? (
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
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-background/20 z-20">
            <div
              className="h-full bg-cow-purple transition-all duration-300 animate-pulse-neon"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        )}
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default React.memo(Navbar);
