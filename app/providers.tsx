'use client';

import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VercelAnalytics from '@/components/VercelAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from '@/hooks/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@/components/ErrorBoundary';
import DiscordPopup from '@/components/resources/DiscordPopup';
import { useDiscordPopup } from '@/hooks/useDiscordPopup';

function ProvidersInner({ children }: { children: React.ReactNode }) {
  const { isPopupOpen, closePopup, neverShowPopupAgain } = useDiscordPopup();

  return (
    <>
      {children}
      <Toaster />
      <Sonner />
      <VercelAnalytics />
      <SpeedInsights />
      <DiscordPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onNeverShowAgain={neverShowPopupAgain}
      />
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <TooltipProvider>
              <ProvidersInner>{children}</ProvidersInner>
            </TooltipProvider>
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
