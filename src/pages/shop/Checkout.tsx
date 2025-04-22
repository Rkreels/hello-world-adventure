
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

// Mock cart data for order summary
const cartItems = [
  {
    id: 1,
    name: "FitPro 3000 Smartwatch",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
    quantity: 2,
  },
];

// Calculate cart summary
const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
const discount = 0;
const shipping = subtotal > 100 ? 0 : 10;
const tax = (subtotal - discount) * 0.08;
const total = subtotal - discount + shipping + tax;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'complete'>('shipping');
  
  const goToPayment = () => {
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const goToReview = () => {
    setStep('review');
    window.scrollTo(0, 0);
  };
  
  const completeOrder = () => {
    setStep('complete');
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Checkout Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
          
          <div className={`flex flex-col items-center relative z-10 ${step === 'shipping' ? 'text-emerald-600' : 'text-gray-900'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              step === 'shipping' 
                ? 'bg-emerald-600 text-white' 
                : step === 'payment' || step === 'review' || step === 'complete'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {step === 'payment' || step === 'review' || step === 'complete' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>1</span>
              )}
            </div>
            <span className="text-sm">Shipping</span>
          </div>
          
          <div className={`flex flex-col items-center relative z-10 ${step === 'payment' ? 'text-emerald-600' : 'text-gray-900'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              step === 'payment' 
                ? 'bg-emerald-600 text-white' 
                : step === 'review' || step === 'complete'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {step === 'review' || step === 'complete' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>2</span>
              )}
            </div>
            <span className="text-sm">Payment</span>
          </div>
          
          <div className={`flex flex-col items-center relative z-10 ${step === 'review' ? 'text-emerald-600' : 'text-gray-900'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              step === 'review' 
                ? 'bg-emerald-600 text-white' 
                : step === 'complete'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {step === 'complete' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>3</span>
              )}
            </div>
            <span className="text-sm">Review</span>
          </div>
          
          <div className={`flex flex-col items-center relative z-10 ${step === 'complete' ? 'text-emerald-600' : 'text-gray-900'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              step === 'complete' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              <span>4</span>
            </div>
            <span className="text-sm">Complete</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Checkout Forms */}
        <div className="md:w-2/3">
          {/* Shipping Information Step */}
          {step === 'shipping' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Street Address</label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium mb-1">
                    Apartment, suite, etc. (optional)
                  </label>
                  <Input id="addressLine2" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                    <Select defaultValue="NY">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
                    <Input id="zipCode" placeholder="10001" />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                  <Select defaultValue="US">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <Checkbox id="saveAddress" />
                  <label htmlFor="saveAddress" className="ml-2 text-sm">
                    Save this address for future orders
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="shippingAsBilling" defaultChecked />
                  <label htmlFor="shippingAsBilling" className="ml-2 text-sm">
                    Billing address same as shipping address
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Shipping Method</h3>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="ml-2">Standard Shipping (3-5 business days)</Label>
                    </div>
                    <span className="font-medium">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="ml-2">Express Shipping (1-2 business days)</Label>
                    </div>
                    <span className="font-medium">{formatCurrency(15.99)}</span>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={goToPayment}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
          
          {/* Payment Step */}
          {step === 'payment' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Payment Method</h2>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod} 
                className="space-y-4 mb-6"
              >
                <div className={`border rounded-md p-4 ${paymentMethod === 'creditCard' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                  <div className="flex items-center mb-4">
                    <RadioGroupItem value="creditCard" id="creditCard" />
                    <Label htmlFor="creditCard" className="ml-2 font-medium">Credit / Debit Card</Label>
                  </div>
                  
                  {paymentMethod === 'creditCard' && (
                    <div className="pl-6 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                        <div className="relative">
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="expiration" className="block text-sm font-medium mb-1">Expiration Date</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Select defaultValue="01">
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(12)].map((_, i) => (
                                  <SelectItem 
                                    key={i} 
                                    value={String(i + 1).padStart(2, '0')}
                                  >
                                    {String(i + 1).padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select defaultValue="2023">
                              <SelectTrigger>
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(10)].map((_, i) => (
                                  <SelectItem 
                                    key={i} 
                                    value={String(2023 + i)}
                                  >
                                    {2023 + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">Name on Card</label>
                        <Input id="nameOnCard" placeholder="John Doe" />
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox id="saveCard" />
                        <label htmlFor="saveCard" className="ml-2 text-sm">
                          Save this card for future orders
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`border rounded-md p-4 ${paymentMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                  <div className="flex items-center">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="ml-2 font-medium">PayPal</Label>
                  </div>
                  
                  {paymentMethod === 'paypal' && (
                    <div className="pl-6 mt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png" alt="PayPal Checkout" />
                    </div>
                  )}
                </div>
                
                <div className={`border rounded-md p-4 ${paymentMethod === 'applePay' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                  <div className="flex items-center">
                    <RadioGroupItem value="applePay" id="applePay" />
                    <Label htmlFor="applePay" className="ml-2 font-medium">Apple Pay</Label>
                  </div>
                </div>
              </RadioGroup>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep('shipping')}>
                  Back to Shipping
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={goToReview}>
                  Review Order
                </Button>
              </div>
            </div>
          )}
          
          {/* Review Step */}
          {step === 'review' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Review Your Order</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">John Doe</p>
                  <p>123 Main St, Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                  <p className="mt-1">john.doe@example.com</p>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-md flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p>Credit Card ending in 3456</p>
                    <p className="text-sm text-gray-500">Expires 01/2025</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex p-4 border-b last:border-b-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          <Link to={`/products/${item.id}`} className="hover:text-emerald-600">
                            {item.name}
                          </Link>
                        </h4>
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
                <h3 className="font-medium mb-3">Additional Information</h3>
                <div>
                  <label htmlFor="orderNotes" className="block text-sm font-medium mb-1">
                    Order Notes (optional)
                  </label>
                  <Textarea 
                    id="orderNotes" 
                    placeholder="Add any special instructions or delivery notes..."
                    className="resize-none"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox id="termsAccept" />
                  <label htmlFor="termsAccept" className="ml-2 text-sm">
                    I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep('payment')}>
                  Back to Payment
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={completeOrder}>
                  Place Order
                </Button>
              </div>
            </div>
          )}
          
          {/* Order Complete Step */}
          {step === 'complete' && (
            <div className="bg-white rounded-lg shadow p-8 mb-6 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed and is being processed. Your order number is <span className="font-medium">#DPO-12345678</span>.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6 max-w-md mx-auto text-left">
                <h3 className="font-medium mb-2">Order details:</h3>
                <p>Order ID: DPO-12345678</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Total: {formatCurrency(total)}</p>
                <p>Payment Method: Credit Card ending in 3456</p>
                <p>Shipping Method: Standard Shipping (3-5 business days)</p>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                We'll send you a confirmation email with your order details and tracking information once your package ships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Link to="/shop" className="flex items-center justify-center w-full">
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link to="/track-order" className="flex items-center justify-center w-full">
                    Track Order
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="md:w-1/3">
          {step !== 'complete' && (
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-3 border-b last:border-b-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs rounded-bl-md px-1">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-red-500">-{formatCurrency(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatCurrency(total)}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-2">
                <p>
                  By placing your order, you agree to our <a href="#" className="text-emerald-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>.
                </p>
                <p>
                  For questions about your order, please contact our customer service team.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
