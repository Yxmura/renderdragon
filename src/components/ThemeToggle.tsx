'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PixelSvgIcon from './PixelSvgIcon';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') as 'light' | 'dark' ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden transition-colors animate-glow rounded-full w-10 h-10',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      style={{ transform: 'none' }}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-full h-full transition-all duration-300 absolute top-0 left-0" style={{zIndex: theme === 'light' ? 2 : 1, opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)'}}>
          <PixelSvgIcon name="sun" className="h-5 w-5" />
        </span>
        <span className="flex items-center justify-center w-full h-full transition-all duration-300 absolute top-0 left-0" style={{zIndex: theme === 'dark' ? 2 : 1, opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)'}}>
          <PixelSvgIcon name="moon" className="h-5 w-5" />
        </span>
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
