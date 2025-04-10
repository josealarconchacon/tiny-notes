import useLocalStorage from "./local-storage";
import CATEGORIES from "../constants/categoty";

const useCategories = () => {
  // Initialize categories from local storage or use default categories
  const [categories, setCategories] = useLocalStorage(
    "tinyNotesCategories",
    CATEGORIES
  );

  // Add a new category
  const addCategory = (id, label, icon) => {
    const newKey = id.toUpperCase();
    setCategories({
      ...categories,
      [newKey]: { id, label, icon },
    });
  };

  // Delete a category
  const deleteCategory = (categoryId) => {
    const updatedCategories = { ...categories };
    const keyToDelete = Object.keys(updatedCategories).find(
      (key) => updatedCategories[key].id === categoryId
    );

    if (keyToDelete) {
      delete updatedCategories[keyToDelete];
      setCategories(updatedCategories);
    }
  };

  return { categories, addCategory, deleteCategory };
};

export default useCategories;
