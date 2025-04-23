
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  role: 'admin' | 'customer';
  name: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  demoLogin: (role: 'admin' | 'customer') => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Simple authentication logic
    const userRole: 'admin' | 'customer' = email.includes('admin') ? 'admin' : 'customer';
    
    const newUser = {
      email,
      role: userRole,
      name: email.includes('admin') ? 'Admin User' : 'Customer User',
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    if (newUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  const demoLogin = (role: 'admin' | 'customer') => {
    const demoUser = {
      email: role === 'admin' ? 'admin@example.com' : 'customer@example.com',
      role: role,
      name: role === 'admin' ? 'Admin Demo' : 'Customer Demo',
    };
    
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      demoLogin,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
