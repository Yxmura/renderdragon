import { useEffect } from "react";

const DonateButton = () => {
  useEffect(() => {
    // Preload the button image for better performance
    const img = new Image();
    img.src =
      "https://img.buymeacoffee.com/button-api/?text=Buy us a pizza&emoji=🍕&slug=renderdragon&button_colour=9b87f5&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00";
  }, []);

  return (
    <a
      href="https://www.buymeacoffee.com/renderdragon"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 transition-transform duration-300 hover:scale-105"
      aria-label="Buy us a pizza"
    >
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Buy us a pizza&emoji=🍕&slug=renderdragon&button_colour=9b87f5&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"
        alt="Buy us a pizza"
        className="w-auto h-auto"
        loading="lazy"
      />
    </a>
  );
};

export default DonateButton;
