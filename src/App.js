import useLocalStorage from "./hook/local-storage";
import { useState, useEffect } from "react";
import CATEGORIES from "./constants/categoty";
import Note from "./components/note/note";
import NoteForm from "./components/note-form/note-form";
import CategoryFilter from "./components/filter/filter";
import EmptyState from "./components/empty-state/empty-state";
import ThemeToggle from "./components/theme-toggle/theme-toggle";
import useCategories from "./hook/managing-categories";

function App() {
  const [notes, setNotes] = useLocalStorage("tinyNotes", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [offlineStatus, setOfflineStatus] = useState(navigator.onLine);
  const { categories, addCategory, deleteCategory } = useCategories();

  // Handle offline/online status
  useEffect(() => {
    const handleOnline = () => setOfflineStatus(true);
    const handleOffline = () => setOfflineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newContent) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, content: newContent, timestamp: Date.now() }
          : note
      )
    );
  };

  // When a category is deleted, change the category of affected notes to 'general'
  const handleDeleteCategory = (categoryId) => {
    // First, update any notes that use this category
    const updatedNotes = notes.map((note) =>
      note.category === categoryId ? { ...note, category: "general" } : note
    );
    setNotes(updatedNotes);

    // Then delete the category
    deleteCategory(categoryId);

    // If we're currently viewing the deleted category, switch to 'all'
    if (activeCategory === categoryId) {
      setActiveCategory("all");
    }
  };

  const filteredNotes =
    activeCategory === "all"
      ? notes
      : notes.filter((note) => note.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto max-w-2xl p-4">
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
              <ThemeToggle
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
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

        <main>
          <NoteForm onAddNote={addNote} categories={categories} />

          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onEdit={editNote}
                categories={categories}
              />
            ))
          ) : (
            <EmptyState activeCategory={activeCategory} />
          )}
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Tiny Notes App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
