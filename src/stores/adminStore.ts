
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
  email: string;
  amount: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: { name: string; qty: number; price: number }[];
  trackingNumber?: string;
  shippingAddress: string;
  paymentMethod: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  avatar: string;
  lastPurchase: string;
}

interface InventoryItem {
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  lastRestocked: string;
  sku: string;
  warehouse: string;
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

interface TransactionRecord {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  amount: string;
  method: string;
  status: 'Complete' | 'Pending' | 'Canceled' | 'Refunded';
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
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  inventory: InventoryItem[];
  coupons: Coupon[];
  transactions: TransactionRecord[];
  salesData: SalesData[];
  lowStockAlerts: LowStockAlert[];
  customerSegments: CustomerSegment[];
  isLoading: boolean;
  _initialized: boolean;

  updateStats: (stats: Partial<AdminStore['stats']>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: Order['status'], trackingNumber?: string) => void;
  deleteOrder: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  updateInventory: (inventory: InventoryItem[]) => void;
  restockProduct: (productId: string, quantity: number) => void;
  removeLowStockAlert: (productId: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  initializeData: () => void;
}

// ── 20 Realistic Products ──
const PRODUCTS: Product[] = [
  { id: 'P001', name: 'Sony WH-1000XM5 Headphones', category: 'Electronics', price: 349.99, stock: 45, status: 'active', description: 'Industry-leading noise canceling wireless headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300' },
  { id: 'P002', name: 'Apple MacBook Air M3', category: 'Electronics', price: 1099.00, stock: 22, status: 'active', description: '13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300' },
  { id: 'P003', name: 'Nike Air Max 270', category: 'Fashion', price: 150.00, stock: 180, status: 'active', description: 'Lifestyle running shoes with Max Air cushioning', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300' },
  { id: 'P004', name: 'Levi\'s 501 Original Jeans', category: 'Fashion', price: 69.50, stock: 320, status: 'active', description: 'The original straight fit jeans since 1873', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300' },
  { id: 'P005', name: 'KitchenAid Stand Mixer', category: 'Home & Kitchen', price: 449.99, stock: 35, status: 'active', description: '5-quart tilt-head stand mixer with 10 speeds', image: 'https://images.unsplash.com/photo-1594385208974-2f8bb07b21e5?w=300' },
  { id: 'P006', name: 'Dyson V15 Detect Vacuum', category: 'Home & Kitchen', price: 749.99, stock: 18, status: 'active', description: 'Laser-detect cordless vacuum with HEPA filtration', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300' },
  { id: 'P007', name: 'Samsung 65" OLED 4K TV', category: 'Electronics', price: 1799.99, stock: 12, status: 'active', description: '65-inch OLED 4K smart TV with quantum HDR', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300' },
  { id: 'P008', name: 'Adidas Ultraboost 22', category: 'Fashion', price: 190.00, stock: 95, status: 'active', description: 'Performance running shoes with Boost midsole', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300' },
  { id: 'P009', name: 'Instant Pot Duo 7-in-1', category: 'Home & Kitchen', price: 89.95, stock: 200, status: 'active', description: 'Electric pressure cooker, slow cooker, rice cooker', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300' },
  { id: 'P010', name: 'Apple AirPods Pro 2', category: 'Electronics', price: 249.00, stock: 150, status: 'active', description: 'Active noise cancellation with Adaptive Transparency', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300' },
  { id: 'P011', name: 'Yoga Mat Premium', category: 'Sports & Outdoors', price: 68.00, stock: 240, status: 'active', description: 'Extra thick eco-friendly TPE yoga mat, non-slip', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300' },
  { id: 'P012', name: 'Canon EOS R50 Camera', category: 'Electronics', price: 679.00, stock: 28, status: 'active', description: 'Mirrorless camera with 24.2MP APS-C sensor', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300' },
  { id: 'P013', name: 'North Face Puffer Jacket', category: 'Fashion', price: 229.00, stock: 75, status: 'active', description: '700-fill goose down insulated winter jacket', image: 'https://images.unsplash.com/photo-1544923246-77307dd270b1?w=300' },
  { id: 'P014', name: 'Breville Barista Express', category: 'Home & Kitchen', price: 699.95, stock: 8, status: 'active', description: 'Espresso machine with integrated grinder', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300' },
  { id: 'P015', name: 'Garmin Forerunner 265', category: 'Sports & Outdoors', price: 449.99, stock: 42, status: 'active', description: 'GPS running smartwatch with AMOLED display', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: 'P016', name: 'Herman Miller Aeron Chair', category: 'Home & Kitchen', price: 1395.00, stock: 5, status: 'active', description: 'Ergonomic office chair with PostureFit SL', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300' },
  { id: 'P017', name: 'Ray-Ban Aviator Sunglasses', category: 'Fashion', price: 163.00, stock: 130, status: 'active', description: 'Classic aviator with polarized G-15 lenses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300' },
  { id: 'P018', name: 'Bose SoundLink Flex', category: 'Electronics', price: 149.00, stock: 88, status: 'active', description: 'Portable Bluetooth speaker, waterproof IP67', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300' },
  { id: 'P019', name: 'Patagonia Better Sweater', category: 'Fashion', price: 139.00, stock: 0, status: 'inactive', description: 'Full-zip fleece jacket made with recycled polyester', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300' },
  { id: 'P020', name: 'Yeti Rambler 36oz Bottle', category: 'Sports & Outdoors', price: 50.00, stock: 310, status: 'active', description: 'Vacuum insulated stainless steel water bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300' },
];

// ── 8 Categories ──
const CATEGORIES: Category[] = [
  { id: 1, name: 'Electronics', description: 'Gadgets, devices and tech accessories', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300', createdAt: '2024-06-15', products: 7 },
  { id: 2, name: 'Fashion', description: 'Clothing, shoes and accessories', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300', createdAt: '2024-06-15', products: 6 },
  { id: 3, name: 'Home & Kitchen', description: 'Appliances, furniture and kitchen essentials', image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?w=300', createdAt: '2024-06-20', products: 5 },
  { id: 4, name: 'Sports & Outdoors', description: 'Fitness gear, outdoor equipment and sportswear', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c0e44?w=300', createdAt: '2024-07-01', products: 3 },
  { id: 5, name: 'Books', description: 'Fiction, non-fiction and educational books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300', createdAt: '2024-07-10', products: 0 },
  { id: 6, name: 'Beauty & Health', description: 'Skincare, haircare and wellness products', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300', createdAt: '2024-07-15', products: 0 },
  { id: 7, name: 'Automotive', description: 'Car accessories and maintenance products', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300', createdAt: '2024-08-01', products: 0 },
  { id: 8, name: 'Toys & Games', description: 'Children toys, board games and puzzles', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300', createdAt: '2024-08-15', products: 0 },
];

// ── 20 Realistic Orders ──
const ORDERS: Order[] = [
  { id: 'ORD-1001', customer: 'James Wilson', email: 'james.w@gmail.com', amount: '1,449.99', date: 'Feb 15, 2026', status: 'Delivered', items: [{ name: 'Apple MacBook Air M3', qty: 1, price: 1099 }, { name: 'Sony WH-1000XM5', qty: 1, price: 349.99 }], trackingNumber: 'TRK-9281746', shippingAddress: '142 Elm St, Brooklyn, NY 11201', paymentMethod: 'Credit Card' },
  { id: 'ORD-1002', customer: 'Emily Chen', email: 'emily.c@outlook.com', amount: '339.00', date: 'Feb 14, 2026', status: 'Shipped', items: [{ name: 'Nike Air Max 270', qty: 1, price: 150 }, { name: 'Adidas Ultraboost 22', qty: 1, price: 190 }], trackingNumber: 'TRK-8172635', shippingAddress: '88 Pine Ave, San Francisco, CA 94102', paymentMethod: 'PayPal' },
  { id: 'ORD-1003', customer: 'Michael Brown', email: 'mbrown@yahoo.com', amount: '749.99', date: 'Feb 14, 2026', status: 'Processing', items: [{ name: 'Dyson V15 Detect Vacuum', qty: 1, price: 749.99 }], shippingAddress: '2201 Lake Shore Dr, Chicago, IL 60614', paymentMethod: 'Credit Card' },
  { id: 'ORD-1004', customer: 'Sarah Davis', email: 'sarah.d@gmail.com', amount: '249.00', date: 'Feb 13, 2026', status: 'Delivered', items: [{ name: 'Apple AirPods Pro 2', qty: 1, price: 249 }], trackingNumber: 'TRK-7263541', shippingAddress: '567 Oak Blvd, Austin, TX 78701', paymentMethod: 'Apple Pay' },
  { id: 'ORD-1005', customer: 'Robert Taylor', email: 'r.taylor@hotmail.com', amount: '1,799.99', date: 'Feb 12, 2026', status: 'Delivered', items: [{ name: 'Samsung 65" OLED 4K TV', qty: 1, price: 1799.99 }], trackingNumber: 'TRK-6354281', shippingAddress: '890 Maple Rd, Seattle, WA 98101', paymentMethod: 'Credit Card' },
  { id: 'ORD-1006', customer: 'Jessica Martinez', email: 'jess.m@gmail.com', amount: '519.50', date: 'Feb 11, 2026', status: 'Pending', items: [{ name: 'KitchenAid Stand Mixer', qty: 1, price: 449.99 }, { name: 'Levi\'s 501 Original Jeans', qty: 1, price: 69.50 }], shippingAddress: '123 River St, Denver, CO 80202', paymentMethod: 'Debit Card' },
  { id: 'ORD-1007', customer: 'David Kim', email: 'dkim@protonmail.com', amount: '679.00', date: 'Feb 10, 2026', status: 'Shipped', items: [{ name: 'Canon EOS R50 Camera', qty: 1, price: 679 }], trackingNumber: 'TRK-5247193', shippingAddress: '456 Cherry Ln, Portland, OR 97201', paymentMethod: 'Credit Card' },
  { id: 'ORD-1008', customer: 'Amanda White', email: 'a.white@gmail.com', amount: '699.95', date: 'Feb 09, 2026', status: 'Delivered', items: [{ name: 'Breville Barista Express', qty: 1, price: 699.95 }], trackingNumber: 'TRK-4138276', shippingAddress: '789 Birch Ave, Miami, FL 33101', paymentMethod: 'PayPal' },
  { id: 'ORD-1009', customer: 'Chris Anderson', email: 'c.anderson@icloud.com', amount: '1,395.00', date: 'Feb 08, 2026', status: 'Processing', items: [{ name: 'Herman Miller Aeron Chair', qty: 1, price: 1395 }], shippingAddress: '321 Walnut Dr, Nashville, TN 37201', paymentMethod: 'Credit Card' },
  { id: 'ORD-1010', customer: 'Lisa Thompson', email: 'l.thompson@gmail.com', amount: '392.00', date: 'Feb 07, 2026', status: 'Delivered', items: [{ name: 'North Face Puffer Jacket', qty: 1, price: 229 }, { name: 'Ray-Ban Aviator Sunglasses', qty: 1, price: 163 }], trackingNumber: 'TRK-3029184', shippingAddress: '654 Spruce Ct, Boston, MA 02101', paymentMethod: 'Credit Card' },
  { id: 'ORD-1011', customer: 'Mark Garcia', email: 'mgarcia@gmail.com', amount: '449.99', date: 'Feb 06, 2026', status: 'Shipped', items: [{ name: 'Garmin Forerunner 265', qty: 1, price: 449.99 }], trackingNumber: 'TRK-2918374', shippingAddress: '987 Aspen Way, Phoenix, AZ 85001', paymentMethod: 'Apple Pay' },
  { id: 'ORD-1012', customer: 'Rachel Lee', email: 'rachel.lee@outlook.com', amount: '89.95', date: 'Feb 05, 2026', status: 'Delivered', items: [{ name: 'Instant Pot Duo 7-in-1', qty: 1, price: 89.95 }], trackingNumber: 'TRK-1827365', shippingAddress: '246 Cypress Blvd, Atlanta, GA 30301', paymentMethod: 'Debit Card' },
  { id: 'ORD-1013', customer: 'Kevin Robinson', email: 'k.robinson@yahoo.com', amount: '349.99', date: 'Feb 04, 2026', status: 'Cancelled', items: [{ name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 349.99 }], shippingAddress: '135 Magnolia St, Dallas, TX 75201', paymentMethod: 'Credit Card' },
  { id: 'ORD-1014', customer: 'Nina Patel', email: 'nina.p@gmail.com', amount: '218.00', date: 'Feb 03, 2026', status: 'Delivered', items: [{ name: 'Yoga Mat Premium', qty: 1, price: 68 }, { name: 'Bose SoundLink Flex', qty: 1, price: 149 }], trackingNumber: 'TRK-0918273', shippingAddress: '579 Lavender Ln, San Diego, CA 92101', paymentMethod: 'PayPal' },
  { id: 'ORD-1015', customer: 'Thomas Clark', email: 't.clark@hotmail.com', amount: '150.00', date: 'Feb 02, 2026', status: 'Pending', items: [{ name: 'Yeti Rambler 36oz Bottle', qty: 2, price: 50 }, { name: 'Yoga Mat Premium', qty: 1, price: 68 }], shippingAddress: '864 Redwood Ave, Minneapolis, MN 55401', paymentMethod: 'Credit Card' },
  { id: 'ORD-1016', customer: 'Olivia Harris', email: 'olivia.h@gmail.com', amount: '1,099.00', date: 'Feb 01, 2026', status: 'Delivered', items: [{ name: 'Apple MacBook Air M3', qty: 1, price: 1099 }], trackingNumber: 'TRK-8765432', shippingAddress: '753 Palm Dr, Las Vegas, NV 89101', paymentMethod: 'Apple Pay' },
  { id: 'ORD-1017', customer: 'Daniel Wright', email: 'd.wright@protonmail.com', amount: '498.99', date: 'Jan 30, 2026', status: 'Shipped', items: [{ name: 'Sony WH-1000XM5', qty: 1, price: 349.99 }, { name: 'Bose SoundLink Flex', qty: 1, price: 149 }], trackingNumber: 'TRK-7654321', shippingAddress: '192 Sycamore St, Charlotte, NC 28201', paymentMethod: 'Credit Card' },
  { id: 'ORD-1018', customer: 'Sophia Young', email: 's.young@icloud.com', amount: '190.00', date: 'Jan 28, 2026', status: 'Delivered', items: [{ name: 'Adidas Ultraboost 22', qty: 1, price: 190 }], trackingNumber: 'TRK-6543210', shippingAddress: '428 Willow Way, San Antonio, TX 78201', paymentMethod: 'Debit Card' },
  { id: 'ORD-1019', customer: 'Andrew Scott', email: 'a.scott@gmail.com', amount: '139.00', date: 'Jan 26, 2026', status: 'Cancelled', items: [{ name: 'Patagonia Better Sweater', qty: 1, price: 139 }], shippingAddress: '617 Poplar Ct, Columbus, OH 43201', paymentMethod: 'PayPal' },
  { id: 'ORD-1020', customer: 'Megan Hall', email: 'm.hall@outlook.com', amount: '679.00', date: 'Jan 24, 2026', status: 'Delivered', items: [{ name: 'Canon EOS R50 Camera', qty: 1, price: 679 }], trackingNumber: 'TRK-5432109', shippingAddress: '381 Juniper Blvd, Raleigh, NC 27601', paymentMethod: 'Credit Card' },
];

// ── 20 Realistic Customers ──
const CUSTOMERS: Customer[] = [
  { id: 'C001', name: 'James Wilson', email: 'james.w@gmail.com', phone: '+1 (212) 555-0147', address: '142 Elm St, Brooklyn, NY 11201', registeredAt: '2024-03-15', totalOrders: 12, totalSpent: 4250.50, status: 'vip', avatar: 'https://i.pravatar.cc/150?u=c001', lastPurchase: '2026-02-15' },
  { id: 'C002', name: 'Emily Chen', email: 'emily.c@outlook.com', phone: '+1 (415) 555-0238', address: '88 Pine Ave, San Francisco, CA 94102', registeredAt: '2024-05-22', totalOrders: 8, totalSpent: 1890.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c002', lastPurchase: '2026-02-14' },
  { id: 'C003', name: 'Michael Brown', email: 'mbrown@yahoo.com', phone: '+1 (312) 555-0391', address: '2201 Lake Shore Dr, Chicago, IL 60614', registeredAt: '2024-01-10', totalOrders: 15, totalSpent: 6320.75, status: 'vip', avatar: 'https://i.pravatar.cc/150?u=c003', lastPurchase: '2026-02-14' },
  { id: 'C004', name: 'Sarah Davis', email: 'sarah.d@gmail.com', phone: '+1 (512) 555-0482', address: '567 Oak Blvd, Austin, TX 78701', registeredAt: '2024-06-08', totalOrders: 5, totalSpent: 875.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c004', lastPurchase: '2026-02-13' },
  { id: 'C005', name: 'Robert Taylor', email: 'r.taylor@hotmail.com', phone: '+1 (206) 555-0573', address: '890 Maple Rd, Seattle, WA 98101', registeredAt: '2024-02-28', totalOrders: 9, totalSpent: 3450.99, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c005', lastPurchase: '2026-02-12' },
  { id: 'C006', name: 'Jessica Martinez', email: 'jess.m@gmail.com', phone: '+1 (720) 555-0664', address: '123 River St, Denver, CO 80202', registeredAt: '2024-07-14', totalOrders: 3, totalSpent: 519.50, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c006', lastPurchase: '2026-02-11' },
  { id: 'C007', name: 'David Kim', email: 'dkim@protonmail.com', phone: '+1 (503) 555-0755', address: '456 Cherry Ln, Portland, OR 97201', registeredAt: '2024-04-03', totalOrders: 7, totalSpent: 2180.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c007', lastPurchase: '2026-02-10' },
  { id: 'C008', name: 'Amanda White', email: 'a.white@gmail.com', phone: '+1 (305) 555-0846', address: '789 Birch Ave, Miami, FL 33101', registeredAt: '2024-08-19', totalOrders: 4, totalSpent: 1249.90, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c008', lastPurchase: '2026-02-09' },
  { id: 'C009', name: 'Chris Anderson', email: 'c.anderson@icloud.com', phone: '+1 (615) 555-0937', address: '321 Walnut Dr, Nashville, TN 37201', registeredAt: '2024-09-25', totalOrders: 2, totalSpent: 1395.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c009', lastPurchase: '2026-02-08' },
  { id: 'C010', name: 'Lisa Thompson', email: 'l.thompson@gmail.com', phone: '+1 (617) 555-0128', address: '654 Spruce Ct, Boston, MA 02101', registeredAt: '2024-03-30', totalOrders: 11, totalSpent: 3875.25, status: 'vip', avatar: 'https://i.pravatar.cc/150?u=c010', lastPurchase: '2026-02-07' },
  { id: 'C011', name: 'Mark Garcia', email: 'mgarcia@gmail.com', phone: '+1 (602) 555-0219', address: '987 Aspen Way, Phoenix, AZ 85001', registeredAt: '2024-10-12', totalOrders: 6, totalSpent: 1650.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c011', lastPurchase: '2026-02-06' },
  { id: 'C012', name: 'Rachel Lee', email: 'rachel.lee@outlook.com', phone: '+1 (404) 555-0310', address: '246 Cypress Blvd, Atlanta, GA 30301', registeredAt: '2024-11-05', totalOrders: 3, totalSpent: 479.85, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c012', lastPurchase: '2026-02-05' },
  { id: 'C013', name: 'Kevin Robinson', email: 'k.robinson@yahoo.com', phone: '+1 (214) 555-0401', address: '135 Magnolia St, Dallas, TX 75201', registeredAt: '2024-05-18', totalOrders: 1, totalSpent: 0, status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=c013', lastPurchase: '2026-02-04' },
  { id: 'C014', name: 'Nina Patel', email: 'nina.p@gmail.com', phone: '+1 (619) 555-0592', address: '579 Lavender Ln, San Diego, CA 92101', registeredAt: '2024-06-22', totalOrders: 9, totalSpent: 2340.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c014', lastPurchase: '2026-02-03' },
  { id: 'C015', name: 'Thomas Clark', email: 't.clark@hotmail.com', phone: '+1 (612) 555-0683', address: '864 Redwood Ave, Minneapolis, MN 55401', registeredAt: '2024-07-30', totalOrders: 4, totalSpent: 720.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c015', lastPurchase: '2026-02-02' },
  { id: 'C016', name: 'Olivia Harris', email: 'olivia.h@gmail.com', phone: '+1 (702) 555-0774', address: '753 Palm Dr, Las Vegas, NV 89101', registeredAt: '2024-08-14', totalOrders: 6, totalSpent: 2198.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c016', lastPurchase: '2026-02-01' },
  { id: 'C017', name: 'Daniel Wright', email: 'd.wright@protonmail.com', phone: '+1 (704) 555-0865', address: '192 Sycamore St, Charlotte, NC 28201', registeredAt: '2024-09-06', totalOrders: 2, totalSpent: 498.99, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c017', lastPurchase: '2026-01-30' },
  { id: 'C018', name: 'Sophia Young', email: 's.young@icloud.com', phone: '+1 (210) 555-0956', address: '428 Willow Way, San Antonio, TX 78201', registeredAt: '2024-10-20', totalOrders: 3, totalSpent: 570.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c018', lastPurchase: '2026-01-28' },
  { id: 'C019', name: 'Andrew Scott', email: 'a.scott@gmail.com', phone: '+1 (614) 555-0147', address: '617 Poplar Ct, Columbus, OH 43201', registeredAt: '2024-11-15', totalOrders: 1, totalSpent: 0, status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=c019', lastPurchase: '2026-01-26' },
  { id: 'C020', name: 'Megan Hall', email: 'm.hall@outlook.com', phone: '+1 (919) 555-0238', address: '381 Juniper Blvd, Raleigh, NC 27601', registeredAt: '2024-12-01', totalOrders: 5, totalSpent: 1358.00, status: 'active', avatar: 'https://i.pravatar.cc/150?u=c020', lastPurchase: '2026-01-24' },
];

// ── 20 Transactions ──
const TRANSACTIONS: TransactionRecord[] = [
  { id: 'TXN-5001', orderId: 'ORD-1001', customerName: 'James Wilson', date: 'Feb 15, 2026', amount: '$1,449.99', method: 'Visa •••• 4242', status: 'Complete' },
  { id: 'TXN-5002', orderId: 'ORD-1002', customerName: 'Emily Chen', date: 'Feb 14, 2026', amount: '$339.00', method: 'PayPal', status: 'Complete' },
  { id: 'TXN-5003', orderId: 'ORD-1003', customerName: 'Michael Brown', date: 'Feb 14, 2026', amount: '$749.99', method: 'Visa •••• 8371', status: 'Pending' },
  { id: 'TXN-5004', orderId: 'ORD-1004', customerName: 'Sarah Davis', date: 'Feb 13, 2026', amount: '$249.00', method: 'Apple Pay', status: 'Complete' },
  { id: 'TXN-5005', orderId: 'ORD-1005', customerName: 'Robert Taylor', date: 'Feb 12, 2026', amount: '$1,799.99', method: 'Mastercard •••• 5555', status: 'Complete' },
  { id: 'TXN-5006', orderId: 'ORD-1006', customerName: 'Jessica Martinez', date: 'Feb 11, 2026', amount: '$519.50', method: 'Debit •••• 9012', status: 'Pending' },
  { id: 'TXN-5007', orderId: 'ORD-1007', customerName: 'David Kim', date: 'Feb 10, 2026', amount: '$679.00', method: 'Visa •••• 1234', status: 'Complete' },
  { id: 'TXN-5008', orderId: 'ORD-1008', customerName: 'Amanda White', date: 'Feb 09, 2026', amount: '$699.95', method: 'PayPal', status: 'Complete' },
  { id: 'TXN-5009', orderId: 'ORD-1009', customerName: 'Chris Anderson', date: 'Feb 08, 2026', amount: '$1,395.00', method: 'Visa •••• 6789', status: 'Pending' },
  { id: 'TXN-5010', orderId: 'ORD-1010', customerName: 'Lisa Thompson', date: 'Feb 07, 2026', amount: '$392.00', method: 'Mastercard •••• 3456', status: 'Complete' },
  { id: 'TXN-5011', orderId: 'ORD-1011', customerName: 'Mark Garcia', date: 'Feb 06, 2026', amount: '$449.99', method: 'Apple Pay', status: 'Complete' },
  { id: 'TXN-5012', orderId: 'ORD-1012', customerName: 'Rachel Lee', date: 'Feb 05, 2026', amount: '$89.95', method: 'Debit •••• 7890', status: 'Complete' },
  { id: 'TXN-5013', orderId: 'ORD-1013', customerName: 'Kevin Robinson', date: 'Feb 04, 2026', amount: '$349.99', method: 'Visa •••• 2468', status: 'Refunded' },
  { id: 'TXN-5014', orderId: 'ORD-1014', customerName: 'Nina Patel', date: 'Feb 03, 2026', amount: '$218.00', method: 'PayPal', status: 'Complete' },
  { id: 'TXN-5015', orderId: 'ORD-1015', customerName: 'Thomas Clark', date: 'Feb 02, 2026', amount: '$150.00', method: 'Visa •••• 1357', status: 'Pending' },
  { id: 'TXN-5016', orderId: 'ORD-1016', customerName: 'Olivia Harris', date: 'Feb 01, 2026', amount: '$1,099.00', method: 'Apple Pay', status: 'Complete' },
  { id: 'TXN-5017', orderId: 'ORD-1017', customerName: 'Daniel Wright', date: 'Jan 30, 2026', amount: '$498.99', method: 'Mastercard •••• 8642', status: 'Complete' },
  { id: 'TXN-5018', orderId: 'ORD-1018', customerName: 'Sophia Young', date: 'Jan 28, 2026', amount: '$190.00', method: 'Debit •••• 3579', status: 'Complete' },
  { id: 'TXN-5019', orderId: 'ORD-1019', customerName: 'Andrew Scott', date: 'Jan 26, 2026', amount: '$139.00', method: 'PayPal', status: 'Canceled' },
  { id: 'TXN-5020', orderId: 'ORD-1020', customerName: 'Megan Hall', date: 'Jan 24, 2026', amount: '$679.00', method: 'Visa •••• 4680', status: 'Complete' },
];

// ── 20 Coupons ──
const COUPONS: Coupon[] = [
  { id: 'CPN-01', code: 'WELCOME15', type: 'percentage', value: 15, minOrder: 50, usage: 342, maxUsage: 1000, status: 'active', expiryDate: '2026-06-30' },
  { id: 'CPN-02', code: 'SAVE20', type: 'fixed', value: 20, minOrder: 100, usage: 189, maxUsage: 500, status: 'active', expiryDate: '2026-04-30' },
  { id: 'CPN-03', code: 'SPRING25', type: 'percentage', value: 25, minOrder: 75, usage: 0, maxUsage: 300, status: 'active', expiryDate: '2026-05-31' },
  { id: 'CPN-04', code: 'FLASH50', type: 'fixed', value: 50, minOrder: 200, usage: 87, maxUsage: 100, status: 'active', expiryDate: '2026-03-15' },
  { id: 'CPN-05', code: 'LOYAL10', type: 'percentage', value: 10, minOrder: 0, usage: 1250, maxUsage: 5000, status: 'active', expiryDate: '2026-12-31' },
  { id: 'CPN-06', code: 'FREESHIP', type: 'fixed', value: 15, minOrder: 50, usage: 890, maxUsage: 2000, status: 'active', expiryDate: '2026-08-31' },
  { id: 'CPN-07', code: 'NEWYEAR30', type: 'percentage', value: 30, minOrder: 150, usage: 500, maxUsage: 500, status: 'expired', expiryDate: '2026-01-31' },
  { id: 'CPN-08', code: 'VIP40', type: 'percentage', value: 40, minOrder: 200, usage: 45, maxUsage: 200, status: 'active', expiryDate: '2026-09-30' },
  { id: 'CPN-09', code: 'BIRTHDAY20', type: 'fixed', value: 20, minOrder: 0, usage: 312, maxUsage: 10000, status: 'active', expiryDate: '2026-12-31' },
  { id: 'CPN-10', code: 'SUMMER15', type: 'percentage', value: 15, minOrder: 60, usage: 0, maxUsage: 800, status: 'inactive', expiryDate: '2026-08-31' },
  { id: 'CPN-11', code: 'BF2025', type: 'percentage', value: 50, minOrder: 100, usage: 2500, maxUsage: 2500, status: 'expired', expiryDate: '2025-11-30' },
  { id: 'CPN-12', code: 'REFER10', type: 'fixed', value: 10, minOrder: 30, usage: 678, maxUsage: 5000, status: 'active', expiryDate: '2026-12-31' },
  { id: 'CPN-13', code: 'TECH25', type: 'percentage', value: 25, minOrder: 200, usage: 112, maxUsage: 400, status: 'active', expiryDate: '2026-05-15' },
  { id: 'CPN-14', code: 'FASHION20', type: 'percentage', value: 20, minOrder: 80, usage: 245, maxUsage: 600, status: 'active', expiryDate: '2026-06-30' },
  { id: 'CPN-15', code: 'HOME30', type: 'fixed', value: 30, minOrder: 150, usage: 78, maxUsage: 300, status: 'active', expiryDate: '2026-07-31' },
  { id: 'CPN-16', code: 'SPORTS15', type: 'percentage', value: 15, minOrder: 50, usage: 156, maxUsage: 500, status: 'active', expiryDate: '2026-09-30' },
  { id: 'CPN-17', code: 'HOLIDAY25', type: 'percentage', value: 25, minOrder: 100, usage: 800, maxUsage: 800, status: 'expired', expiryDate: '2025-12-31' },
  { id: 'CPN-18', code: 'CLEARANCE40', type: 'percentage', value: 40, minOrder: 50, usage: 0, maxUsage: 200, status: 'inactive', expiryDate: '2026-03-31' },
  { id: 'CPN-19', code: 'FIRSTBUY', type: 'fixed', value: 25, minOrder: 75, usage: 1890, maxUsage: 10000, status: 'active', expiryDate: '2026-12-31' },
  { id: 'CPN-20', code: 'WEEKEND10', type: 'percentage', value: 10, minOrder: 40, usage: 432, maxUsage: 1000, status: 'active', expiryDate: '2026-06-30' },
];

// ── 20 Inventory Items ──
const INVENTORY: InventoryItem[] = [
  { productId: 'P001', productName: 'Sony WH-1000XM5 Headphones', currentStock: 45, lowStockThreshold: 20, isLowStock: false, lastRestocked: '2026-02-10', sku: 'SNY-WH1000-XM5', warehouse: 'Warehouse A' },
  { productId: 'P002', productName: 'Apple MacBook Air M3', currentStock: 22, lowStockThreshold: 15, isLowStock: false, lastRestocked: '2026-02-08', sku: 'APL-MBA-M3', warehouse: 'Warehouse A' },
  { productId: 'P003', productName: 'Nike Air Max 270', currentStock: 180, lowStockThreshold: 50, isLowStock: false, lastRestocked: '2026-02-12', sku: 'NKE-AM270', warehouse: 'Warehouse B' },
  { productId: 'P004', productName: 'Levi\'s 501 Original Jeans', currentStock: 320, lowStockThreshold: 80, isLowStock: false, lastRestocked: '2026-02-05', sku: 'LEV-501-OG', warehouse: 'Warehouse B' },
  { productId: 'P005', productName: 'KitchenAid Stand Mixer', currentStock: 35, lowStockThreshold: 15, isLowStock: false, lastRestocked: '2026-01-28', sku: 'KA-STMX-5Q', warehouse: 'Warehouse C' },
  { productId: 'P006', productName: 'Dyson V15 Detect Vacuum', currentStock: 18, lowStockThreshold: 10, isLowStock: false, lastRestocked: '2026-02-01', sku: 'DYS-V15-DET', warehouse: 'Warehouse C' },
  { productId: 'P007', productName: 'Samsung 65" OLED 4K TV', currentStock: 12, lowStockThreshold: 8, isLowStock: false, lastRestocked: '2026-01-20', sku: 'SAM-OLED65', warehouse: 'Warehouse A' },
  { productId: 'P008', productName: 'Adidas Ultraboost 22', currentStock: 95, lowStockThreshold: 30, isLowStock: false, lastRestocked: '2026-02-06', sku: 'ADI-UB22', warehouse: 'Warehouse B' },
  { productId: 'P009', productName: 'Instant Pot Duo 7-in-1', currentStock: 200, lowStockThreshold: 50, isLowStock: false, lastRestocked: '2026-02-11', sku: 'IP-DUO-7IN1', warehouse: 'Warehouse C' },
  { productId: 'P010', productName: 'Apple AirPods Pro 2', currentStock: 150, lowStockThreshold: 40, isLowStock: false, lastRestocked: '2026-02-09', sku: 'APL-APP2', warehouse: 'Warehouse A' },
  { productId: 'P011', productName: 'Yoga Mat Premium', currentStock: 240, lowStockThreshold: 60, isLowStock: false, lastRestocked: '2026-02-03', sku: 'YGA-MAT-PM', warehouse: 'Warehouse D' },
  { productId: 'P012', productName: 'Canon EOS R50 Camera', currentStock: 28, lowStockThreshold: 10, isLowStock: false, lastRestocked: '2026-01-25', sku: 'CAN-EOSR50', warehouse: 'Warehouse A' },
  { productId: 'P013', productName: 'North Face Puffer Jacket', currentStock: 75, lowStockThreshold: 25, isLowStock: false, lastRestocked: '2026-01-30', sku: 'NF-PUFFER', warehouse: 'Warehouse B' },
  { productId: 'P014', productName: 'Breville Barista Express', currentStock: 8, lowStockThreshold: 10, isLowStock: true, lastRestocked: '2026-01-15', sku: 'BRV-BAREXP', warehouse: 'Warehouse C' },
  { productId: 'P015', productName: 'Garmin Forerunner 265', currentStock: 42, lowStockThreshold: 15, isLowStock: false, lastRestocked: '2026-02-04', sku: 'GAR-FR265', warehouse: 'Warehouse A' },
  { productId: 'P016', productName: 'Herman Miller Aeron Chair', currentStock: 5, lowStockThreshold: 5, isLowStock: true, lastRestocked: '2026-01-10', sku: 'HM-AERON', warehouse: 'Warehouse D' },
  { productId: 'P017', productName: 'Ray-Ban Aviator Sunglasses', currentStock: 130, lowStockThreshold: 40, isLowStock: false, lastRestocked: '2026-02-07', sku: 'RB-AVTR', warehouse: 'Warehouse B' },
  { productId: 'P018', productName: 'Bose SoundLink Flex', currentStock: 88, lowStockThreshold: 25, isLowStock: false, lastRestocked: '2026-02-02', sku: 'BSE-SLF', warehouse: 'Warehouse A' },
  { productId: 'P019', productName: 'Patagonia Better Sweater', currentStock: 0, lowStockThreshold: 20, isLowStock: true, lastRestocked: '2025-12-15', sku: 'PAT-BTSW', warehouse: 'Warehouse B' },
  { productId: 'P020', productName: 'Yeti Rambler 36oz Bottle', currentStock: 310, lowStockThreshold: 80, isLowStock: false, lastRestocked: '2026-02-13', sku: 'YTI-RAM36', warehouse: 'Warehouse D' },
];

export const useAdminStore = create<AdminStore>((set, get) => ({
  stats: {
    totalRevenue: 125420,
    totalOrders: 1247,
    totalCustomers: 8934,
    totalProducts: 20,
    revenueGrowth: 15.2,
    ordersGrowth: 8.7,
    customersGrowth: 12.1,
    productsGrowth: 3.4,
  },

  products: PRODUCTS,
  categories: CATEGORIES,
  orders: ORDERS,
  customers: CUSTOMERS,
  inventory: INVENTORY,
  coupons: COUPONS,
  transactions: TRANSACTIONS,
  salesData: [],
  lowStockAlerts: [],
  customerSegments: [],
  isLoading: false,
  _initialized: false,

  updateStats: (newStats) =>
    set((state) => ({ stats: { ...state.stats, ...newStats } })),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: `P${String(state.products.length + 1).padStart(3, '0')}` }],
      stats: { ...state.stats, totalProducts: state.stats.totalProducts + 1 },
    })),

  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      stats: { ...state.stats, totalProducts: state.stats.totalProducts - 1 },
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, { ...category, id: Math.max(0, ...state.categories.map((c) => c.id)) + 1 }],
    })),

  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) => (c.id === id ? { ...c, ...category } : c)),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),

  addOrder: (order) =>
    set((state) => ({
      orders: [{ ...order, id: `ORD-${1000 + state.orders.length + 1}` }, ...state.orders],
      stats: { ...state.stats, totalOrders: state.stats.totalOrders + 1 },
    })),

  updateOrderStatus: (id, status, trackingNumber) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status, ...(trackingNumber && { trackingNumber }) } : order
      ),
    })),

  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
      stats: { ...state.stats, totalOrders: state.stats.totalOrders - 1 },
    })),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, { ...customer, id: `C${String(state.customers.length + 1).padStart(3, '0')}` }],
      stats: { ...state.stats, totalCustomers: state.stats.totalCustomers + 1 },
    })),

  updateCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((c) => (c.id === id ? { ...c, ...customer } : c)),
    })),

  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
      stats: { ...state.stats, totalCustomers: state.stats.totalCustomers - 1 },
    })),

  updateInventory: (inventory) => set({ inventory }),

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
      products: state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      ),
      lowStockAlerts: state.lowStockAlerts.filter((a) => a.productId !== productId),
    })),

  removeLowStockAlert: (productId) =>
    set((state) => ({
      lowStockAlerts: state.lowStockAlerts.filter((a) => a.productId !== productId),
    })),

  addCoupon: (coupon) =>
    set((state) => ({
      coupons: [...state.coupons, { ...coupon, id: `CPN-${String(state.coupons.length + 1).padStart(2, '0')}` }],
    })),

  updateCoupon: (id, coupon) =>
    set((state) => ({
      coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...coupon } : c)),
    })),

  deleteCoupon: (id) =>
    set((state) => ({
      coupons: state.coupons.filter((c) => c.id !== id),
    })),

  initializeData: () => {
    const state = get();
    if (state._initialized) return;

    const salesData: SalesData[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
    }));

    const lowStockAlerts: LowStockAlert[] = INVENTORY.filter((i) => i.isLowStock).map((i) => ({
      productId: i.productId,
      productName: i.productName,
      currentStock: i.currentStock,
      lowStockThreshold: i.lowStockThreshold,
    }));

    const customerSegments: CustomerSegment[] = [
      { name: 'New Customers', count: 2450, percentage: 27 },
      { name: 'Regular Customers', count: 3580, percentage: 40 },
      { name: 'VIP Customers', count: 1195, percentage: 13 },
      { name: 'Inactive Customers', count: 1709, percentage: 20 },
    ];

    set({ salesData, lowStockAlerts, customerSegments, _initialized: true });
  },
}));
