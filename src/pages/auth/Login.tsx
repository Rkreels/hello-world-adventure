
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Store login info in localStorage
    localStorage.setItem('user', JSON.stringify({
      email,
      role: email.includes('admin') ? 'admin' : 'customer',
      name: email.includes('admin') ? 'Admin User' : 'Customer User',
    }));
    
    toast({
      title: "Success",
      description: "Logged in successfully",
    });
    
    // Redirect based on role
    if (email.includes('admin')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleDemoLogin = (role: 'admin' | 'customer') => {
    const demoUser = {
      email: role === 'admin' ? 'admin@example.com' : 'customer@example.com',
      role: role,
      name: role === 'admin' ? 'Admin Demo' : 'Customer Demo',
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    toast({
      title: "Demo Login",
      description: `Logged in as ${role}`,
    });
    
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => handleDemoLogin('admin')}
                className="flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                Admin Demo
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => handleDemoLogin('customer')}
                className="flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                Customer Demo
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
