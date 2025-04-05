
'use client';

import { useState, useEffect } from 'react';
import LaunchPage from './pages/LaunchPage';
import { createPortal } from 'react-dom';

const LaunchOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(true); // Control overlay visibility
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  if (!isMounted) return null;

  return showOverlay
    ? createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
            <LaunchPage />
          </div>
        </div>,
        document.body
      )
    : null;
};

export default LaunchOverlay;