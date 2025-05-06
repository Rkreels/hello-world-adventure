
import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/shop/MainNavigation';
import Footer from '@/components/shop/Footer';

const ShopLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
