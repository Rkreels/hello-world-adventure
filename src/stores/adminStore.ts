
import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image?: string;
  description?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  products: number;
}

interface Order {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items?: string[];
  trackingNumber?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

interface InventoryItem {
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  lastRestocked: string;
}

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  usage: number;
  maxUsage: number;
  status: 'active' | 'inactive' | 'expired';
  expiryDate: string;
}

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface LowStockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

interface CustomerSegment {
  name: string;
  count: number;
  percentage: number;
}

interface AdminStore {
  // Stats
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    revenueGrowth: number;
    ordersGrowth: number;
    customersGrowth: number;
    productsGrowth: number;
  };

  // Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  inventory: InventoryItem[];
  coupons: Coupon[];
  salesData: SalesData[];
  lowStockAlerts: LowStockAlert[];
  customerSegments: CustomerSegment[];

  // Loading states
  isLoading: boolean;
  
  // Actions
  updateStats: (stats: Partial<AdminStore['stats']>) => void;
  
  // Product actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  
  // Order actions
  updateOrderStatus: (id: string, status: Order['status'], trackingNumber?: string) => void;
  
  // Customer actions
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  
  // Inventory actions
  updateInventory: (inventory: InventoryItem[]) => void;
  restockProduct: (productId: string, quantity: number) => void;
  removeLowStockAlert: (productId: string) => void;
  
  // Coupon actions
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  
  // Initialize data
  initializeData: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  stats: {
    totalRevenue: 48574,
    totalOrders: 3652,
    totalCustomers: 2450,
    totalProducts: 156,
    revenueGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 5.3,
    productsGrowth: 3.1,
  },

  products: [],
  categories: [],
  orders: [],
  customers: [],
  inventory: [],
  coupons: [],
  salesData: [],
  lowStockAlerts: [],
  customerSegments: [],
  isLoading: false,

  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Date.now().toString() },
      ],
    })),

  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...product } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [
        ...state.categories,
        { ...category, id: Math.max(0, ...state.categories.map(c => c.id)) + 1 },
      ],
    })),

  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...category } : c
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),

  updateOrderStatus: (id, status, trackingNumber) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? { ...order, status, ...(trackingNumber && { trackingNumber }) }
          : order
      ),
    })),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        ...state.customers,
        { ...customer, id: Date.now().toString() },
      ],
    })),

  updateCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...customer } : c
      ),
    })),

  updateInventory: (inventory) =>
    set({ inventory }),

  restockProduct: (productId, quantity) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.productId === productId
          ? {
              ...item,
              currentStock: item.currentStock + quantity,
              isLowStock: item.currentStock + quantity <= item.lowStockThreshold,
              lastRestocked: new Date().toISOString().split('T')[0],
            }
          : item
      ),
      lowStockAlerts: state.lowStockAlerts.filter((alert) => alert.productId !== productId),
    })),

  removeLowStockAlert: (productId) =>
    set((state) => ({
      lowStockAlerts: state.lowStockAlerts.filter((alert) => alert.productId !== productId),
    })),

  addCoupon: (coupon) =>
    set((state) => ({
      coupons: [
        ...state.coupons,
        { ...coupon, id: Date.now().toString() },
      ],
    })),

  updateCoupon: (id, coupon) =>
    set((state) => ({
      coupons: state.coupons.map((c) =>
        c.id === id ? { ...c, ...coupon } : c
      ),
    })),

  deleteCoupon: (id) =>
    set((state) => ({
      coupons: state.coupons.filter((c) => c.id !== id),
    })),

  initializeData: () => {
    const mockProducts: Product[] = [
      {
        id: 'P001',
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: 49.99,
        stock: 120,
        status: 'active',
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
      },
      {
        id: 'P002',
        name: "Men's T-Shirt",
        category: 'Fashion',
        price: 14.99,
        stock: 250,
        status: 'active',
        description: 'Comfortable cotton t-shirt in various colors',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'
      },
      {
        id: 'P003',
        name: "Men's Leather Wallet",
        category: 'Fashion',
        price: 29.99,
        stock: 85,
        status: 'active',
        description: 'Genuine leather wallet with RFID protection',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300'
      },
      {
        id: 'P004',
        name: 'Memory Foam Pillow',
        category: 'Home',
        price: 39.99,
        stock: 60,
        status: 'active',
        description: 'Ergonomic memory foam pillow for better sleep',
        image: 'https://images.unsplash.com/photo-1584269600519-112e9b721d17?w=300'
      },
    ];

    const mockCategories: Category[] = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=300&auto=format&fit=crop',
        createdAt: '2025-01-15',
        products: 56
      },
      {
        id: 2,
        name: 'Fashion',
        description: 'Clothing and accessories',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=300&auto=format&fit=crop',
        createdAt: '2025-01-18',
        products: 124
      },
      {
        id: 3,
        name: 'Home & Kitchen',
        description: 'Furniture and kitchen appliances',
        image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?q=80&w=300&auto=format&fit=crop',
        createdAt: '2025-01-20',
        products: 89
      },
    ];

    const mockOrders: Order[] = [
      {
        id: '1001',
        customer: 'John Doe',
        amount: '120.50',
        date: 'Apr 21, 2025',
        status: 'Delivered',
        items: ['Wireless Headphones', 'Phone Case']
      },
      {
        id: '1002',
        customer: 'Jane Smith',
        amount: '85.20',
        date: 'Apr 20, 2025',
        status: 'Processing',
        items: ['T-Shirt', 'Jeans']
      },
      {
        id: '1003',
        customer: 'Robert Johnson',
        amount: '220.00',
        date: 'Apr 20, 2025',
        status: 'Pending',
        items: ['Laptop Stand', 'Keyboard']
      },
    ];

    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234-567-8901',
        address: '123 Main St, City, State 12345',
        registeredAt: '2024-12-01',
        totalOrders: 5,
        totalSpent: 450.25,
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234-567-8902',
        address: '456 Oak Ave, City, State 12346',
        registeredAt: '2024-11-15',
        totalOrders: 3,
        totalSpent: 275.80,
        status: 'active'
      },
    ];

    const mockCoupons: Coupon[] = [
      {
        id: '1',
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrder: 50,
        usage: 125,
        maxUsage: 1000,
        status: 'active',
        expiryDate: '2024-12-31'
      },
      {
        id: '2',
        code: 'SAVE20',
        type: 'fixed',
        value: 20,
        minOrder: 100,
        usage: 45,
        maxUsage: 500,
        status: 'active',
        expiryDate: '2024-06-30'
      },
    ];

    const mockSalesData: SalesData[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
    }));

    const mockLowStockAlerts: LowStockAlert[] = [
      {
        productId: 'P001',
        productName: 'Wireless Bluetooth Headphones',
        currentStock: 5,
        lowStockThreshold: 10,
      },
      {
        productId: 'P004',
        productName: 'Memory Foam Pillow',
        currentStock: 3,
        lowStockThreshold: 5,
      },
    ];

    const mockCustomerSegments: CustomerSegment[] = [
      { name: 'New Customers', count: 450, percentage: 35 },
      { name: 'Regular Customers', count: 580, percentage: 45 },
      { name: 'VIP Customers', count: 195, percentage: 15 },
      { name: 'Inactive Customers', percentage: 5, count: 65 },
    ];

    set({
      products: mockProducts,
      categories: mockCategories,
      orders: mockOrders,
      customers: mockCustomers,
      coupons: mockCoupons,
      salesData: mockSalesData,
      lowStockAlerts: mockLowStockAlerts,
      customerSegments: mockCustomerSegments,
    });
  },
}));
