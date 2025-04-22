
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Filter, Grid3X3, LayoutList, ChevronDown, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';

// Mock category data
const categories = {
  'electronics': {
    name: 'Electronics',
    description: 'Explore our collection of the latest electronics and gadgets.',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Accessories'],
    products: [
      {
        id: 1,
        name: "FitPro 3000 Smartwatch",
        brand: "GadgetPro",
        price: 119.99,
        oldPrice: 149.99,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
        rating: 5,
        reviews: 152,
        isNew: false,
        discount: 20,
      },
      {
        id: 2,
        name: "Wireless Earbuds Pro",
        brand: "AudioTech",
        price: 149.99,
        oldPrice: 199.99,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
        rating: 4,
        reviews: 98,
        isNew: true,
        discount: 25,
      },
      {
        id: 3,
        name: "Ultra HD 4K Smart TV",
        brand: "VisionPlus",
        price: 599.99,
        oldPrice: 799.99,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
        rating: 4,
        reviews: 76,
        isNew: false,
        discount: 25,
      },
      {
        id: 4,
        name: "Portable Bluetooth Speaker",
        brand: "SoundWave",
        price: 79.99,
        oldPrice: 99.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
        rating: 4,
        reviews: 86,
        isNew: false,
        discount: 20,
      },
      {
        id: 5,
        name: "Wireless Charging Pad",
        brand: "PowerUp",
        price: 29.99,
        oldPrice: 39.99,
        image: "https://images.unsplash.com/photo-1603539444875-76e7684265f6?q=80&w=1000&auto=format&fit=crop",
        rating: 4,
        reviews: 42,
        isNew: false,
        discount: 25,
      },
      {
        id: 6,
        name: "Gaming Laptop Pro",
        brand: "TechElite",
        price: 1299.99,
        oldPrice: 1499.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
        rating: 5,
        reviews: 58,
        isNew: true,
        discount: 13,
      },
    ],
  },
  'fashion': {
    name: 'Fashion',
    description: 'Discover the latest trends in fashion for men, women, and kids.',
    banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
    subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'],
    products: [
      {
        id: 7,
        name: "Classic Denim Jacket",
        brand: "UrbanStyle",
        price: 89.99,
        oldPrice: 119.99,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop",
        rating: 4,
        reviews: 64,
        isNew: false,
        discount: 25,
      },
      {
        id: 8,
        name: "Premium Leather Sneakers",
        brand: "FootFlow",
        price: 129.99,
        oldPrice: 159.99,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop",
        rating: 5,
        reviews: 93,
        isNew: true,
        discount: 19,
      },
      {
        id: 9,
        name: "Casual Cotton T-Shirt",
        brand: "EssentialWear",
        price: 24.99,
        oldPrice: 34.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
        rating: 4,
        reviews: 128,
        isNew: false,
        discount: 29,
      },
      {
        id: 10,
        name: "Designer Sunglasses",
        brand: "VisionElite",
        price: 159.99,
        oldPrice: 199.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
        rating: 4,
        reviews: 46,
        isNew: false,
        discount: 20,
      },
      {
        id: 11,
        name: "Slim Fit Dress Pants",
        brand: "ProFashion",
        price: 69.99,
        oldPrice: 89.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
        rating: 4,
        reviews: 72,
        isNew: false,
        discount: 22,
      },
      {
        id: 12,
        name: "Stylish Wristwatch",
        brand: "TimeKeeper",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?q=80&w=1964&auto=format&fit=crop",
        rating: 5,
        reviews: 39,
        isNew: true,
        discount: 20,
      },
    ],
  },
  // Add more categories with their respective products
};

