
import { Link } from 'react-router-dom';
import { MoreHorizontal, ChevronRight, Filter, Search, Plus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // Sample data for dashboard
  const stats = [
    { 
      title: 'Total Sales', 
      value: '$350K', 
      percentage: '+10.4%', 
      period: 'Last 7 days',
      secondary: 'Previous 7days: ($235)'
    },
    { 
      title: 'Total Orders', 
      value: '10.7K', 
      percentage: '+14.4%', 
      period: 'Last 7 days',
      secondary: 'Previous 7days: (7.6k)'
    },
    { 
      title: 'Pending & Canceled', 
      values: [
        { label: 'Pending', value: '509', description: 'user 204' },
        { label: 'Canceled', value: '94', description: '+14.4%' }
      ],
      period: 'Last 7 days'
    }
  ];

  const reportStats = [
    { label: 'Customers', value: '52k' },
    { label: 'Total Products', value: '3.5k' },
    { label: 'Stock Products', value: '2.5k' },
    { label: 'Out of Stock', value: '0.5k' },
    { label: 'Revenue', value: '250k' }
  ];

  const userStats = {
    label: 'Users in last 30 minutes',
    value: '21.5K',
    graph: [
      25, 30, 28, 35, 32, 38, 30, 32, 35, 40, 38, 35,
      40, 42, 38, 35, 40, 38, 35, 30, 32, 28, 30, 35
    ]
  };

  const salesByCountry = [
    { country: 'US', flag: '🇺🇸', value: '30k', percentage: '+25.8%' },
    { country: 'Brazil', flag: '🇧🇷', value: '30k', percentage: '-19.8%' },
    { country: 'Australia', flag: '🇦🇺', value: '25k', percentage: '+35.8%' }
  ];

  const topProducts = [
    { 
      name: 'Apple iPhone 13', 
      image: '/products/iphone.jpg', 
      price: '$999.00',
      info: 'Item: #FX2-4567'
    },
    { 
      name: 'Nike Air Jordan', 
      image: '/products/nike.jpg', 
      price: '$72.40',
      info: 'Item: #FX2-4567'
    },
    { 
      name: 'T-shirt', 
      image: '/products/tshirt.jpg', 
      price: '$35.40',
      info: 'Item: #FX2-4567'
    },
    { 
      name: 'Assorted Cross Bag', 
      image: '/products/bag.jpg', 
      price: '$80.00',
      info: 'Item: #FX2-4567'
    }
  ];

  const recentTransactions = [
    { id: '#6545', customer: 'John Doe', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$64' },
    { id: '#5412', customer: 'Jane Smith', date: '01 Oct | 11:29 am', status: 'Pending', amount: '$557' },
    { id: '#6622', customer: 'Emily Davis', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$156' },
    { id: '#6462', customer: 'Mike Johnson', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$265' },
    { id: '#6462', customer: 'Sarah Wilson', date: '01 Oct | 11:29 am', status: 'Paid', amount: '$265' }
  ];

  const bestSellingProducts = [
    { id: 1, name: 'Apple iPhone 13', image: '/products/iphone.jpg', orders: 104, status: 'Stock', price: '$999.00' },
    { id: 2, name: 'Nike Air Jordan', image: '/products/nike.jpg', orders: 56, status: 'Stock out', price: '$999.00' },
    { id: 3, name: 'T-shirt', image: '/products/tshirt.jpg', orders: 266, status: 'Stock', price: '$999.00' },
    { id: 4, name: 'Cross Bag', image: '/products/bag.jpg', orders: 506, status: 'Stock', price: '$999.00' }
  ];

  const newProducts = [
    { name: 'Smart Fitness Tracker', price: '$39.99', image: '/products/tracker.jpg' },
    { name: 'Leather Wallet', price: '$19.99', image: '/products/wallet.jpg' },
    { name: 'Electric Hair Trimmer', price: '$24.99', image: '/products/trimmer.jpg' }
  ];

  const categories = [
    { name: 'Electronic', icon: '💻' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Home', icon: '🏠' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm text-gray-500">{stat.title}</h3>
                  <p className="text-sm text-gray-500">{stat.period}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {stat.value ? (
                <>
                  <div className="flex items-baseline mb-1">
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    {stat.title === 'Total Sales' && <span className="ml-1 text-sm text-gray-500">Sales</span>}
                    {stat.title === 'Total Orders' && <span className="ml-1 text-sm text-gray-500">order</span>}
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs ${stat.percentage?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.percentage}
                    </span>
                    {stat.secondary && <span className="ml-2 text-xs text-gray-500">{stat.secondary}</span>}
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  {stat.values?.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-semibold">{item.value}</span>
                      </div>
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  Details <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Weekly Report Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Report for this week</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">This week</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Last week</Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center gap-4 mb-4">
                {reportStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl font-semibold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="h-64 w-full bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-md relative">
                {/* Chart placeholder */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600">
                  Weekly Sales Chart
                </div>
                <div className="absolute top-12 right-1/4 bg-emerald-100 px-2 py-1 rounded-md text-xs">
                  <div className="text-emerald-700">Thursday</div>
                  <div className="text-emerald-700 font-semibold">25,409</div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span className="text-emerald-700 font-semibold">Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{userStats.label}</h3>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-3xl font-semibold mb-2">{userStats.value}</div>
              <div className="text-xs mb-4">Users per minute</div>
              
              <div className="h-20 flex items-end space-x-1">
                {userStats.graph.map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-emerald-500 w-2 rounded-t-sm" 
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Sales by Country</h3>
                <div className="text-xs">Sales</div>
              </div>
              
              <div className="space-y-4">
                {salesByCountry.map((country, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 mr-3 text-xl">{country.flag}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{country.country}</span>
                        <span className="text-sm font-semibold">{country.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full ${country.percentage.startsWith('+') ? 'bg-blue-600' : 'bg-red-500'}`}
                          style={{ width: `${Math.abs(parseInt(country.percentage))}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">
                        <span className={country.percentage.startsWith('+') ? 'text-green-600' : 'text-red-500'}>
                          {country.percentage}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Insight
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Transactions and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Transaction</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500">
                      <th className="pb-3">No.</th>
                      <th className="pb-3">Id Customer</th>
                      <th className="pb-3">Order Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 text-sm">{index + 1}.</td>
                        <td className="py-3 text-sm">{transaction.id}</td>
                        <td className="py-3 text-sm">{transaction.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            transaction.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              transaction.status === 'Paid' ? 'bg-green-600' : 'bg-yellow-600'
                            }`}></span>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm">{transaction.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Top Products</h3>
                <div className="text-xs">
                  <Button variant="link" size="sm" className="text-xs p-0">All product</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 mr-4 rounded overflow-hidden bg-gray-100">
                      {/* Placeholder for product image */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        {product.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.info}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Best Selling Products */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Best selling product</h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">PRODUCT</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">TOTAL ORDER</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">STATUS</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">PRICE</th>
                </tr>
              </thead>
              <tbody>
                {bestSellingProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-100">
                          {/* Placeholder for product image */}
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            {product.name.charAt(0)}
                          </div>
                        </div>
                        <span className="text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.orders}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        product.status === 'Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          product.status === 'Stock' ? 'bg-green-600' : 'bg-red-600'
                        }`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Add New Product */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Add New Product</h3>
            <Button variant="outline" size="sm" className="text-emerald-600">
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="border rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{category.icon}</div>
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <Button variant="link" size="sm" className="text-xs">See more</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Product</h4>
            <div className="space-y-3">
              {newProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-100">
                      {/* Placeholder for product image */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        {product.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.price}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full bg-emerald-50 text-emerald-600 border-emerald-200">
                    Add
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Button variant="link" size="sm" className="text-xs">See more</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" size="sm" className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" className="bg-emerald-50 text-emerald-600 border-emerald-200">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
          <Button variant="ghost" size="sm">4</Button>
          <Button variant="ghost" size="sm">5</Button>
          <span>.....</span>
          <Button variant="ghost" size="sm">24</Button>
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
