import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductForm } from '@/components/forms/ProductForm';
import { useProducts } from '@/hooks/useProducts';
import { Loading } from '@/components/ui/loading';
import { api } from '@/services/api';
import { Product } from '@/types';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateProduct, loading: updating } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await api.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    
    try {
      await updateProduct(id, data);
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
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
        <Loading text="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
        <div className="text-red-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <p className="text-gray-600 mt-2">Update product information</p>
      </div>
      
      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updating}
      />
    </div>
  );
};

export default EditProduct;