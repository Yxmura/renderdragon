import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, Compass } from 'lucide-react';
import DonateButton from '@/components/DonateButton';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    document.title = '404 - Page Not Found | Renderdragon';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 cow-grid-bg flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          {/* 404 headline */}
          <div className="text-cow-purple animate-float mb-4">
            <div className="text-9xl font-pixel animate-glow drop-shadow-lg">404</div>
          </div>

          <h1 className="text-3xl md:text-5xl font-vt323 mb-4 text-foreground dark:text-white">
            Uh oh! This chunk failed to load.
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            The page you're trying to reach doesn't exist — or it may have been lost in the Nether. 
            Try heading back or explore something new.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/"
              className="pixel-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm hover:scale-105 transition-transform"
            >
              <Home className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>

            <Link
              to="/resources"
              className="pixel-btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm hover:scale-105 transition-transform"
            >
              <Compass className="h-5 w-5" />
              <span>Explore Resources</span>
            </Link>
          </div>

          {/* Optional extra message box */}
          <div className="mt-12 pixel-card border-dashed border-cow-purple/30 bg-background/50 px-6 py-4">
            <p className="text-sm text-muted-foreground">
              If you followed a broken link, feel free to <Link to="/contact" className="underline underline-offset-2">contact us</Link> so we can fix it.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />
    </div>
  );
};

export default NotFound;
