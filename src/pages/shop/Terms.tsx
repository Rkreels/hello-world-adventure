
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-gray-500 mb-8">Last updated: April 15, 2023</p>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Dealport ("we," "our," or "us"). These Terms and Conditions govern your use of our website, located at www.dealport.com, and 
              the services we offer through our website. By accessing or using our website, you agree to be bound by these Terms and Conditions.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <p>
              "Account" means a unique account created for you to access our service or parts of our service.
            </p>
            <p>
              "Website" refers to Dealport, accessible from www.dealport.com.
            </p>
            <p>
              "Country" refers to the United States of America.
            </p>
            <p>
              "Service" refers to the website.
            </p>
            <p>
              "Terms and Conditions" (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between you and 
              the Company regarding the use of the Service.
            </p>
            <p>
              "You" means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual 
              is accessing or using the Service, as applicable.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so 
              constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, 
              whether your password is with our Service or a third-party service.
            </p>
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or 
              unauthorized use of your account.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information 
              relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, 
              and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; 
              and that (ii) the information you supply to us is true, correct, and complete.
            </p>
            <p>
              We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, 
              errors in the description or price of the product or service, error in your order, or other reasons.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Refunds</h2>
            <p>
              We issue refunds for Contracts within 30 days of the original purchase of the Contract.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property 
              of Dealport and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries. Our 
              trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Dealport.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at 
              least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree 
              to the new terms, in whole or in part, please stop using the website and the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, you can contact us:
            </p>
            <ul className="pl-6 list-disc space-y-2">
              <li>By email: legal@dealport.com</li>
              <li>By phone: +1 (800) 123-4567</li>
              <li>By mail: 123 Commerce Street, San Francisco, CA 94103, United States</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
