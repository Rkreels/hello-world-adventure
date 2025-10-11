
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  growth: string;
  image: string;
}

interface TopSellingProductsProps {
  products: Product[];
}

const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate('/admin/products');
    toast.info('Viewing all products');
  };

  const handleExportData = () => {
    toast.info('Exporting product data...');
  };

  const handleProductClick = (productId: number, productName: string) => {
    navigate(`/admin/products/P00${productId}/edit`);
    toast.info(`Viewing ${productName}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Top Products</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewAllProducts}>
                <Eye className="mr-2 h-4 w-4" />
                View All Products
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportData}>
                Export Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-4 mt-0">
            {products.map(product => (
              <div 
                key={product.id} 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => handleProductClick(product.id, product.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${product.price}</p>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {product.growth}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="py-8 text-center text-muted-foreground">
              Monthly data will appear here
            </div>
          </TabsContent>
          
          <TabsContent value="yearly">
            <div className="py-8 text-center text-muted-foreground">
              Yearly data will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
