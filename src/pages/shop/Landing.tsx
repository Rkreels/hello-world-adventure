
import { Link } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCategories from '@/components/shop/FeaturedCategories';
import CategoryBanners from '@/components/shop/CategoryBanners';
import TrendingProducts from '@/components/shop/TrendingProducts';
import BestSellingProducts from '@/components/shop/BestSellingProducts';
import LimitedTimeDeals from '@/components/shop/LimitedTimeDeals';
import CustomerReviews from '@/components/shop/CustomerReviews';

const Landing = () => {
  return (
    <div className="relative space-y-12">
      {/* Hero Banner with Carousel */}
      <div className="relative">
        <HeroCarousel />
        
        {/* Featured Categories - Overlapping Cards */}
        <div className="relative -mt-24 z-10 mb-12">
          <FeaturedCategories />
        </div>
      </div>

      {/* Category Banners */}
      <CategoryBanners />
      
      {/* Trending Products */}
      <TrendingProducts />
      
      {/* Best Selling Products */}
      <BestSellingProducts />

      {/* Limited Time Deals */}
      <LimitedTimeDeals />
      
      {/* Customer Reviews */}
      <CustomerReviews />
    </div>
  );
};

export default Landing;
