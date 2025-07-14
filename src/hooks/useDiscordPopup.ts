import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const POPUP_COOKIE_NAME = 'discord_popup_never_show';

export const useDiscordPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const cookie = Cookies.get(POPUP_COOKIE_NAME);

    const shouldShow = isLocalhost ? true : !cookie;
    if (shouldShow) {
      const delay = isLocalhost ? 3000 : 5000;
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNeverShowAgain = () => {
    Cookies.set(POPUP_COOKIE_NAME, 'true', { expires: 365 });
    setIsOpen(false);
  };

  return {
    isPopupOpen: isOpen,
    closePopup: handleClose,
    neverShowPopupAgain: handleNeverShowAgain,
  };
};
