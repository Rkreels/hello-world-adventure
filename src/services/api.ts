
import { mockData } from '@/data/mockData';
import type { 
  Product, 
  Order, 
  Customer, 
  Transaction, 
  Category, 
  Brand,
  ApiResponse,
  PaginationParams,
  DashboardStats,
  SalesData,
  TopProduct
} from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const api = {
  // Products
  async getProducts(params?: PaginationParams): Promise<ApiResponse<Product[]>> {
    await delay(500);
    return {
      data: mockData.products,
      success: true,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockData.products.length,
        totalPages: Math.ceil(mockData.products.length / (params?.limit || 10))
      }
    };
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    await delay(300);
    const product = mockData.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { data: product, success: true };
  },

  async createProduct(productData: Partial<Product>): Promise<ApiResponse<Product>> {
    await delay(800);
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productData.name || '',
      description: productData.description || '',
      price: productData.price || 0,
      images: productData.images || ['/placeholder.svg'],
      category: productData.category || '',
      sku: productData.sku || `SKU-${Date.now()}`,
      stock: productData.stock || 0,
      rating: 0,
      reviews: 0,
      tags: productData.tags || [],
      isActive: productData.isActive !== false,
      isFeatured: productData.isFeatured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockData.products.push(newProduct);
    return { data: newProduct, success: true };
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    await delay(600);
    const index = mockData.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    mockData.products[index] = { ...mockData.products[index], ...productData, updatedAt: new Date().toISOString() };
    return { data: mockData.products[index], success: true };
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    await delay(400);
    const index = mockData.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    mockData.products.splice(index, 1);
    return { data: undefined, success: true };
  },

  // Orders
  async getOrders(params?: PaginationParams): Promise<ApiResponse<Order[]>> {
    await delay(500);
    return {
      data: mockData.orders,
      success: true,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockData.orders.length,
        totalPages: Math.ceil(mockData.orders.length / (params?.limit || 10))
      }
    };
  },

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    await delay(300);
    const order = mockData.orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return { data: order, success: true };
  },

  // Customers
  async getCustomers(params?: PaginationParams): Promise<ApiResponse<Customer[]>> {
    await delay(500);
    return {
      data: mockData.customers,
      success: true,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockData.customers.length,
        totalPages: Math.ceil(mockData.customers.length / (params?.limit || 10))
      }
    };
  },

  // Transactions
  async getTransactions(params?: PaginationParams): Promise<ApiResponse<Transaction[]>> {
    await delay(500);
    return {
      data: mockData.transactions,
      success: true,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockData.transactions.length,
        totalPages: Math.ceil(mockData.transactions.length / (params?.limit || 10))
      }
    };
  },

  // Categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await delay(300);
    return { data: mockData.categories, success: true };
  },

  // Brands
  async getBrands(): Promise<ApiResponse<Brand[]>> {
    await delay(300);
    return { data: mockData.brands, success: true };
  },

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(400);
    return { data: mockData.dashboardStats, success: true };
  },

  async getSalesData(): Promise<ApiResponse<SalesData[]>> {
    await delay(400);
    return { data: mockData.salesData, success: true };
  },

  async getTopProducts(): Promise<ApiResponse<TopProduct[]>> {
    await delay(400);
    return { data: mockData.topProducts, success: true };
  }
};
