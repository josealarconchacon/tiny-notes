import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import CATEGORIES from "../../constants/categoty";

const DEFAULT_CATEGORIES = Object.values(CATEGORIES).filter(
  (category) => category.id !== "general"
);

const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("📌");

  const availableIcons = [
    "📌",
    "🔖",
    "⭐",
    "📊",
    "📅",
    "📚",
    "🏠",
    "💼",
    "🎵",
    "🎮",
    "🍔",
    "🎁",
    "✈️",
    "💰",
    "❤️",
  ];

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryLabel.trim()) return;

    const categoryId = newCategoryLabel.toLowerCase().replace(/\s+/g, "-");
    onAddCategory(categoryId, newCategoryLabel, newCategoryIcon);

    setNewCategoryLabel("");
    setShowAddForm(false);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
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
          <div key={category.id} className="flex items-center">
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`py-1 px-3 rounded-full text-sm ${
                activeCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {category.icon} {category.label}
            </button>

            {/* Don't allow deletion of default categories */}
            {!Object.values(DEFAULT_CATEGORIES).some(
              (c) => c.id === category.id
            ) && (
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="ml-1 text-gray-400 hover:text-red-500"
                aria-label={`Delete ${category.label} category`}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="py-1 px-3 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
        >
          <Plus size={14} className="mr-1" /> New Category
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddCategory}
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4"
        >
          <div className="flex flex-col space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Icon
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewCategoryIcon(icon)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      newCategoryIcon === icon
                        ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Selected icon: {newCategoryIcon}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 mr-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryFilter;
