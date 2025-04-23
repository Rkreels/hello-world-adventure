
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Accessibility = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            At Dealport, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment to Accessibility</h2>
          <p className="mb-6">
            We strive to ensure that our website and all digital services comply with Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Enhance Accessibility</h2>
          <p className="mb-6">
            We aim to make our website accessible by implementing the following measures:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Providing text alternatives for non-text content</li>
            <li>Ensuring all functionality is available from a keyboard</li>
            <li>Providing users enough time to read and use content</li>
            <li>Making content easy to see and hear</li>
            <li>Making text content readable and understandable</li>
            <li>Making content appear and operate in predictable ways</li>
            <li>Helping users avoid and correct mistakes</li>
            <li>Maximizing compatibility with current and future tools</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Using Our Website</h2>
          <p className="mb-6">
            We've designed our website with accessibility in mind. Some specific features include:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Proper heading structure and landmark regions</li>
            <li>Alt text for all images</li>
            <li>Sufficient color contrast</li>
            <li>Clear focus indicators</li>
            <li>Keyboard navigable menus and controls</li>
            <li>Resizable text without loss of functionality</li>
            <li>Form labels and error messages</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback and Contact Information</h2>
          <p className="mb-6">
            We welcome your feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Email: accessibility@dealport.com</li>
            <li>Phone: 1-800-DEALPORT (332-5767)</li>
            <li>Feedback form: Available on our Contact Us page</li>
          </ul>
          
          <p className="mb-6">
            We are committed to addressing accessibility barriers promptly and providing alternative means of access when necessary.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Continuous Improvement</h2>
          <p className="mb-6">
            We are continuously working to increase the accessibility and usability of our website and welcome comments and suggestions from our users. This statement was last updated on April 23, 2023, and we review and update it regularly as our website evolves and accessibility standards advance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
