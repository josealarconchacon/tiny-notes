const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onSelectCategory("all")}
        className={`py-1 px-3 rounded-full text-sm ${
          activeCategory === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        All
      </button>
      {Object.values(categories).map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`py-1 px-3 rounded-full text-sm ${
            activeCategory === category.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {category.icon} {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
