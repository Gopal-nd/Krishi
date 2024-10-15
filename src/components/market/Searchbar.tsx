'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for items..."
          className="w-full p-2 border rounded-md"
        />
        <Button type="submit" className="p-2 bg-blue-500 text-white hover:bg-blue-900 rounded-md">
          Search
        </Button>
      </form>
    );
  };
  
  export default SearchBar;
  