import { useState } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchTerm);
    };
  
    return (
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for items..."
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>
    );
  };
  
  export default SearchBar;
  