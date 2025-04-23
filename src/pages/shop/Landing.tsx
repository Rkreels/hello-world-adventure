
import { Link } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCategories from '@/components/shop/FeaturedCategories';
import CategoryBanners from '@/components/shop/CategoryBanners';
import TrendingProducts from '@/components/shop/TrendingProducts';
import BestSellingProducts from '@/components/shop/BestSellingProducts';
import CategoryExplorer from '@/components/shop/CategoryExplorer';

const Landing = () => {
  return (
    <div className="relative">
      {/* Hero Banner with Carousel */}
      <div className="relative">
        <HeroCarousel />
        
        {/* Featured Categories - Overlapping Cards */}
        <FeaturedCategories />
      </div>

      {/* Category Banners */}
      <CategoryBanners />
      
      {/* Trending Products */}
      <TrendingProducts />
      
      {/* Best Selling Products */}
      <BestSellingProducts />

      {/* Categories Explorer Section */}
      <CategoryExplorer />
    </div>
  );
};

export default Landing;
