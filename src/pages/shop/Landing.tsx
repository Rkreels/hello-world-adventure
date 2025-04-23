
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
    
    // Add meta viewport tag to prevent zoom
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
  }, []);

  return (
    <div className="relative space-y-8 md:space-y-12">
      <div className="relative">
        <HeroCarousel />
        <div className="relative -mt-16 z-10">
          <FeaturedCategories />
        </div>
      </div>
      
      <div className="bg-gray-50 py-6">
        <CategoryBanners />
      </div>
      
      <div className="shadow-sm">
        <TrendingProducts />
      </div>
      
      <div className="py-2">
        <StartExploring />
      </div>
      
      <div className="bg-gray-50 py-6 shadow-inner">
        <BestSellingProducts />
      </div>
      
      <div className="py-4">
        <LimitedTimeDeals />
      </div>
      
      <CustomerReviews />
    </div>
  );
};

export default Landing;
