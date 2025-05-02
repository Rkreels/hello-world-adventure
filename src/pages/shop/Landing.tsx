
import React, { useEffect } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCategories from '@/components/shop/FeaturedCategories';
import CategoryBanners from '@/components/shop/CategoryBanners';
import TrendingProducts from '@/components/shop/TrendingProducts';
import BestSellingProducts from '@/components/shop/BestSellingProducts';
import LimitedTimeDeals from '@/components/shop/LimitedTimeDeals';
import CustomerReviews from '@/components/shop/CustomerReviews';
import StartExploring from '@/components/shop/StartExploring';

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative">
        <HeroCarousel />
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <FeaturedCategories />
          </div>
          <div className="md:col-span-2">
            <StartExploring />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <CategoryBanners />
      </div>
      
      <div className="bg-white">
        <TrendingProducts />
      </div>
      
      <div className="bg-gray-50">
        <BestSellingProducts />
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <LimitedTimeDeals />
      </div>
      
      <CustomerReviews />
    </div>
  );
};

export default Landing;
