'use client';


import { useEffect } from 'react';
import { inject } from '@vercel/analytics';

const VercelAnalytics = () => {
  useEffect(() => {
    // Initialize Vercel Analytics
    inject();
  }, []);

  return null; // This component doesn't render anything
};

export default VercelAnalytics;
