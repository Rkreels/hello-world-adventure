import React from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import LowStockAlerts from '@/components/admin/dashboard/LowStockAlerts';
import { toast } from 'sonner';

const Dashboard = () => {
  const handleStatsAction = (type: string) => {
    toast.info(`Viewing detailed ${type} analytics`);
  };

  const handleRefreshStats = (type: string) => {
    toast.success(`${type} data refreshed successfully`);
  };

  const statsData = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: { value: '+12.5%', positive: true },
      icon: <DollarSign className="h-6 w-6 text-white" />,
      colorClass: 'bg-green-500',
      onView: () => handleStatsAction('revenue'),
      onRefresh: () => handleRefreshStats('Revenue')
    },
    {
      title: 'Total Orders',
      value: '1,429',
      change: { value: '+8.2%', positive: true },
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      colorClass: 'bg-blue-500',
      onView: () => handleStatsAction('orders'),
      onRefresh: () => handleRefreshStats('Orders')
    },
    {
      title: 'Total Customers',
      value: '892',
      change: { value: '+15.1%', positive: true },
      icon: <Users className="h-6 w-6 text-white" />,
      colorClass: 'bg-purple-500',
      onView: () => handleStatsAction('customers'),
      onRefresh: () => handleRefreshStats('Customers')
    },
    {
      title: 'Active Products',
      value: '256',
      change: { value: '-2.1%', positive: false },
      icon: <Package className="h-6 w-6 text-white" />,
      colorClass: 'bg-orange-500',
      onView: () => handleStatsAction('products'),
      onRefresh: () => handleRefreshStats('Products')
    }
  ];

  const recentOrders = [
    {
      id: '12345',
      customer: 'John Doe',
      amount: '125.99',
      date: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      amount: '89.50',
      date: '4 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: '12347',
      customer: 'Mike Johnson',
      amount: '200.00',
      date: '6 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const topProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '99.99',
      growth: '+15%',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Wearables',
      price: '299.99',
      growth: '+22%',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'
    },
    {
      id: 3,
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '49.99',
      growth: '+8%',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-testid="stats-cards">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2" data-testid="sales-chart">
          <SalesChart />
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <RecentOrders orders={recentOrders} />
        
        {/* Low Stock Alerts */}
        <LowStockAlerts />
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopSellingProducts products={topProducts} />
        </div>
        
        {/* Additional space for future widgets */}
        <div className="hidden lg:block">
          {/* Placeholder for future dashboard widgets */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
