export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'admin' | 'customer' | 'manager';
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountedPrice?: number; // Added for compatibility
  images: string[];
  category: string;
  categoryId?: string | number; // Added this field
  categoryName?: string;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isUnlimited?: boolean;
  isFeatured?: boolean;
  featured?: boolean; // Added this field
  taxIncluded?: boolean;
  expirationStart?: string;
  expirationEnd?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  colors?: string[];
  rating?: number;
  ratings?: number;
  reviewCount?: number;
  status?: 'active' | 'inactive' | 'draft';
}

export interface Category {
  id: string;
  name: string;
  description?: string; // Added this field
  icon: string;
  image?: string; // Added this field
  productCount: number;
  products?: number; // Added for compatibility
  status?: 'active' | 'inactive'; // Added this field
  createdAt?: string; // Added this field
}

export interface Brand {
  id: number | string;
  name: string;
  products: number;
  featured: boolean;
  logo: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  status: 'Active' | 'Inactive' | 'VIP';
  orders: number;
  totalSpend: number;
  registrationDate: string;
  lastPurchase?: string;
  socialMedia?: string[];
}

export interface Order {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  date: string;
  products: OrderProduct[];
  total: number;
  status: 'Pending' | 'Completed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  paymentMethod: 'CC' | 'PayPal' | 'Bank' | 'Other';
}

export interface OrderProduct {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Complete' | 'Pending' | 'Canceled';
  method: string;
}

export interface Dashboard {
  totalSales: {
    value: number;
    percentage: number;
    previous: number;
  };
  totalOrders: {
    value: number;
    percentage: number;
    previous: number;
  };
  pendingOrders: number;
  canceledOrders: number;
  customerStats: {
    total: number;
    active: number;
    repeat: number;
    visitors: number;
    conversionRate: number;
  };
  topProducts: Product[];
  recentTransactions: Transaction[];
  bestSelling: {
    product: string;
    orders: number;
    status: string;
    price: number;
    image?: string;
  }[];
  salesByCountry: {
    country: string;
    value: number;
    percentage: number;
  }[];
}
