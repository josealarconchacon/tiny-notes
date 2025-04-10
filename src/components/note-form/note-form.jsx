import { useState, useRef, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import FormattingToolbar from "../formatting-toolbar/formatting-toolbar";

const NoteForm = ({ onAddNote, categories }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef(null);

  // Show toolbar when editor is expanded
  useEffect(() => {
    if (isExpanded) {
      setShowToolbar(true);
      // Focus the editor when expanded
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 0);
    } else {
      setShowToolbar(false);
    }
  }, [isExpanded]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editorRef.current || document.activeElement !== editorRef.current)
        return;

      if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            document.execCommand("bold", false, null);
            break;
          case "i":
            e.preventDefault();
            document.execCommand("italic", false, null);
            break;
          case "u":
            e.preventDefault();
            document.execCommand("underline", false, null);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddNote({
      id: Date.now().toString(),
      content: content.trim(),
      category,
      timestamp: Date.now(),
    });

    setContent("");
    setIsExpanded(false);
  };

  const handleInput = (e) => {
    const html = e.target.innerHTML;
    setContent(html);

    // If the content is empty, clear the editor to show placeholder
    if (!html.trim() && editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    // Get clipboard content
    const clipboardData = e.clipboardData || window.clipboardData;
    let pastedData =
      clipboardData.getData("text/html") || clipboardData.getData("text/plain");

    // If it's HTML, clean it up
    if (clipboardData.types.includes("text/html")) {
      // Create a temporary div to parse the HTML
      const temp = document.createElement("div");
      temp.innerHTML = pastedData;

      // Remove any scripts
      const scripts = temp.getElementsByTagName("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }

      // Remove any styles
      const styles = temp.getElementsByTagName("style");
      for (let i = styles.length - 1; i >= 0; i--) {
        styles[i].parentNode.removeChild(styles[i]);
      }

      pastedData = temp.innerHTML;
    }

    // Insert the cleaned content
    document.execCommand("insertHTML", false, pastedData);
  };

  const handleKeyUp = (e) => {
    // Handle enter key to ensure proper formatting
    if (e.key === "Enter" && !e.shiftKey) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement("br");
      range.deleteContents();
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 w-full p-3 text-left text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <CirclePlus size={18} />
          <span>Add a new note...</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col border rounded-lg dark:border-gray-600 overflow-hidden">
            {showToolbar && (
              <div className="border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <FormattingToolbar editorRef={editorRef} />
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onPaste={handlePaste}
              onKeyUp={handleKeyUp}
              className="w-full p-4 dark:bg-gray-700 dark:text-white min-h-[150px] outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 dark:empty:before:text-gray-500 empty:before:float-left prose dark:prose-invert max-w-none"
              data-placeholder="What's on your mind?"
              suppressContentEditableWarning
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            >
              {Object.values(categories).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                Add Note
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NoteForm;
