
import React from 'react';
import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';

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
