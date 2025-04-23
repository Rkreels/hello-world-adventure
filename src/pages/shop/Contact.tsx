
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Your message has been sent! Our team will contact you shortly.');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-12 text-center">
          Have questions or feedback? We'd love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <CardTitle>Phone</CardTitle>
                <CardDescription>Monday-Friday, 9AM-5PM EST</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium">+1 (800) 123-4567</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <CardTitle>Email</CardTitle>
                <CardDescription>We'll respond within 24 hours</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium">support@dealport.com</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <CardTitle>Office</CardTitle>
                <CardDescription>Come say hello</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                123 Commerce Street<br />
                San Francisco, CA 94103
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your inquiry..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          
          <div className="lg:pl-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What are your business hours?</h3>
                <p className="text-gray-600">Our customer service team is available Monday through Friday, 9AM to 5PM Eastern Time.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How quickly will I receive a response?</h3>
                <p className="text-gray-600">We aim to respond to all inquiries within 24 hours during business days.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Do you offer bulk discounts?</h3>
                <p className="text-gray-600">Yes, we offer special pricing for bulk orders. Please contact our sales team for more information.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I cancel or modify my order?</h3>
                <p className="text-gray-600">Orders can be modified within 1 hour of placement. Please contact us as soon as possible if you need to make changes.</p>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/faq">View All FAQs</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
