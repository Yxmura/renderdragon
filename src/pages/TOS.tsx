
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TOS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/faq', { state: { activeTab: 'tos' } });
  }, [navigate]);

  return null;
};

export default TOS;
