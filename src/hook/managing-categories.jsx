import useLocalStorage from "./local-storage";
import CATEGORIES from "../constants/categoty";

const useCategories = () => {
  const [categories, setCategories] = useLocalStorage(
    "tinyNotesCategories",
    CATEGORIES
  );

  const addCategory = (id, label, icon) => {
    const newKey = id.toUpperCase();
    setCategories({
      ...categories,
      [newKey]: { id, label, icon },
    });
  };

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
