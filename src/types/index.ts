
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  oldPrice?: number; // Alias for originalPrice
  discountPrice?: number;
  discountedPrice?: number; // Alias for discountPrice
  images: string[];
  image?: string; // Single image alias
  category: string;
  categoryId?: string; // Alternative category reference
  subcategory?: string;
  brand?: string;
  sku: string;
  stock: number;
  isUnlimited?: boolean;
  rating: number;
  reviews: number;
  reviewCount?: number; // Alias for reviews
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isNew?: boolean; // New product indicator
  featured?: boolean; // Alias for isFeatured
  status?: 'active' | 'inactive' | 'draft';
  taxIncluded?: boolean;
  discount?: number; // Discount percentage
  // Physical attributes
  weight?: number;
  dimensions?: string;
  material?: string;
  // Variants and options
  colors?: string[];
  sizes?: string[];
  style?: string;
  pattern?: string;
  occasion?: string;
  season?: string;
  ageGroup?: string;
  gender?: string;
  // Care and warranty
  careInstructions?: string;
  warranty?: string;
  variants?: Array<{
    name: string;
    price?: number;
    stock?: number;
    sku?: string;
    attributes: Record<string, string>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  status?: 'active' | 'inactive';
  sortOrder: number;
  products?: number; // Product count
  productCount?: number; // Alias for products
  createdAt: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  lastLogin?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash';
  transactionId?: string;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: string;
}
