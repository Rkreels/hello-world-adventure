
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const jobListings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build our next-generation e-commerce platform.'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Join our design team to create beautiful, intuitive experiences for our users across web and mobile platforms.'
  },
  {
    id: 3,
    title: 'Customer Support Specialist',
    department: 'Customer Experience',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help our customers have the best possible experience with our platform by providing exceptional support.'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Drive our marketing strategy and help grow our user base through innovative campaigns and initiatives.'
  }
];

const Careers = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Join Our Team</h1>
        
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why Work at Dealport?</h2>
          <p className="mb-6">
            At Dealport, we're building the future of online shopping. We're a team of passionate individuals who are committed to creating 
            the best possible shopping experience for our users. We value innovation, collaboration, and diversity of thought.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-2">Competitive Benefits</h3>
              <p className="text-sm">Comprehensive health insurance, 401(k) matching, and generous PTO.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-sm">Continuous learning and clear paths for career advancement.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-2">Work-Life Balance</h3>
              <p className="text-sm">Flexible working hours and remote-friendly environment.</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
        <Separator className="mb-8" />
        
        <div className="space-y-6">
          {jobListings.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{job.title}</CardTitle>
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{job.department}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{job.location}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{job.type}</span>
                  </div>
                </div>
                <CardDescription>{job.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
