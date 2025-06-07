
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Order {
  id: string;
  customer: string;
  amount: string;
  date: string;
  avatar: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const navigate = useNavigate();

  const handleViewAllOrders = () => {
    navigate('/ecommerce/admin/orders');
    toast.info('Viewing all orders');
  };

  const handlePeriodChange = (period: string) => {
    toast.info(`Filtering orders by: ${period}`);
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/ecommerce/admin/orders/${orderId}`);
    toast.info(`Viewing order #${orderId}`);
  };

  return (
    <Card className="col-span-2">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Select defaultValue="today" onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id} 
              className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <img src={order.avatar} alt={order.customer} />
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{order.customer}</h4>
                  <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${order.amount}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 flex items-center justify-center"
          onClick={handleViewAllOrders}
        >
          View All Orders
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
