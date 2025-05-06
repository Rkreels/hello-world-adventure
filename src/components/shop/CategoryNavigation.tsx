
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNavigation = () => {
  const categories = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Baby", path: "/category/baby" },
    { name: "Grocery & Essentials", path: "/category/grocery-essentials" },
    { name: "Streetwear", path: "/category/streetwear" },
    { name: "Shoes", path: "/category/shoes" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Beauty", path: "/category/beauty" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Industrial equipment", path: "/category/industrial-equipment" }
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <nav className="flex items-center space-x-6 py-3 whitespace-nowrap">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 hover:text-green-600 transition-colors text-sm"
              >
                {category.name}
              </Link>
            ))}
            <Link to="/categories" className="text-purple-600 hover:text-purple-700 text-sm">
              See more
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
