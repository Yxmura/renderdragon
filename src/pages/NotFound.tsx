
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = '404 - Page Not Found | Creator On Wheels';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="mb-6 text-cow-purple animate-float">
            <div className="text-9xl font-pixel animate-glow">404</div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-vt323 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-muted-foreground mb-8">
            The pixel you're looking for seems to have wandered off the grid. Let's get you back to a known location.
          </p>
          
          <Link 
            to="/" 
            className="pixel-btn-primary inline-flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Return to Home</span>
          </Link>
          
          <div className="mt-12 pixel-card border-dashed">
            <p className="text-sm text-muted-foreground">
              If you were expecting something to be here, please contact us and we'll investigate the missing pixels.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
