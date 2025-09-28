import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const POPUP_COOKIE_NAME = "discord_popup_never_show";

export const useDiscordPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = () => {
      // Check if user has explicitly chosen "never show again"
      const cookie = Cookies.get(POPUP_COOKIE_NAME);

      if (cookie === "true") {
        return; // Don't show if cookie is set
      }

      // For local development, always show (but respect the cookie)
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      // Only show if we haven't shown it before in this session
      if (!hasShown) {
        const delay = isLocalhost ? 3000 : 5000;
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true); // Mark as shown for this session
        }, delay);

        return () => clearTimeout(timer);
      }
    };

    checkAndShowPopup();
  }, [hasShown]); // Re-run when hasShown changes

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNeverShowAgain = () => {
    // Set cookie with explicit path and domain to ensure it works across all pages
    Cookies.set(POPUP_COOKIE_NAME, "true", {
      expires: 365,
      path: "/", // Make cookie available across all paths
      domain:
        window.location.hostname === "localhost"
          ? undefined
          : window.location.hostname,
      secure: window.location.protocol === "https:",
      sameSite: "lax",
    });
    setIsOpen(false);
    setHasShown(true); // Also mark as shown for this session
  };

  return {
    isPopupOpen: isOpen,
    closePopup: handleClose,
    neverShowPopupAgain: handleNeverShowAgain,
  };
};
