
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/hooks/useCart';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || undefined} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user?.name && <p className="font-medium">{user.name}</p>}
                {user?.email && <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>}
              </div>
            </div>
            <DropdownMenuSeparator />
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link to="/admin/dashboard" className="cursor-pointer">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="cursor-pointer">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600" 
              onClick={() => logout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="ghost" size="sm" className="flex items-center">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      )}
      
      <Link to="/cart">
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
            {items.length}
          </span>
          <span className="ml-2">Cart</span>
        </Button>
      </Link>
    </div>
  );
};

export default UserMenu;
