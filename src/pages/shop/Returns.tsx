
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            We want you to be completely satisfied with your purchase. If you're not, we're here to help.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Return Policy</h2>
          <p className="mb-6">
            You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How to Return an Item</h2>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Log in to your account and go to your order history.</li>
            <li>Select the item you wish to return and follow the return instructions.</li>
            <li>Print the provided return label and securely package your item.</li>
            <li>Drop off the package at your nearest shipping location.</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Process</h2>
          <p className="mb-6">
            Once we receive your returned item, we'll inspect it and notify you that we've received it. We'll immediately notify you of the status of your refund after inspecting the item.
          </p>
          <p className="mb-6">
            If your return is approved, we'll initiate a refund to your original method of payment. You'll receive the credit within a certain amount of days, depending on your payment method's policies.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Late or Missing Refunds</h2>
          <p className="mb-6">
            If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund, please contact our customer service team.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Exchanges</h2>
          <p className="mb-6">
            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@dealport.com and we'll provide instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
