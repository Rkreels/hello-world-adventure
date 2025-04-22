
import { Navigate, RouteObject } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import ShopLayout from './layout/ShopLayout';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AddProduct from './pages/admin/AddProduct';
import Transactions from './pages/admin/Transactions';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import OrderManagement from './pages/admin/OrderManagement';

// Shop pages
import Landing from './pages/shop/Landing';

const routes: RouteObject[] = [
  {
    path: '/admin',
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
    ],
  },
  {
    path: '/',
    element: <ShopLayout />,
    children: [
      { path: '', element: <Landing /> },
      // Add more shop pages as needed
    ],
  },
];

export default routes;
