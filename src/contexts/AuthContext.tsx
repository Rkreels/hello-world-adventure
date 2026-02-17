
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo users for the application
const DEMO_USERS: Record<string, User> = {
  'admin@example.com': {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    phone: '+1234567890',
    role: 'admin',
    status: 'active',
  },
  'customer@example.com': {
    id: '2',
    email: 'customer@example.com',
    name: 'Sarah Johnson',
    phone: '+1234567891',
    role: 'customer',
    status: 'active',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with admin user logged in for demo purposes
  const [user, setUser] = useState<User | null>(DEMO_USERS['admin@example.com']);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const demoUser = DEMO_USERS[email];
      if (demoUser && password.length >= 6) {
        setUser(demoUser);
        toast.success(`Welcome back, ${demoUser.name}!`);
      } else {
        throw new Error('Invalid credentials. Try admin@example.com / admin123');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        phone: '',
        role: 'customer',
        status: 'active',
      };

      setUser(newUser);
      toast.success(`Welcome, ${newUser.name}! Account created successfully.`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