// Fallback category for any category that doesn't exist in our data
const fallbackCategory = {
  name: 'Products',
  description: 'Explore our collection of high-quality products.',
  banner: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
  subcategories: ['Featured', 'New Arrivals', 'Best Sellers', 'Deals'],
  products: [
    {
      id: 1,
      name: "FitPro 3000 Smartwatch",
      brand: "GadgetPro",
      price: 119.99,
      oldPrice: 149.99,
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
      rating: 5,
      reviews: 152,
      isNew: false,
      discount: 20,
    },
    {
      id: 7,
      name: "Classic Denim Jacket",
      brand: "UrbanStyle",
      price: 89.99,
      oldPrice: 119.99,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop",
      rating: 4,
      reviews: 64,
      isNew: false,
      discount: 25,
    },
    {
      id: 13,
      name: "Ceramic Coffee Mug Set",
      brand: "HomeStyle",
      price: 34.99,
      oldPrice: 49.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
      rating: 5,
      reviews: 142,
      isNew: false,
      discount: 30,
    },
    {
      id: 14,
      name: "Stainless Steel Water Bottle",
      brand: "EcoLife",
      price: 24.99,
      oldPrice: 34.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
      rating: 5,
      reviews: 178,
      isNew: false,
      discount: 28,
    },
    {
      id: 15,
      name: "Premium Leather Wallet",
      brand: "LeatherCraft",
      price: 59.99,
      oldPrice: 79.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
      rating: 4,
      reviews: 92,
      isNew: true,
      discount: 25,
    },
    {
      id: 16,
      name: "Wireless Noise Cancelling Headphones",
      brand: "AudioTech",
      price: 189.99,
      oldPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      rating: 4,
      reviews: 215,
      isNew: false,
      discount: 24,
    },
  ],
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 300]);
  
  // Get the category data or use fallback if not found
  const categoryData = categories[categoryId as keyof typeof categories] || fallbackCategory;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Banner */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <img 
          src={categoryData.banner} 
          alt={categoryData.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoryData.name}</h1>
          <p className="text-white text-lg max-w-xl">{categoryData.description}</p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{categoryData.name}</span>
      </div>
      
      {/* Subcategories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categoryData.subcategories.map((subcategory, index) => (
          <Link 
            key={index} 
            to={`/category/${categoryId}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-4 py-2 bg-gray-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
          >
            {subcategory}
          </Link>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <Slider 
                defaultValue={[0, 300]} 
                max={500} 
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <div className="border rounded px-3 py-2 text-sm">
                    ${priceRange[0]}
                  </div>
                </div>
                <span className="text-gray-400">-</span>
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <div className="border rounded px-3 py-2 text-sm">
                    ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="brand-all" />
                  <label htmlFor="brand-all" className="ml-2 text-sm">All Brands</label>
                </div>
                {/* Show unique brands from the category */}
                {Array.from(new Set(categoryData.products.map(p => p.brand))).map((brand, index) => (
                  <div className="flex items-center" key={index}>
                    <Checkbox id={`brand-${index}`} />
                    <label htmlFor={`brand-${index}`} className="ml-2 text-sm">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Customer Ratings</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="rating-5" />
                  <label htmlFor="rating-5" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-4" />
                  <label htmlFor="rating-4" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-3" />
                  <label htmlFor="rating-3" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="availability-in-stock" defaultChecked />
                  <label htmlFor="availability-in-stock" className="ml-2 text-sm">In Stock</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="availability-out-of-stock" />
                  <label htmlFor="availability-out-of-stock" className="ml-2 text-sm">Out of Stock</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="w-full md:w-3/4">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">
                Showing 1-{categoryData.products.length} of {categoryData.products.length} products
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Avg. Customer Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center border rounded">
                <button 
                  className={`px-3 py-1.5 ${view === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button 
                  className={`px-3 py-1.5 ${view === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Products grid or list */}
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                      </div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                      <span className="text-xs text-green-600 ml-2">-{product.discount}% OFF</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Link to={`/products/${product.id}`}>View Details</Link>
                      </Button>
                      <Button className="bg-green-500 hover:bg-green-600">
                        <Link to="/cart">Add to cart</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categoryData.products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative md:w-1/4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 md:h-full object-cover rounded"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            New
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-3/4">
                        <div className="mb-2">
                          <div className="flex text-yellow-400 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} 
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                          </div>
                          <h3 className="font-medium text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, 
                          nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.
                        </p>
                        
                        <div className="flex items-center mb-3">
                          <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                          <span className="text-xs text-green-600 ml-2">-{product.discount}% OFF</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Link to={`/products/${product.id}`}>View Details</Link>
                          </Button>
                          <Button className="bg-green-500 hover:bg-green-600">
                            <Link to="/cart">Add to cart</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="px-2">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 bg-emerald-50 border-emerald-200">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9">
                3
              </Button>
              <Button variant="outline" size="sm" className="px-2">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
