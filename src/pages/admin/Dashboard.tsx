
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  ChevronRight,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Stats Card Component
const StatsCard = ({ title, value, change, icon, colorClass }: { 
  title: string;
  value: string;
  change: { value: string; positive: boolean };
  icon: React.ReactNode;
  colorClass: string;
}) => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center gap-1 mt-1">
            {change.positive ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span className={change.positive ? "text-xs text-green-500" : "text-xs text-red-500"}>
              {change.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${colorClass}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Orders Component
const RecentOrders = ({ orders }: { orders: any[] }) => {
  return (
    <Card className="col-span-2">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Select defaultValue="today">
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
            <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
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
        
        <Button variant="ghost" className="w-full mt-4 flex items-center justify-center">
          View All Orders
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

// Top Selling Products
const TopSellingProducts = ({ products }: { products: any[] }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Top Products</h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-4 mt-0">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-8 w-8 object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${product.price}</p>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {product.growth}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="py-8 text-center text-muted-foreground">
              Monthly data will appear here
            </div>
          </TabsContent>
          
          <TabsContent value="yearly">
            <div className="py-8 text-center text-muted-foreground">
              Yearly data will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  // Sample data for dashboard
  const recentOrders = [
    { id: '8531', customer: 'John Doe', amount: '125.00', date: '2 mins ago', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    { id: '8530', customer: 'Sarah Smith', amount: '89.50', date: '24 mins ago', avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith' },
    { id: '8529', customer: 'Mike Johnson', amount: '270.00', date: '2 hours ago', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
    { id: '8528', customer: 'Emily Brown', amount: '63.25', date: '3 hours ago', avatar: 'https://ui-avatars.com/api/?name=Emily+Brown' },
  ];
  
  const topProducts = [
    { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: '89.99', growth: '+12.5%', image: 'https://placehold.co/100' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: '199.99', growth: '+8.2%', image: 'https://placehold.co/100' },
    { id: 3, name: 'Laptop Sleeve', category: 'Accessories', price: '24.99', growth: '+5.7%', image: 'https://placehold.co/100' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Revenue"
          value="$48,574"
          change={{ value: "12.5%", positive: true }}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          colorClass="bg-green-500 text-white"
        />
        
        <StatsCard
          title="Total Orders"
          value="3,652"
          change={{ value: "8.2%", positive: true }}
          icon={<ShoppingBag className="h-6 w-6 text-white" />}
          colorClass="bg-blue-500 text-white"
        />
        
        <StatsCard
          title="Total Customers"
          value="12,938"
          change={{ value: "5.3%", positive: true }}
          icon={<Users className="h-6 w-6 text-white" />}
          colorClass="bg-purple-500 text-white"
        />
        
        <StatsCard
          title="Conversion Rate"
          value="3.24%"
          change={{ value: "1.2%", positive: false }}
          icon={<Activity className="h-6 w-6 text-white" />}
          colorClass="bg-orange-500 text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders orders={recentOrders} />
        <TopSellingProducts products={topProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
