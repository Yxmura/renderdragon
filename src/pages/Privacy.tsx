
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/faq', { state: { activeTab: 'privacy' } });
  }, [navigate]);

  return null;
};

export default Privacy;
