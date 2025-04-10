import React from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import CategoryFilter from "../filter/filter";

const Header = ({
  darkMode,
  toggleDarkMode,
  offlineStatus,
  categories,
  activeCategory,
  setActiveCategory,
  addCategory,
  handleDeleteCategory,
}) => {
  return (
    <header className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Tiny Notes
        </h1>
        <div className="flex items-center gap-3">
          {!offlineStatus && (
            <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 py-1 px-2 rounded">
              Offline Mode
            </span>
          )}
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={addCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </header>
  );
};

export default Header;
