import { Sun, Moon } from "lucide-react";
import { Search } from "../search/search";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center gap-2">
      <Search />
      <button
        onClick={toggleDarkMode}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
};

export default ThemeToggle;
