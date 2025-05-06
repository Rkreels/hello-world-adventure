
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="What you're looking for"
          className="pl-4 pr-12 py-2 w-full bg-gray-50 border-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="sm"
          className="absolute right-0 rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          <Search className="h-4 w-4" />
          <span className="ml-1">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
