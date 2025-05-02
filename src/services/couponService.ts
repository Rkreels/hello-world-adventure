
import { Coupon } from '../types/coupon';

// Initial mock data
let coupons: Coupon[] = [
  { id: 1, code: 'SUMMER25', discount: '25%', type: 'Percentage', validity: '2025-06-30', status: 'Active', createdAt: '2025-01-15' },
  { id: 2, code: 'FREESHIP', discount: '$15', type: 'Fixed Amount', validity: '2025-05-15', status: 'Active', createdAt: '2025-01-20' },
  { id: 3, code: 'WELCOME10', discount: '10%', type: 'Percentage', validity: '2025-12-31', status: 'Active', createdAt: '2025-02-01' },
  { id: 4, code: 'FLASH50', discount: '50%', type: 'Percentage', validity: '2025-04-30', status: 'Expired', createdAt: '2025-02-10' },
  { id: 5, code: 'LOYALTY20', discount: '20%', type: 'Percentage', validity: '2025-08-15', status: 'Active', createdAt: '2025-03-01' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const couponService = {
  getAllCoupons: async (): Promise<Coupon[]> => {
    await delay(500); // Simulate API delay
    return [...coupons];
  },
  
  getCouponById: async (id: number): Promise<Coupon | undefined> => {
    await delay(300);
    return coupons.find(coupon => coupon.id === id);
  },
  
  createCoupon: async (coupon: Omit<Coupon, 'id' | 'createdAt'>): Promise<Coupon> => {
    await delay(600);
    const newCoupon: Coupon = {
      ...coupon,
      id: Math.max(0, ...coupons.map(c => c.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    coupons = [...coupons, newCoupon];
    return newCoupon;
  },
  
  updateCoupon: async (id: number, couponData: Partial<Coupon>): Promise<Coupon | undefined> => {
    await delay(500);
    let updated: Coupon | undefined;
    
    coupons = coupons.map(coupon => {
      if (coupon.id === id) {
        updated = { ...coupon, ...couponData };
        return updated;
      }
      return coupon;
    });
    
    return updated;
  },
  
  deleteCoupon: async (id: number): Promise<boolean> => {
    await delay(400);
    const initialLength = coupons.length;
    coupons = coupons.filter(coupon => coupon.id !== id);
    return coupons.length !== initialLength;
  },
  
  searchCoupons: async (query: string): Promise<Coupon[]> => {
    await delay(300);
    const lowerCaseQuery = query.toLowerCase();
    return coupons.filter(coupon => 
      coupon.code.toLowerCase().includes(lowerCaseQuery) ||
      coupon.type.toLowerCase().includes(lowerCaseQuery) ||
      coupon.status.toLowerCase().includes(lowerCaseQuery)
    );
  }
};
