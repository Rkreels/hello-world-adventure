
import { Link } from 'react-router-dom';

const CategoryExplorer = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Start exploring now</h2>
        <Link to="/categories" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <Link to="/category/grocery" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2203/2203236.png" 
              alt="Grocery" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Grocery</span>
        </Link>
        
        <Link to="/category/home" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1670/1670080.png" 
              alt="Home" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Home</span>
        </Link>
        
        <Link to="/category/fashion" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2331/2331966.png" 
              alt="Fashion" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Fashion</span>
        </Link>
        
        <Link to="/category/electronics" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png" 
              alt="Electronics" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Electronics</span>
        </Link>
        
        <Link to="/category/beauty" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1005/1005586.png" 
              alt="Beauty" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Beauty</span>
        </Link>
        
        <Link to="/category/sports" className="text-center">
          <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/857/857455.png" 
              alt="Sports" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-sm">Sports</span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryExplorer;
