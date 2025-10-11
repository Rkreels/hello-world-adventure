
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CategoryBanners = () => {
  const banners = [
    {
      id: 1,
      title: 'Gaming Zone',
      subtitle: 'Level up your game',
      description: 'Discover the latest gaming accessories and gear',
      image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80',
      link: '/category/gaming',
      bgColor: 'bg-gradient-to-r from-purple-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Fashion Forward',
      subtitle: 'Style meets comfort',
      description: 'Trending fashion for every season',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
      link: '/category/fashion',
      bgColor: 'bg-gradient-to-r from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`${banner.bgColor} text-white p-6 relative`}>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <h4 className="text-lg font-medium mb-2">{banner.subtitle}</h4>
                  <p className="mb-4 opacity-90">{banner.description}</p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white text-gray-800 hover:bg-gray-100"
                  >
                    <Link to={banner.link}>Shop Now</Link>
                  </Button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryBanners;
