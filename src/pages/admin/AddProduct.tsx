
import { useState } from 'react';
import { Search, Plus, Calendar, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AddProduct = () => {
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);
  const [taxIncluded, setTaxIncluded] = useState(true);
  
  const handlePublish = () => {
    toast({
      title: "Product published",
      description: "Your product has been published successfully.",
    });
  };

  const handleSaveToDraft = () => {
    toast({
      title: "Product saved",
      description: "Your product has been saved to drafts.",
    });
  };

  const colorOptions = [
    { name: 'Mint', color: 'bg-green-200' },
    { name: 'Pink', color: 'bg-pink-200' },
    { name: 'Blue', color: 'bg-blue-200' },
    { name: 'Cream', color: 'bg-yellow-100' },
    { name: 'Black', color: 'bg-gray-800' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search data, users, or reports"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button variant="ghost">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Button>
          <Button variant="ghost">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </Button>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img src="/avatar.png" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Add New Product</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search product for add"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handlePublish}
            >
              Publish Product
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleSaveToDraft}
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save to draft
            </Button>
            <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Basic Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <Input defaultValue="iPhone 15" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Description</label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      rows={5}
                      defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum."
                    ></textarea>
                    <div className="flex justify-end mt-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 15L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Pricing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Price</label>
                      <div className="relative">
                        <Input 
                          defaultValue="999.89" 
                          className="pl-[4.5rem]"
                        />
                        <div className="absolute left-0 top-0 h-full flex items-center border-r px-3">
                          <span className="flex items-center">
                            <img src="/us-flag.svg" alt="US" className="h-5 w-5 mr-1" />
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Discounted Price (Optional)</label>
                      <div className="flex items-center space-x-3">
                        <div className="w-12">
                          <Input 
                            defaultValue="$" 
                            className="text-center"
                            readOnly
                          />
                        </div>
                        <div className="flex-1">
                          <Input defaultValue="99" />
                        </div>
                        <div className="text-sm text-gray-500">Sale= $900.89</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Tax Included</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="tax" 
                            className="h-4 w-4 text-primary"
                            checked={taxIncluded}
                            onChange={() => setTaxIncluded(true)}
                          />
                          <span className="ml-2 text-sm">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="tax" 
                            className="h-4 w-4 text-primary"
                            checked={!taxIncluded}
                            onChange={() => setTaxIncluded(false)}
                          />
                          <span className="ml-2 text-sm">No</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <Input placeholder="Start" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="relative">
                          <Input placeholder="End" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Inventory</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                        <Input defaultValue="Unlimited" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Stock Status</label>
                        <div className="relative">
                          <Input defaultValue="In Stock" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={isUnlimited}
                          onChange={() => setIsUnlimited(!isUnlimited)}
                        />
                        <div className={`relative w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 ${isUnlimited ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                          <div className={`absolute w-5 h-5 rounded-full bg-white transition-transform ${isUnlimited ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">Unlimited</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        checked={isFeatured}
                        onChange={() => setIsFeatured(!isFeatured)}
                      />
                      <label className="ml-2 text-sm">Highlight this product in a featured section.</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={handleSaveToDraft}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save to draft
                  </Button>
                  <Button 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    onClick={handlePublish}
                  >
                    Publish Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Upload Product Image</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Image</label>
                    <div className="border rounded-md p-4 mb-4">
                      <div className="rounded-md overflow-hidden bg-gray-100 mb-4">
                        <img 
                          src="/products/iphone.jpg" 
                          alt="iPhone 15" 
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Browse
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Replace
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="border rounded-md p-2 flex items-center justify-center relative">
                        <img 
                          src="/products/iphone-black.jpg" 
                          alt="iPhone Black" 
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute -top-2 -right-2 bg-white rounded-full h-5 w-5 flex items-center justify-center border">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        </div>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-center relative">
                        <img 
                          src="/products/iphone-white.jpg" 
                          alt="iPhone White" 
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute -top-2 -right-2 bg-white rounded-full h-5 w-5 flex items-center justify-center border">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        </div>
                      </div>
                      <div className="border rounded-md p-2 border-dashed flex flex-col items-center justify-center">
                        <Plus className="h-6 w-6 text-emerald-500 mb-1" />
                        <span className="text-xs text-emerald-500">Add Image</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Categories</label>
                    <div className="relative">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-10">
                        <option>Select your product</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Tag</label>
                    <div className="relative">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-10">
                        <option>Select your product</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Select your color</label>
                    <div className="flex space-x-3 mt-2">
                      {colorOptions.map((color, index) => (
                        <div key={index} className={`w-10 h-10 rounded-md ${color.color}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
