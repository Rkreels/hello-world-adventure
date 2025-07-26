import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@/components/forms/ProductForm';
import { useProducts } from '@/hooks/useProducts';
import { Loading } from '@/components/ui/loading';

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useProducts();

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data);
      navigate('/admin/products');
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
        <Loading text="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <p className="text-gray-600 mt-2">Create a new product for your store</p>
      </div>
      
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={loading}
      />
    </div>
  );
};

export default AddProduct;