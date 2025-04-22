
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, MinusCircle, PlusCircle, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "FitPro 3000 Smartwatch",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
    quantity: 1,
    color: "Black",
    size: "Regular",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
    quantity: 2,
    color: "White",
    size: "One Size",
  },
  {
    id: 3,
    name: "Radiant Glow Hydrating Serum",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?q=80&w=1964&auto=format&fit=crop",
    quantity: 1,
    size: "50ml",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'DISCOUNT20') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };
  
  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                <div className="col-span-6">
                  <span className="font-medium">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Price</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Subtotal</span>
                </div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    <div className="flex items-center col-span-6 mb-4 md:mb-0">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/products/${item.id}`} className="hover:text-emerald-600">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.color && <span>Color: {item.color} | </span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                        <button 
                          className="text-red-500 text-sm flex items-center mt-2 md:hidden"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <span className="md:hidden inline-block mr-2 font-medium">Price:</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-center mb-4 md:mb-0">
                      <button 
                        className="text-gray-500 hover:text-emerald-600"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                      <span className="mx-3 w-8 text-center">{item.quantity}</span>
                      <button 
                        className="text-gray-500 hover:text-emerald-600"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <span className="md:hidden inline-block mr-2 font-medium">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    
                    <div className="hidden md:block md:absolute md:right-4">
                      <button 
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-between items-center mt-6">
              <Button variant="outline" className="mb-4 sm:mb-0">
                <Link to="/shop" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => setCartItems([])}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (20%)</span>
                    <span className="text-red-500">-{formatCurrency(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatCurrency(total)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium mb-2">Apply Coupon Code</label>
                <div className="flex">
                  <Input 
                    id="coupon"
                    placeholder="Enter code"
                    className="rounded-r-none"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <Button 
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode.trim()} 
                    className="rounded-l-none bg-emerald-600 hover:bg-emerald-700"
                  >
                    Apply
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 mt-1">Coupon applied successfully!</p>
                )}
              </div>
              
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link to="/checkout" className="flex items-center justify-center w-full">
                  Proceed to Checkout
                </Link>
              </Button>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>We accept:</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
