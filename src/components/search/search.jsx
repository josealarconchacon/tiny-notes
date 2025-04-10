import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export function Search({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg outline-none transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (isExpanded) {
            setSearchQuery("");
            onSearch("");
          }
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle search"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
