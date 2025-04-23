
import React from 'react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Dealport</h1>
        <Separator className="mb-8" />
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Dealport was founded in 2020 with a simple mission: to connect shoppers with the best deals across the web and in stores.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p className="mb-6">
            What started as a small passion project by a group of tech enthusiasts has grown into one of the most trusted e-commerce platforms. 
            We believe shopping should be easy, enjoyable, and affordable for everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to revolutionize the online shopping experience by providing a platform that combines competitive prices, 
            quality products, and exceptional customer service. We strive to make every transaction seamless and every customer satisfied.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="mb-6">
            Behind Dealport is a dedicated team of professionals who are passionate about e-commerce and customer experience. 
            From our developers to our customer service representatives, everyone at Dealport is committed to making your shopping experience exceptional.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
          <p className="mb-6">
            We're always looking for talented individuals to join our team. If you're passionate about e-commerce and want to make a difference, 
            check out our careers page for current openings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
