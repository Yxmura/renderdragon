import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  // Add other user properties as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, you would validate the token with your backend
          // For now, we'll just check if a user exists in localStorage
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, you would call your authentication API here
      // This is a mock implementation
      const mockUser = {
        id: 'mock-user-id',
        email,
        displayName: email.split('@')[0],
      };
      
      localStorage.setItem('auth_token', 'mock-auth-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { user: mockUser, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'Failed to sign in' };
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      // In a real app, you would call your registration API here
      // This is a mock implementation
      const mockUser = {
        id: 'mock-user-id',
        email,
        displayName,
      };
      
      localStorage.setItem('auth_token', 'mock-auth-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { user: mockUser, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: 'Failed to create account' };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }, [navigate]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
