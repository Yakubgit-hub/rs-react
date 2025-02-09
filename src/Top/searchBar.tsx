import React from "react";

interface SearchBarProps {
   query: string;
   setQuery: (query: string) => void;
   handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, handleSearch }) => {
   return (
      <div className="search-container">
         <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
         <button onClick={handleSearch}>Найти</button>
      </div>
   );
};

export default SearchBar;