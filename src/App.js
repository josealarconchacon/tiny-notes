import useLocalStorage from "./hook/local-storage";
import { useState, useEffect } from "react";
import NoteForm from "./components/note-form/note-form";
import useCategories from "./hook/managing-categories";
import Header from "./components/header/header";
import NotesList from "./components/notes-list/notes-list";
import Footer from "./components/footer/footer";

const App = () => {
  const [notes, setNotes] = useLocalStorage("tinyNotes", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [offlineStatus, setOfflineStatus] = useState(navigator.onLine);
  const { categories, addCategory, deleteCategory } = useCategories();

  // Ensure all notes have string content
  useEffect(() => {
    const hasNonStringContent = notes.some(
      (note) => typeof note.content !== "string"
    );
    if (hasNonStringContent) {
      const fixedNotes = notes.map((note) => ({
        ...note,
        content:
          typeof note.content === "string"
            ? note.content
            : JSON.stringify(note.content),
      }));
      setNotes(fixedNotes);
    }
  }, [notes, setNotes]);

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
    if (typeof newNote.content === "string") {
      setNotes([newNote, ...notes]);
    }
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

  const handleDeleteCategory = (categoryId) => {
    const updatedNotes = notes.map((note) =>
      note.category === categoryId ? { ...note, category: "general" } : note
    );
    setNotes(updatedNotes);

    deleteCategory(categoryId);

    if (activeCategory === categoryId) {
      setActiveCategory("all");
    }
  };

  const filteredNotes = notes.filter((note) => {
    // First filter by category
    if (activeCategory !== "all" && note.category !== activeCategory) {
      return false;
    }

    // Then filter by search query if one exists
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const contentLower = note.content.toLowerCase();
      return contentLower.includes(searchLower);
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto max-w-2xl p-4">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          offlineStatus={offlineStatus}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          addCategory={addCategory}
          handleDeleteCategory={handleDeleteCategory}
          onSearch={setSearchQuery}
        />

        <main>
          <NoteForm onAddNote={addNote} categories={categories} />
          <NotesList
            filteredNotes={filteredNotes}
            onDelete={deleteNote}
            onEdit={editNote}
            categories={categories}
            activeCategory={activeCategory}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
