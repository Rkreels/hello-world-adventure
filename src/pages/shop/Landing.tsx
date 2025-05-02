
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
    <div className="space-y-8">
      <div className="relative">
        <HeroCarousel />
        <div className="relative -mt-20 z-10">
          <FeaturedCategories />
        </div>
      </div>
      
      <div className="mt-8">
        <CategoryBanners />
      </div>
      
      <div className="bg-white shadow hover:shadow-md transition-shadow duration-300">
        <TrendingProducts />
      </div>
      
      <div className="container mx-auto px-6">
        <StartExploring />
      </div>
      
      <div className="bg-gray-50 shadow-inner">
        <BestSellingProducts />
      </div>
      
      <div className="container mx-auto px-6">
        <LimitedTimeDeals />
      </div>
      
      <CustomerReviews />
    </div>
  );
};

export default Landing;
