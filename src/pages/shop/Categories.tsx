
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const categoriesData = [
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    subcategories: ["Men's Fashion", "Women's Fashion", "Kid's Fashion", "Accessories", "Footwear"]
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop",
    subcategories: ["Smartphones", "Laptops", "Audio", "Gaming", "Cameras"]
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop",
    subcategories: ["Furniture", "Kitchen Appliances", "Home Decor", "Bedding", "Storage"]
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"]
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    subcategories: ["Fitness Equipment", "Outdoor Recreation", "Sports Gear", "Athletic Clothing", "Water Sports"]
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1974&auto=format&fit=crop",
    subcategories: ["Action Figures", "Board Games", "Educational Toys", "Outdoor Play", "Puzzles"]
  },
  {
    id: "grocery",
    name: "Grocery & Gourmet",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
    subcategories: ["Snacks", "Beverages", "Breakfast Foods", "Canned Goods", "Organic Foods"]
  },
  {
    id: "pet",
    name: "Pet Supplies",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop",
    subcategories: ["Dog Supplies", "Cat Supplies", "Fish Supplies", "Small Pet Supplies", "Pet Food"]
  }
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
      <p className="text-gray-600 mb-6">Browse our wide selection of products across various categories</p>
      <Separator className="mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoriesData.map((category) => (
          <Card key={category.id} className="overflow-hidden h-full flex flex-col">
            <Link to={`/category/${category.id}`} className="block">
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
            <CardContent className="p-4 flex-1">
              <ul className="space-y-1">
                {category.subcategories.map((subcat, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/${category.id}/${subcat.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-sm text-gray-700 hover:text-green-600"
                    >
                      {subcat}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link 
                    to={`/category/${category.id}`} 
                    className="text-sm text-green-600 font-medium hover:underline"
                  >
                    See all {category.name}
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
