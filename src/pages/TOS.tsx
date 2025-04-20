
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TOS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/faq', { state: { activeTab: 'tos' } });
  }, [navigate]);

  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export default TOS;
