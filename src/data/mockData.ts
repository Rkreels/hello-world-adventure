
import { 
  Product, 
  Order, 
  Customer, 
  Transaction, 
  Category, 
  Brand,
  DashboardStats,
  SalesData,
  TopProduct
} from '@/types';

export const mockData = {
  products: [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 79.99,
      originalPrice: 99.99,
      discountPrice: 69.99,
      discountedPrice: 69.99,
      images: ['/placeholder.svg'],
      category: 'Electronics',
      categoryId: 'electronics',
      brand: 'TechSound',
      sku: 'WBH-001',
      stock: 25,
      isUnlimited: false,
      rating: 4.5,
      reviews: 128,
      reviewCount: 128,
      tags: ['wireless', 'bluetooth', 'headphones'],
      isActive: true,
      isFeatured: true,
      featured: true,
      status: 'active' as const,
      taxIncluded: true,
      weight: 0.3,
      dimensions: '18 x 16 x 8 cm',
      material: 'Plastic, Metal',
      colors: ['black', 'white', 'blue'],
      sizes: ['One Size'],
      style: 'Modern',
      pattern: 'Solid',
      occasion: 'Daily Use',
      season: 'All Season',
      ageGroup: 'Adult',
      gender: 'Unisex',
      careInstructions: 'Clean with dry cloth',
      warranty: '1 year manufacturer warranty',
      variants: [],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor',
      price: 199.99,
      originalPrice: 249.99,
      discountPrice: 179.99,
      discountedPrice: 179.99,
      images: ['/placeholder.svg'],
      category: 'Electronics',
      categoryId: 'electronics',
      brand: 'FitTech',
      sku: 'SFW-002',
      stock: 15,
      isUnlimited: false,
      rating: 4.8,
      reviews: 256,
      reviewCount: 256,
      tags: ['smartwatch', 'fitness', 'health'],
      isActive: true,
      isFeatured: true,
      featured: true,
      status: 'active' as const,
      taxIncluded: true,
      weight: 0.05,
      dimensions: '4.5 x 3.8 x 1.2 cm',
      material: 'Aluminum, Silicone',
      colors: ['black', 'silver', 'gold'],
      sizes: ['S', 'M', 'L'],
      style: 'Sport',
      pattern: 'Solid',
      occasion: 'Sports',
      season: 'All Season',
      ageGroup: 'Adult',
      gender: 'Unisex',
      careInstructions: 'Water resistant, clean with damp cloth',
      warranty: '2 year manufacturer warranty',
      variants: [
        {
          name: 'Color: Black',
          price: 179.99,
          stock: 5,
          sku: 'SFW-002-BLK',
          attributes: { color: 'black', size: 'M' }
        }
      ],
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z'
    }
  ] as Product[],

  orders: [
    {
      id: '1',
      userId: '1',
      items: [{
        id: '1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        productImage: '/placeholder.svg',
        quantity: 1,
        price: 79.99,
        total: 79.99
      }],
      total: 89.98,
      subtotal: 79.99,
      tax: 7.99,
      shipping: 2.00,
      status: 'delivered' as const,
      paymentStatus: 'paid' as const,
      paymentMethod: 'credit_card',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z'
    }
  ] as Order[],

  customers: [
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      addresses: [{
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }],
      totalOrders: 5,
      totalSpent: 450.00,
      status: 'active' as const,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ] as Customer[],

  transactions: [
    {
      id: '1',
      orderId: '1',
      amount: 89.98,
      type: 'payment' as const,
      status: 'completed' as const,
      paymentMethod: 'credit_card' as const,
      createdAt: '2024-01-15T00:00:00Z'
    }
  ] as Transaction[],

  categories: [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      isActive: true,
      status: 'active' as const,
      sortOrder: 1,
      products: 2,
      productCount: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Clothing and accessories',
      isActive: true,
      status: 'active' as const,
      sortOrder: 2,
      products: 0,
      productCount: 0,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ] as Category[],

  brands: [
    {
      id: '1',
      name: 'TechCorp',
      description: 'Leading technology brand',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ] as Brand[],

  dashboardStats: {
    totalRevenue: 125420.50,
    totalOrders: 1247,
    totalCustomers: 8934,
    totalProducts: 456,
    revenueGrowth: 15.2,
    ordersGrowth: 8.7,
    customersGrowth: 12.1,
    productsGrowth: 3.4
  } as DashboardStats,

  salesData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 5000) + 1000,
    orders: Math.floor(Math.random() * 50) + 10
  })) as SalesData[],

  topProducts: [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      sales: 245,
      revenue: 19599.55,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      sales: 189,
      revenue: 37798.11,
      image: '/placeholder.svg'
    }
  ] as TopProduct[]
};
