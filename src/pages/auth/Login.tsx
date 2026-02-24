
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, User } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    await login('admin@example.com', 'admin123');
    navigate('/admin', { replace: true });
  };

  const handleUserLogin = async () => {
    await login('customer@example.com', 'password123');
    navigate('/orders', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
          <p className="text-gray-600">Choose how you'd like to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full h-14 text-base"
            onClick={handleAdminLogin}
          >
            <Shield className="w-5 h-5 mr-2" />
            Admin Login
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-base"
            onClick={handleUserLogin}
          >
            <User className="w-5 h-5 mr-2" />
            User Login
          </Button>

          <Separator className="my-4" />

          <p className="text-xs text-center text-muted-foreground">
            These are placeholder logins for demo purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
