
import { Navigate, RouteObject } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import ShopLayout from './layout/ShopLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Auth pages
import Login from './pages/auth/Login';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AddProduct from './pages/admin/AddProduct';
import Transactions from './pages/admin/Transactions';
import AdminCategories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import OrderManagement from './pages/admin/OrderManagement';
import SearchResults from './pages/admin/SearchResults';
import ProductsList from './pages/admin/ProductsList';
import ProductMedia from './pages/admin/ProductMedia';
import ProductReviews from './pages/admin/ProductReviews';
import AdminRole from './pages/admin/AdminRole';
import AdminAuthority from './pages/admin/AdminAuthority';
import Coupons from './pages/admin/Coupons';
import Brands from './pages/admin/Brands';
import Reports from './pages/admin/Reports';

// Shop pages
import Landing from './pages/shop/Landing';
import Index from './pages/Index';
import Shop from './pages/shop/Shop';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import CategoryPage from './pages/shop/CategoryPage';
import About from './pages/shop/About';
import Blog from './pages/shop/Blog';
import Careers from './pages/shop/Careers';
import Contact from './pages/shop/Contact';
import FAQ from './pages/shop/FAQ';
import Terms from './pages/shop/Terms';
import Privacy from './pages/shop/Privacy';
import CookiePolicy from './pages/shop/CookiePolicy';
import Returns from './pages/shop/Returns';
import ShippingInformation from './pages/shop/ShippingInformation';
import ShopCategories from './pages/shop/Categories';
import Deals from './pages/shop/Deals';
import NewArrivals from './pages/shop/NewArrivals';
import Accessibility from './pages/shop/Accessibility';
import Profile from './pages/shop/Profile';
import OrderDetails from './pages/shop/OrderDetails';
import SearchPage from './pages/shop/SearchPage';
import CustomerManagement from './pages/admin/CustomerManagement';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/ecommerce" replace />,
  },
  {
    path: '/ecommerce/login',
    element: <Login />,
  },
  {
    path: '/ecommerce/admin',
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { path: '', element: <Navigate to="/ecommerce/admin/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'role', element: <AdminRole /> },
          { path: 'authority', element: <AdminAuthority /> },
          { path: 'products/add', element: <AddProduct /> },
          { path: 'products/list', element: <ProductsList /> },
          { path: 'products/media', element: <ProductMedia /> },
          { path: 'products/reviews', element: <ProductReviews /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'categories', element: <AdminCategories /> },
          { path: 'customers', element: <Customers /> },
          { path: 'customer-management', element: <CustomerManagement /> },
          { path: 'orders', element: <OrderManagement /> },
          { path: 'coupons', element: <Coupons /> },
          { path: 'brands', element: <Brands /> },
          { path: 'reports', element: <Reports /> },
          { path: 'search', element: <SearchResults /> },
          { path: 'profile', element: <AdminProfile /> },
        ],
      },
    ],
  },
  {
    path: '/ecommerce',
    element: <ShopLayout />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'shop', element: <Shop /> },
      { path: 'explore', element: <Shop /> },
      { path: 'saved', element: <Shop /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'category/:categoryId/:subcategoryId', element: <CategoryPage /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: 'orders', element: <OrderDetails /> },
      { path: 'search', element: <SearchPage /> },
      
      // Footer and informational pages
      { path: 'about', element: <About /> },
      { path: 'blog', element: <Blog /> },
      { path: 'careers', element: <Careers /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'cookie', element: <CookiePolicy /> },
      { path: 'returns', element: <Returns /> },
      { path: 'shipping-information', element: <ShippingInformation /> },
      { path: 'categories', element: <ShopCategories /> },
      { path: 'deals', element: <Deals /> },
      { path: 'new-arrivals', element: <NewArrivals /> },
      { path: 'accessibility', element: <Accessibility /> },
      
      // Aliases for SEO purposes
      { path: 'returns-and-refunds', element: <Returns /> },
      { path: 'shipping', element: <ShippingInformation /> },
      { path: 'all-categories', element: <ShopCategories /> },
      { path: 'promotions', element: <Deals /> },
      { path: 'new', element: <NewArrivals /> },
    ],
  },
];

export default routes;
