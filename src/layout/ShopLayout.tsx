
import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/shop/MainNavigation';
import CategoryNavigation from '@/components/shop/CategoryNavigation';
import Footer from '@/components/shop/Footer';

const ShopLayout = () => {
  console.log('🏪 ShopLayout: Rendering...');
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CategoryNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
