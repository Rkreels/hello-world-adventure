
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: '10 Ways to Save on Your Next Online Purchase',
    excerpt: 'Discover insider tips and tricks to maximize your savings when shopping online.',
    date: 'April 15, 2023',
    author: 'Emma Johnson',
    category: 'Shopping Tips',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'The Rise of Sustainable Fashion: What You Need to Know',
    excerpt: 'Learn about how the fashion industry is evolving to become more environmentally conscious.',
    date: 'March 22, 2023',
    author: 'Michael Chen',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Tech Gadgets Worth the Investment in 2023',
    excerpt: 'A comprehensive guide to this year\'s most valuable tech purchases.',
    date: 'February 10, 2023',
    author: 'Alex Rivera',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'Home Decor Trends to Watch in 2023',
    excerpt: 'Stay ahead of the curve with these emerging home decoration trends.',
    date: 'January 28, 2023',
    author: 'Sarah Miller',
    category: 'Home & Decor',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dealport Blog</h1>
      <p className="text-lg mb-8">Latest news, guides, and insights about shopping and deals</p>
      <Separator className="mb-10" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="h-full flex flex-col">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{post.category}</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex justify-between items-center">
              <div className="text-sm">By {post.author}</div>
              <Link to={`/blog/${post.id}`} className="text-primary hover:underline">Read more</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
