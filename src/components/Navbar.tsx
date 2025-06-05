
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import AuthDialog from './auth/AuthDialog';
import UserMenu from './auth/UserMenu';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Guides', path: '/guides' },
    { name: 'Utilities', path: '/utilities' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleShowFavorites = () => {
    if (location.pathname === '/resources') {
      setShowFavorites(true);
      window.dispatchEvent(new CustomEvent('showFavorites'));
    } else {
      window.location.href = '/resources?tab=favorites';
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`transition-colors hover:text-cow-purple font-vt323 text-lg ${
                      isActive(item.path) ? 'text-cow-purple' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Auth & Theme */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {loading ? (
                <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
              ) : user ? (
                <UserMenu onShowFavorites={handleShowFavorites} />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setAuthDialogOpen(true)}
                    className="pixel-btn-primary"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="pixel-corners"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`block py-2 font-vt323 text-lg transition-colors ${
                      isActive(item.path) ? 'text-cow-purple' : 'text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-border"
                >
                  {user ? (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <Button
                        onClick={handleShowFavorites}
                        variant="outline"
                        className="w-full pixel-corners"
                      >
                        My Favorites
                      </Button>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          // Sign out logic here
                        }}
                        variant="outline"
                        className="w-full pixel-corners"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setAuthDialogOpen(true);
                        setIsOpen(false);
                      }}
                      className="w-full pixel-btn-primary"
                    >
                      Sign In
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </>
  );
};

export default Navbar;
