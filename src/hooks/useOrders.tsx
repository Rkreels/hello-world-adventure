import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Order } from '@/types';
import { toast } from 'sonner';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  updateOrderStatus: (id: string, status: Order['status'], trackingNumber?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getOrders();
      setOrders(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status'], trackingNumber?: string) => {
    try {
      const updatedOrder = { status, trackingNumber };
      setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updatedOrder } : o));
      toast.success(`Order ${status.toLowerCase()} successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update order';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    refetch: fetchOrders,
  };
};