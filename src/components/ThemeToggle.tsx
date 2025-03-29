
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
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
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-colors animate-glow rounded-full w-10 h-10", 
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      style={{ transform: 'none' }}
    >
      <Sun className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-0 -rotate-90'}`} />
      <Moon className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-0 rotate-90'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
