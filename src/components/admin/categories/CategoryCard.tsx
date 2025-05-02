
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Eye } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  products: number;
  createdAt: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView?: (category: Category) => void;
}

const CategoryCard = ({ category, onEdit, onDelete, onView }: CategoryCardProps) => {
  return (
    <Card key={category.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="h-40 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription className="line-clamp-2">{category.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {category.products} products
        </div>
        <div className="flex space-x-2">
          {onView && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onView(category)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(category)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500"
            onClick={() => onDelete(category)}
          >
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
