
import { useState, useEffect } from 'react';

export const Logo = ({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/renderdragon0.png",
    "/renderdragon1.png",
    "/renderdragon2.png",
    "/renderdragon3.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // 1 second rotation

    return () => clearInterval(timer);
  }, []);

  // Determine dimensions based on size prop
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  }[size];

  return (
    <div className={`relative ${dimensions} flex-shrink-0 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Renderdragon Logo ${index}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Logo;
