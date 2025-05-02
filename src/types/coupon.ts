
export interface Coupon {
  id: number;
  code: string;
  discount: string;
  type: 'Percentage' | 'Fixed Amount';
  validity: string;
  status: 'Active' | 'Expired' | 'Upcoming';
  description?: string;
  usageLimit?: number;
  usedCount?: number;
  minimumPurchase?: string;
  applicableProducts?: string[];
  createdAt: string;
}
