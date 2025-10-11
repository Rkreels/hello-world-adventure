import React, { useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import LowStockAlerts from '@/components/admin/dashboard/LowStockAlerts';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, orders, products, initializeData } = useAdminStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleStatsAction = (type: string, route: string) => {
    navigate(route);
    toast.info(`Viewing detailed ${type} analytics`);
  };

  const handleRefreshStats = (type: string) => {
    toast.success(`${type} data refreshed successfully`);
  };

  const statsData = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: { value: `+${stats.revenueGrowth}%`, positive: stats.revenueGrowth > 0 },
      icon: <DollarSign className="h-6 w-6 text-white" />,
      colorClass: 'bg-green-500',
      onView: () => handleStatsAction('revenue', '/admin/reports'),
      onRefresh: () => handleRefreshStats('Revenue')
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: { value: `+${stats.ordersGrowth}%`, positive: stats.ordersGrowth > 0 },
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      colorClass: 'bg-blue-500',
      onView: () => handleStatsAction('orders', '/admin/orders'),
      onRefresh: () => handleRefreshStats('Orders')
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      change: { value: `+${stats.customersGrowth}%`, positive: stats.customersGrowth > 0 },
      icon: <Users className="h-6 w-6 text-white" />,
      colorClass: 'bg-purple-500',
      onView: () => handleStatsAction('customers', '/admin/customer-management'),
      onRefresh: () => handleRefreshStats('Customers')
    },
    {
      title: 'Active Products',
      value: stats.totalProducts.toLocaleString(),
      change: { value: `${stats.productsGrowth > 0 ? '+' : ''}${stats.productsGrowth}%`, positive: stats.productsGrowth > 0 },
      icon: <Package className="h-6 w-6 text-white" />,
      colorClass: 'bg-orange-500',
      onView: () => handleStatsAction('products', '/admin/products'),
      onRefresh: () => handleRefreshStats('Products')
    }
  ];

  const recentOrders = orders.slice(0, 3).map(order => ({
    id: order.id,
    customer: order.customer,
    amount: order.amount,
    date: order.date,
    avatar: `https://i.pravatar.cc/150?u=${order.id}`
  }));

  const topProducts = products.slice(0, 3).map((product, index) => ({
    id: parseInt(product.id.replace('P', '')),
    name: product.name,
    category: product.category,
    price: product.price.toString(),
    growth: `+${12 + index * 5}%`,
    image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
  }));

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
