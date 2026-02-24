import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Checkout = () => {
  const { items: cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'complete'>('shipping');
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-8)}`);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal) * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect to cart if empty and not on complete step
  if (cartItems.length === 0 && step !== 'complete') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some items before checking out.</p>
        <Button asChild><Link to="/shop">Go to Shop</Link></Button>
      </div>
    );
  }
  
  const goToPayment = () => { setStep('payment'); window.scrollTo(0, 0); };
  const goToReview = () => { setStep('review'); window.scrollTo(0, 0); };
  const completeOrder = () => {
    clearCart();
    setStep('complete');
    window.scrollTo(0, 0);
    toast.success('Order placed successfully!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
          {(['shipping', 'payment', 'review', 'complete'] as const).map((s, i) => {
            const steps = ['shipping', 'payment', 'review', 'complete'];
            const currentIdx = steps.indexOf(step);
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  isPast || isCurrent ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {isPast ? <CheckCircle className="h-5 w-5" /> : <span>{i + 1}</span>}
                </div>
                <span className="text-sm capitalize">{s}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {/* Shipping */}
          {step === 'shipping' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input placeholder="(123) 456-7890" />
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <Input placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <Input placeholder="New York" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <Select defaultValue="NY">
                      <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP</label>
                    <Input placeholder="10001" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Shipping Method</h3>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="ml-2">Standard (3-5 days)</Label>
                    </div>
                    <span className="font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="ml-2">Express (1-2 days)</Label>
                    </div>
                    <span className="font-medium">{formatCurrency(15.99)}</span>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-8 flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={goToPayment}>Continue to Payment</Button>
              </div>
            </div>
          )}
          
          {/* Payment */}
          {step === 'payment' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-6">
                <div className={`border rounded-md p-4 ${paymentMethod === 'creditCard' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                  <div className="flex items-center mb-4">
                    <RadioGroupItem value="creditCard" id="creditCard" />
                    <Label htmlFor="creditCard" className="ml-2 font-medium">Credit / Debit Card</Label>
                  </div>
                  {paymentMethod === 'creditCard' && (
                    <div className="pl-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <div className="relative">
                          <Input placeholder="1234 5678 9012 3456" className="pl-10" />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name on Card</label>
                        <Input placeholder="John Doe" />
                      </div>
                    </div>
                  )}
                </div>
                <div className={`border rounded-md p-4 ${paymentMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                  <div className="flex items-center">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="ml-2 font-medium">PayPal</Label>
                  </div>
                </div>
              </RadioGroup>
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep('shipping')}>Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={goToReview}>Review Order</Button>
              </div>
            </div>
          )}
          
          {/* Review */}
          {step === 'review' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Review Your Order</h2>
              <div className="mb-6">
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex p-4 border-b last:border-b-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Order Notes (optional)</label>
                <Textarea placeholder="Special instructions..." className="resize-none" />
              </div>
              <div className="flex items-center mb-6">
                <Checkbox id="termsAccept" />
                <label htmlFor="termsAccept" className="ml-2 text-sm">
                  I agree to the <Link to="/terms" className="text-emerald-600 hover:underline">Terms</Link> and <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep('payment')}>Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={completeOrder}>Place Order</Button>
              </div>
            </div>
          )}
          
          {/* Complete */}
          {step === 'complete' && (
            <div className="bg-white rounded-lg shadow p-8 mb-6 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
              <p className="text-gray-600 mb-6">
                Your order <span className="font-medium">#{orderNumber}</span> has been placed successfully.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6 max-w-md mx-auto text-left">
                <p>Order ID: {orderNumber}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Total: {formatCurrency(total)}</p>
                <p>Estimated Delivery: 3-5 business days</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary Sidebar */}
        {step !== 'complete' && (
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-3 border-b last:border-b-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs rounded-bl-md px-1">{item.quantity}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <span className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
                <div className="flex justify-between text-sm"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
