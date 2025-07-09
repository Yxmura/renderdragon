import React from 'react';

export const Logo = ({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  }[size];

  return (
    <div className={`${dimensions} flex-shrink-0 ${className}`}>
      <img
        src="/renderdragon.png"
        alt="Renderdragon Logo"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(Logo);