
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: April 15, 2023</p>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At Dealport, we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy 
              describes the types of information we may collect from you or that you may provide when you visit our website and our practices for 
              collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our website, including information:</p>
            <ul className="pl-6 list-disc space-y-2 mt-2">
              <li>
                By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by 
                which you may be contacted online or offline ("personal information").
              </li>
              <li>
                That is about you but individually does not identify you, such as your internet connection, the equipment you use to access our website, 
                and usage details.
              </li>
              <li>
                About your internet connection, the equipment you use to access our website, and usage details.
              </li>
            </ul>
            <p className="mt-4">We collect this information:</p>
            <ul className="pl-6 list-disc space-y-2 mt-2">
              <li>Directly from you when you provide it to us.</li>
              <li>Automatically as you navigate through the site.</li>
              <li>From third parties, for example, our business partners.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
            <ul className="pl-6 list-disc space-y-2 mt-2">
              <li>To present our website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              <li>To notify you about changes to our website or any products or services we offer or provide through it.</li>
              <li>In any other way we may describe when you provide the information.</li>
              <li>For any other purpose with your consent.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Your Information</h2>
            <p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.</p>
            <p className="mt-4">We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
            <ul className="pl-6 list-disc space-y-2 mt-2">
              <li>To our subsidiaries and affiliates.</li>
              <li>
                To contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations 
                to keep personal information confidential and use it only for the purposes for which we disclose it to them.
              </li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.</li>
              <li>To fulfill the purpose for which you provide it.</li>
              <li>For any other purpose disclosed by us when you provide the information.</li>
              <li>With your consent.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, 
              alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
            </p>
            <p className="mt-4">
              The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for 
              access to certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share your 
              password with anyone.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Our Privacy Policy</h2>
            <p>
              It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' 
              personal information, we will notify you through a notice on the website home page. The date the privacy policy was last revised is 
              identified at the top of the page.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at:</p>
            <ul className="pl-6 list-disc space-y-2 mt-2">
              <li>By email: privacy@dealport.com</li>
              <li>By phone: +1 (800) 123-4567</li>
              <li>By mail: 123 Commerce Street, San Francisco, CA 94103, United States</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
