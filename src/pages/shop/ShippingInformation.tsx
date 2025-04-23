
import React from 'react';
import { Separator } from '@/components/ui/separator';

const ShippingInformation = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            At Dealport, we strive to provide fast, reliable shipping for all our customers. Here's everything you need to know about our shipping policies and procedures.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Options</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Shipping Method</th>
                  <th className="border border-gray-300 px-4 py-2">Estimated Delivery Time</th>
                  <th className="border border-gray-300 px-4 py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Standard Shipping</td>
                  <td className="border border-gray-300 px-4 py-2">3-5 business days</td>
                  <td className="border border-gray-300 px-4 py-2">Free on orders over $35</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Express Shipping</td>
                  <td className="border border-gray-300 px-4 py-2">1-2 business days</td>
                  <td className="border border-gray-300 px-4 py-2">$9.99</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Next Day Delivery</td>
                  <td className="border border-gray-300 px-4 py-2">Next business day</td>
                  <td className="border border-gray-300 px-4 py-2">$14.99</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Order Processing</h2>
          <p className="mb-6">
            Orders are typically processed within 24 hours of being placed. Once your order has been processed, you'll receive a shipping confirmation email with tracking information. Please note that orders placed on weekends or holidays may experience slight delays.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">International Shipping</h2>
          <p className="mb-6">
            We currently ship to over 100 countries worldwide. International shipping rates and delivery times vary depending on the destination. Please note that international orders may be subject to customs fees and import duties, which are the responsibility of the recipient.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking Your Order</h2>
          <p className="mb-6">
            Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website and viewing your order history.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
          <p className="mb-6">
            Certain products cannot be shipped to particular locations due to local regulations. If you have any questions about shipping restrictions, please contact our customer service team.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about shipping or need assistance tracking your order, please contact our customer service team at shipping@dealport.com or call us at 1-800-DEALPORT.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInformation;
