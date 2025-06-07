
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";

// Layouts
import AdminLayout from "./layout/AdminLayout";
import ShopLayout from "./layout/ShopLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import Login from "./pages/auth/Login";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AddProduct from "./pages/admin/AddProduct";
import Transactions from "./pages/admin/Transactions";
import AdminCategories from "./pages/admin/Categories";
import Customers from "./pages/admin/Customers";
import OrderManagement from "./pages/admin/OrderManagement";
import SearchResults from "./pages/admin/SearchResults";
import ProductsList from "./pages/admin/ProductsList";
import ProductMedia from "./pages/admin/ProductMedia";
import ProductReviews from "./pages/admin/ProductReviews";
import AdminRole from "./pages/admin/AdminRole";
import AdminAuthority from "./pages/admin/AdminAuthority";
import Coupons from "./pages/admin/Coupons";
import Brands from "./pages/admin/Brands";
import Reports from "./pages/admin/Reports";
import CustomerManagement from "./pages/admin/CustomerManagement";

// Shop pages
import Landing from "./pages/shop/Landing";
import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/shop/ProductDetail";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import CategoryPage from "./pages/shop/CategoryPage";
import About from "./pages/shop/About";
import Blog from "./pages/shop/Blog";
import Careers from "./pages/shop/Careers";
import Contact from "./pages/shop/Contact";
import FAQ from "./pages/shop/FAQ";
import Terms from "./pages/shop/Terms";
import Privacy from "./pages/shop/Privacy";
import CookiePolicy from "./pages/shop/CookiePolicy";
import Returns from "./pages/shop/Returns";
import ShippingInformation from "./pages/shop/ShippingInformation";
import ShopCategories from "./pages/shop/Categories";
import Deals from "./pages/shop/Deals";
import NewArrivals from "./pages/shop/NewArrivals";
import Accessibility from "./pages/shop/Accessibility";
import Profile from "./pages/shop/Profile";
import OrderDetails from "./pages/shop/OrderDetails";
import SearchPage from "./pages/shop/SearchPage";

const queryClient = new QueryClient();

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename="/simulation/ecommerce">
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Shop routes */}
            <Route path="/" element={<ShopLayout />}>
              <Route index element={<Landing />} />
              <Route path="shop" element={<Shop />} />
              <Route path="explore" element={<Shop />} />
              <Route path="saved" element={<Shop />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="category/:categoryId/:subcategoryId" element={<CategoryPage />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<OrderDetails />} />
              <Route path="search" element={<SearchPage />} />
              
              {/* Footer and informational pages */}
              <Route path="about" element={<About />} />
              <Route path="blog" element={<Blog />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="cookie" element={<CookiePolicy />} />
              <Route path="returns" element={<Returns />} />
              <Route path="shipping-information" element={<ShippingInformation />} />
              <Route path="categories" element={<ShopCategories />} />
              <Route path="deals" element={<Deals />} />
              <Route path="new-arrivals" element={<NewArrivals />} />
              <Route path="accessibility" element={<Accessibility />} />
              
              {/* Aliases for SEO purposes */}
              <Route path="returns-and-refunds" element={<Returns />} />
              <Route path="shipping" element={<ShippingInformation />} />
              <Route path="all-categories" element={<ShopCategories />} />
              <Route path="promotions" element={<Deals />} />
              <Route path="new" element={<NewArrivals />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
              <Route path="" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="role" element={<AdminRole />} />
                <Route path="authority" element={<AdminAuthority />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/list" element={<ProductsList />} />
                <Route path="products/media" element={<ProductMedia />} />
                <Route path="products/reviews" element={<ProductReviews />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customer-management" element={<CustomerManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="brands" element={<Brands />} />
                <Route path="reports" element={<Reports />} />
                <Route path="search" element={<SearchResults />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
