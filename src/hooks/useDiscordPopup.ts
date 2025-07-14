import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const POPUP_COOKIE_NAME = 'discord_popup_never_show';

export const useDiscordPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run once on component mount
    if (isInitialized) return;
    
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const cookie = Cookies.get(POPUP_COOKIE_NAME);

    const shouldShow = isLocalhost ? true : !cookie;
    if (shouldShow) {
      const delay = isLocalhost ? 3000 : 5000;
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsInitialized(true);
      }, delay);
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNeverShowAgain = useCallback(() => {
    Cookies.set(POPUP_COOKIE_NAME, 'true', { 
      expires: 365,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    setIsOpen(false);
  }, []);

  return {
    isPopupOpen: isOpen,
    closePopup: handleClose,
    neverShowPopupAgain: handleNeverShowAgain,
  };
};
