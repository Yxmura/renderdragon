// src/components/HyperpingBadge.tsx
import React, { useEffect, useRef } from 'react';

function HyperpingBadge() {
  const isInitialized = useRef(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://hyperping.com/badge.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof Hyperping !== 'undefined' && !isInitialized.current) {
        Hyperping.init({
          "statuspage": "rendergen.hyperping.app",
          "border": "none",
          "borderColor": "#2264AF",
          "uptime": false,
          "dot": true,
          "dotSize": 10,
          "isNeutral": false,
          "dotOk": "#2BAC76",
          "dotIncident": "#FFAF36",
          "dotOutage": "#E95858",
          "dotMaintenance": "#0070F3",
          "dotNeutral": "#0070F3",
          "operational": "",
          "incident": "",
          "outage": "",
          "maintenance": ""
        });
        isInitialized.current = true;
      } else {
        console.warn('Hyperping object not found after script load.');
      }
    };

    return () => {
      document.body.removeChild(script);
      isInitialized.current = false;
    };
  }, []);

  return <div id="hyperping-badge"></div>;
}

export default HyperpingBadge;
