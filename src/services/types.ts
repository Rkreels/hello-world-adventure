
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

export interface AdminRole {
  id: number;
  name: string;
  description: string;
  permissions: string;
}

export interface PermissionModule {
  id: number;
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}
