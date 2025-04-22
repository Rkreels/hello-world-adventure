
import { currentUser, categories, products, customers, orders, transactions, dashboardData } from '../data/mockData';

// Simulate API requests with mock data
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth
  getCurrentUser: async () => {
    await delay(500);
    return { data: currentUser };
  },
  
  // Products
  getProducts: async () => {
    await delay(700);
    return { data: products };
  },
  
  getProduct: async (id: string) => {
    await delay(500);
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return { data: product };
  },
  
  createProduct: async (productData: Partial<any>) => {
    await delay(1000);
    return { 
      data: { 
        id: `p${products.length + 1}`,
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } 
    };
  },
  
  updateProduct: async (id: string, productData: Partial<any>) => {
    await delay(800);
    return { 
      data: { 
        ...products.find(p => p.id === id),
        ...productData,
        updatedAt: new Date().toISOString(),
      } 
    };
  },
  
  deleteProduct: async (id: string) => {
    await delay(600);
    return { success: true };
  },
  
  // Categories
  getCategories: async () => {
    await delay(500);
    return { data: categories };
  },
  
  // Customers
  getCustomers: async () => {
    await delay(600);
    return { data: customers };
  },
  
  getCustomer: async (id: string) => {
    await delay(500);
    const customer = customers.find(c => c.id === id);
    if (!customer) throw new Error('Customer not found');
    return { data: customer };
  },
  
  // Orders
  getOrders: async () => {
    await delay(700);
    return { data: orders };
  },
  
  getOrder: async (id: string) => {
    await delay(500);
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return { data: order };
  },
  
  // Transactions
  getTransactions: async () => {
    await delay(600);
    return { data: transactions };
  },
  
  // Dashboard
  getDashboardData: async () => {
    await delay(800);
    return { data: dashboardData };
  },
};
