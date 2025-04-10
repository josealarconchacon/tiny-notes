import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const [isExpanded, setIsExpanded] = useState(false);

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
          className={`w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
