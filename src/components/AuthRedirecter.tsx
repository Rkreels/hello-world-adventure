
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthRedirecter = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Skip if the user is already on the login page
    if (location.pathname === '/login') {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect admin paths for non-admin users
    if (location.pathname.startsWith('/admin') && !isAdmin) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, isAdmin, location.pathname, navigate]);

  return null;
};

export default AuthRedirecter;
