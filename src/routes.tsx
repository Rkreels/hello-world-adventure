
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
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import OrderManagement from './pages/admin/OrderManagement';
import SearchResults from './pages/admin/SearchResults';

// Shop pages
import Landing from './pages/shop/Landing';
import Shop from './pages/shop/Shop';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import CategoryPage from './pages/shop/CategoryPage';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { path: '', element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'role', element: <AdminProfile /> },
          { path: 'products/add', element: <AddProduct /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'categories', element: <Categories /> },
          { path: 'customers', element: <Customers /> },
          { path: 'orders', element: <OrderManagement /> },
          { path: 'search', element: <SearchResults /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <ShopLayout />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'shop', element: <Shop /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'category/:categoryId/:subcategoryId', element: <CategoryPage /> },
      { path: 'login', element: <Login /> },
    ],
  },
];

export default routes;
