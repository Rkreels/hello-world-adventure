
import { create } from 'zustand';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        toast.success(`${item.name} quantity updated in cart`);
        return {
          items: state.items.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      toast.success(`${item.name} added to cart`);
      return { items: [...state.items, item] };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));
    toast.info("Item removed from cart");
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },
  clearCart: () => {
    set({ items: [] });
    toast.info("Cart cleared");
  }
}));
