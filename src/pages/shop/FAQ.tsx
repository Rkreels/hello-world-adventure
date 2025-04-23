
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-lg mb-8">Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact our support team.</p>
        
        <Separator className="my-8" />
        
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I place an order?</AccordionTrigger>
                <AccordionContent>
                  To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I check the status of my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and navigating to the "Orders" section. Alternatively, you can use the tracking number provided in your order confirmation email.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                <AccordionContent>
                  Orders can be modified or canceled within 1 hour of placement. After this window, please contact our customer support team for assistance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. In some regions, we also offer buy-now-pay-later options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long will shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Express shipping options (1-2 days) are available for an additional fee. International shipping may take 7-14 business days.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary based on destination.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Is free shipping available?</AccordionTrigger>
                <AccordionContent>
                  We offer free standard shipping on orders over $50 within the continental US. Promotional free shipping offers may be available during special events.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I track my package?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also find tracking details in your account under "Order History."
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="returns" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most items. Products must be in original condition with tags attached and original packaging.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
                <AccordionContent>
                  To start a return, log into your account, go to "Order History," select the order with the item you wish to return, and follow the return instructions. You'll receive a return shipping label and detailed instructions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                <AccordionContent>
                  Once we receive your return, it typically takes 3-5 business days to process. Refunds are issued to the original payment method and may take an additional 3-7 business days to appear on your statement.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer exchanges?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer exchanges for different sizes or colors of the same item. To request an exchange, follow the same process as returns and select "Exchange" instead of "Return."
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  You can create an account by clicking "Sign In" in the top right corner of our website and selecting "Create Account." You'll need to provide your email address and create a password.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>I forgot my password. How do I reset it?</AccordionTrigger>
                <AccordionContent>
                  Click "Sign In," then select "Forgot Password." Enter your email address, and we'll send you instructions to reset your password.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I update my account information?</AccordionTrigger>
                <AccordionContent>
                  After signing in, go to "Account Settings" to update your personal information, shipping addresses, and payment methods.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I save my shipping and payment information?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can save multiple shipping addresses and payment methods in your account for faster checkout in the future.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FAQ;
