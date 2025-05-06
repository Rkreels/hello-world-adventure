
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  email: string;
  role: 'admin' | 'customer';
  name: string;
  photoURL?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  demoLogin: (role: 'admin' | 'customer') => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (data: Partial<Omit<User, 'role'>>) => void;
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
    try {
      // Simple authentication logic
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      
      const userRole: 'admin' | 'customer' = email.includes('admin') ? 'admin' : 'customer';
      const firstName = email.split('@')[0];
      const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      
      const newUser = {
        email,
        role: userRole,
        name: email.includes('admin') ? 'Admin User' : `${capitalizedName}`,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(capitalizedName)}&background=random`,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success(`Welcome back, ${newUser.name}!`);
      
      if (newUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  const demoLogin = (role: 'admin' | 'customer') => {
    try {
      const demoUser = {
        email: role === 'admin' ? 'admin@example.com' : 'customer@example.com',
        role: role,
        name: role === 'admin' ? 'Admin Demo' : 'Customer Demo',
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(role === 'admin' ? 'Admin Demo' : 'Customer Demo')}&background=random`,
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      toast.success(`Welcome, ${demoUser.name}!`);
      
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
      console.error("Demo login error:", error);
    }
  };

  const updateProfile = (data: Partial<Omit<User, 'role'>>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success("Profile updated successfully");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("You have been logged out");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      demoLogin,
      updateProfile,
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
