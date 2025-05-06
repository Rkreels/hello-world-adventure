
import { Coupon } from "@/types/coupon";

// Mock data for coupons
const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "SUMMER25",
    discount: "25%",
    type: "Percentage",
    validity: "May 1, 2025 - Aug 31, 2025",
    status: "Active",
    description: "Summer season discount on all products",
    usageLimit: 100,
    usedCount: 0,
    minimumPurchase: "$50",
    applicableProducts: ["Clothing", "Footwear"],
    createdAt: "Apr 15, 2025"
  },
  {
    id: 2,
    code: "NEWUSER10",
    discount: "10%",
    type: "Percentage",
    validity: "Jan 1, 2025 - Dec 31, 2025",
    status: "Active",
    description: "Welcome discount for new users",
    usageLimit: 1,
    usedCount: 0,
    minimumPurchase: "$20",
    createdAt: "Jan 1, 2025"
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: "$10",
    type: "Fixed Amount",
    validity: "Apr 1, 2025 - Jun 30, 2025",
    status: "Active",
    description: "Free shipping on all orders",
    usageLimit: 200,
    usedCount: 45,
    createdAt: "Mar 25, 2025"
  },
  {
    id: 4,
    code: "BLACKFRIDAY",
    discount: "50%",
    type: "Percentage",
    validity: "Nov 25, 2025 - Nov 30, 2025",
    status: "Upcoming",
    description: "Black Friday special discount",
    usageLimit: 1000,
    usedCount: 0,
    minimumPurchase: "$100",
    createdAt: "Feb 15, 2025"
  },
  {
    id: 5,
    code: "FLASH20",
    discount: "20%",
    type: "Percentage",
    validity: "Mar 1, 2025 - Mar 15, 2025",
    status: "Expired",
    description: "Flash sale discount",
    usageLimit: 500,
    usedCount: 243,
    createdAt: "Feb 20, 2025"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const couponService = {
  getAllCoupons: async (): Promise<Coupon[]> => {
    await delay(1000); // Simulate network delay
    return [...mockCoupons];
  },
  
  getCouponById: async (id: number): Promise<Coupon> => {
    await delay(500); // Simulate network delay
    const coupon = mockCoupons.find(c => c.id === id);
    if (!coupon) {
      throw new Error(`Coupon with id ${id} not found`);
    }
    return { ...coupon };
  },
  
  createCoupon: async (couponData: Partial<Coupon>): Promise<Coupon> => {
    await delay(1500); // Simulate network delay
    
    // Generate new ID
    const newId = Math.max(...mockCoupons.map(c => c.id)) + 1;
    
    const newCoupon: Coupon = {
      id: newId,
      code: couponData.code || '',
      discount: couponData.discount || '',
      type: couponData.type as 'Percentage' | 'Fixed Amount',
      validity: couponData.validity || '',
      status: couponData.status as 'Active' | 'Expired' | 'Upcoming',
      description: couponData.description,
      usageLimit: couponData.usageLimit,
      usedCount: 0,
      minimumPurchase: couponData.minimumPurchase,
      applicableProducts: couponData.applicableProducts,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    mockCoupons.push(newCoupon);
    return { ...newCoupon };
  },
  
  updateCoupon: async (id: number, couponData: Partial<Coupon>): Promise<Coupon> => {
    await delay(1500); // Simulate network delay
    
    const couponIndex = mockCoupons.findIndex(c => c.id === id);
    if (couponIndex === -1) {
      throw new Error(`Coupon with id ${id} not found`);
    }
    
    const updatedCoupon = {
      ...mockCoupons[couponIndex],
      ...couponData
    };
    
    mockCoupons[couponIndex] = updatedCoupon;
    return { ...updatedCoupon };
  },
  
  deleteCoupon: async (id: number): Promise<void> => {
    await delay(1000); // Simulate network delay
    
    const couponIndex = mockCoupons.findIndex(c => c.id === id);
    if (couponIndex === -1) {
      throw new Error(`Coupon with id ${id} not found`);
    }
    
    mockCoupons.splice(couponIndex, 1);
  },
  
  applyCoupon: async (code: string, cartTotal: number): Promise<{ discount: number, message: string }> => {
    await delay(500); // Simulate network delay
    
    const coupon = mockCoupons.find(c => 
      c.code === code && 
      c.status === 'Active'
    );
    
    if (!coupon) {
      throw new Error('Invalid or expired coupon code');
    }
    
    // Check minimum purchase requirement
    if (coupon.minimumPurchase) {
      const minAmount = parseFloat(coupon.minimumPurchase.replace('$', ''));
      if (cartTotal < minAmount) {
        throw new Error(`Minimum purchase of $${minAmount} required for this coupon`);
      }
    }
    
    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount && coupon.usedCount >= coupon.usageLimit) {
      throw new Error('This coupon has reached its usage limit');
    }
    
    // Calculate discount
    let discountAmount = 0;
    
    if (coupon.type === 'Percentage') {
      const percentValue = parseFloat(coupon.discount.replace('%', ''));
      discountAmount = (cartTotal * percentValue) / 100;
    } else if (coupon.type === 'Fixed Amount') {
      discountAmount = parseFloat(coupon.discount.replace('$', ''));
    }
    
    return {
      discount: discountAmount,
      message: `Coupon applied: ${coupon.code}`
    };
  }
};
