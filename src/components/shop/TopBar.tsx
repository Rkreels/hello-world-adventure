
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">DEALPORT</span>
            </Link>
          </div>
          
          {/* Address, Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">Deliver to</span>
              <span className="font-semibold ml-1">Your address</span>
            </div>
            
            <div className="flex items-center text-sm mx-4">
              <div className="flex items-center border rounded p-1">
                <span className="mr-1">🇺🇸</span>
                <span>EN</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
