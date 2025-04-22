import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const TOS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/faq', { state: { activeTab: 'tos' } });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service - Renderdragon</title>
        <meta name="description" content="Read our Terms of Service to understand the rules and guidelines for using Renderdragon's tools and resources." />
        <meta property="og:title" content="Terms of Service - Renderdragon" />
        <meta property="og:description" content="Read our Terms of Service to understand the rules and guidelines for using Renderdragon's tools and resources." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/tos.png" />
        <meta property="og:url" content="https://renderdragon.org/tos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/tos.png" />
      </Helmet>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default TOS;
