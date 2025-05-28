
import { create } from 'zustand';
import { Product, Customer, Order, Category, Brand } from '@/types';

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

interface InventoryItem {
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  lastRestocked: string;
}

interface OrderStatusUpdate {
  orderId: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
  updatedAt: string;
}

interface NotificationSettings {
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  customerSignups: boolean;
  reviewNotifications: boolean;
  emailReports: boolean;
}

interface AdminState {
  // Dashboard Stats
  stats: AdminStats;
  salesData: Array<{ date: string; revenue: number; orders: number }>;
  topProducts: Product[];
  recentOrders: Order[];
  
  // Inventory Management
  inventory: InventoryItem[];
  lowStockAlerts: InventoryItem[];
  
  // Order Management
  orderUpdates: OrderStatusUpdate[];
  
  // Customer Analytics
  customerSegments: Array<{
    segment: string;
    count: number;
    value: number;
  }>;
  
  // Settings
  notificationSettings: NotificationSettings;
  
  // Marketing
  activeCampaigns: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    startDate: string;
    endDate: string;
  }>;
  
  // Actions
  updateStats: (stats: AdminStats) => void;
  updateSalesData: (data: Array<{ date: string; revenue: number; orders: number }>) => void;
  updateInventory: (inventory: InventoryItem[]) => void;
  updateOrderStatus: (update: OrderStatusUpdate) => void;
  addLowStockAlert: (item: InventoryItem) => void;
  removeLowStockAlert: (productId: string) => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
  addCampaign: (campaign: any) => void;
  updateCampaign: (id: string, updates: any) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: {
    totalRevenue: 48574,
    totalOrders: 3652,
    totalCustomers: 12938,
    totalProducts: 456,
    revenueGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 5.3,
    productsGrowth: 3.1,
  },
  
  salesData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 5000) + 1000,
    orders: Math.floor(Math.random() * 100) + 20,
  })).reverse(),
  
  topProducts: [],
  recentOrders: [],
  inventory: [
    {
      productId: 'P001',
      productName: 'Wireless Bluetooth Headphones',
      currentStock: 15,
      lowStockThreshold: 20,
      isLowStock: true,
      lastRestocked: '2024-01-15'
    },
    {
      productId: 'P002',
      productName: 'Smartphone Case',
      currentStock: 8,
      lowStockThreshold: 10,
      isLowStock: true,
      lastRestocked: '2024-01-10'
    }
  ],
  lowStockAlerts: [
    {
      productId: 'P001',
      productName: 'Wireless Bluetooth Headphones',
      currentStock: 15,
      lowStockThreshold: 20,
      isLowStock: true,
      lastRestocked: '2024-01-15'
    },
    {
      productId: 'P002',
      productName: 'Smartphone Case',
      currentStock: 8,
      lowStockThreshold: 10,
      isLowStock: true,
      lastRestocked: '2024-01-10'
    }
  ],
  orderUpdates: [],
  customerSegments: [
    { segment: 'New Customers', count: 2450, value: 45000 },
    { segment: 'Returning Customers', count: 7890, value: 156000 },
    { segment: 'VIP Customers', count: 598, value: 89000 },
  ],
  
  notificationSettings: {
    orderNotifications: true,
    lowStockAlerts: true,
    customerSignups: false,
    reviewNotifications: true,
    emailReports: true
  },
  
  activeCampaigns: [
    {
      id: '1',
      name: 'Summer Sale',
      type: 'Discount Campaign',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2024-08-31'
    },
    {
      id: '2',
      name: 'New Customer Welcome',
      type: 'Email Campaign',
      status: 'Draft',
      startDate: '2024-07-01',
      endDate: '2024-12-31'
    }
  ],
  
  updateStats: (stats) => set({ stats }),
  updateSalesData: (salesData) => set({ salesData }),
  updateInventory: (inventory) => {
    const lowStockAlerts = inventory.filter(item => item.isLowStock);
    set({ inventory, lowStockAlerts });
  },
  updateOrderStatus: (update) => set(state => ({
    orderUpdates: [update, ...state.orderUpdates]
  })),
  addLowStockAlert: (item) => set(state => ({
    lowStockAlerts: [...state.lowStockAlerts, item]
  })),
  removeLowStockAlert: (productId) => set(state => ({
    lowStockAlerts: state.lowStockAlerts.filter(item => item.productId !== productId)
  })),
  updateNotificationSettings: (notificationSettings) => set({ notificationSettings }),
  addCampaign: (campaign) => set(state => ({
    activeCampaigns: [...state.activeCampaigns, campaign]
  })),
  updateCampaign: (id, updates) => set(state => ({
    activeCampaigns: state.activeCampaigns.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    )
  })),
}));
