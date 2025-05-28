
import React, { useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import LowStockAlerts from '@/components/admin/dashboard/LowStockAlerts';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import { useAdminStore } from '@/stores/adminStore';

const Dashboard = () => {
  const { stats, initializeData } = useAdminStore();

  useEffect(() => {
    // Initialize mock data when component mounts
    initializeData();
  }, [initializeData]);
  
  // Sample data for recent orders and top products
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="stats-cards">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={{ value: `${stats.revenueGrowth}%`, positive: stats.revenueGrowth > 0 }}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          colorClass="bg-green-500 text-white"
        />
        
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={{ value: `${stats.ordersGrowth}%`, positive: stats.ordersGrowth > 0 }}
          icon={<ShoppingBag className="h-6 w-6 text-white" />}
          colorClass="bg-blue-500 text-white"
        />
        
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={{ value: `${stats.customersGrowth}%`, positive: stats.customersGrowth > 0 }}
          icon={<Users className="h-6 w-6 text-white" />}
          colorClass="bg-purple-500 text-white"
        />
        
        <StatsCard
          title="Active Products"
          value={stats.totalProducts.toString()}
          change={{ value: `${stats.productsGrowth}%`, positive: stats.productsGrowth > 0 }}
          icon={<Activity className="h-6 w-6 text-white" />}
          colorClass="bg-orange-500 text-white"
        />
      </div>
      
      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div data-testid="sales-chart">
          <SalesChart />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div data-testid="low-stock-alerts">
            <LowStockAlerts />
          </div>
          <div data-testid="quick-actions">
            <QuickActions />
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} />
        <TopSellingProducts products={topProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
