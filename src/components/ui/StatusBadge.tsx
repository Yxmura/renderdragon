import { useEffect } from 'react';
import { useTheme } from 'next-themes';

// Extend the Window interface to include the Hyperping property
declare global {
  interface Window {
    Hyperping?: {
      init: (config: {
        statuspage: string;
        border: string;
        borderColor: string;
        uptime: boolean;
        dot: boolean;
        dotSize: number;
        isNeutral: boolean;
        dotOk: string;
        dotIncident: string;
        dotOutage: string;
        dotMaintenance: string;
        dotNeutral: string;
        operational: string;
        incident: string;
        outage: string;
        maintenance: string;
      }) => void;
    };
  }
}

const HyperpingBadge = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log('HyperpingBadge component mounted');

    const borderColor = theme === 'dark' ? '#30363D' : '#D1D5DB';

    // Check if the script is already loaded
    if (!document.getElementById('hyperping-badge-script')) {
      const script = document.createElement('script');
      script.src = 'https://hyperping.com/badge.js';
      script.async = true;
      script.id = 'hyperping-badge-script';
      script.onload = () => {
        console.log('Hyperping script loaded:', window.Hyperping);
        if (window.Hyperping) {
          window.Hyperping.init({
            statuspage: 'https://rendergen.hyperping.app/',
            border: 'none',
            borderColor,
            uptime: true,
            dot: true,
            dotSize: 11,
            isNeutral: false,
            dotOk: '#2BAC76',
            dotIncident: '#FFAF36',
            dotOutage: '#E95858',
            dotMaintenance: '#0070F3',
            dotNeutral: '#0070F3',
            operational: 'All systems up',
            incident: 'Under investigation',
            outage: 'System outage',
            maintenance: 'Under maintenance',
          });
        } else {
          console.error('Hyperping object not found after script load');
        }
      };
      document.body.appendChild(script);
    } else {
      console.log('Hyperping script already loaded');
      window.Hyperping?.init?.({
        statuspage: 'https://rendergen.hyperping.app/',
        border: 'none',
        borderColor,
        uptime: true,
        dot: true,
        dotSize: 11,
        isNeutral: false,
        dotOk: '#2BAC76',
        dotIncident: '#FFAF36',
        dotOutage: '#E95858',
        dotMaintenance: '#0070F3',
        dotNeutral: '#0070F3',
        operational: 'All systems up',
        incident: 'Under investigation',
        outage: 'System outage',
        maintenance: 'Under maintenance',
      });
    }
  }, [theme]);

  return (
    <div
      id="hyperping-badge"
      style={{
        textAlign: 'center',
        margin: '0 auto',
      }}
    />
  );
};

export default HyperpingBadge;
