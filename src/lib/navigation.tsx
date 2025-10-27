'use client';

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Wrapper for Link component that works with Next.js
export function Link({ 
  to, 
  href, 
  children, 
  className,
  onClick,
  ...props 
}: { 
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const destination = to || href || '/';
  
  return (
    <NextLink href={destination} className={className} onClick={onClick} {...props}>
      {children}
    </NextLink>
  );
}

// Wrapper for useLocation hook that works with Next.js
export function useLocation() {
  const pathname = usePathname();
  
  return {
    pathname,
    search: '',
    hash: '',
    state: null,
  };
}

// Wrapper for Navigate component that works with Next.js
export function Navigate({ to, replace = false }: { to: string; replace?: boolean }) {
  const router = useRouter();
  
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);
  
  return null;
}
