import { useState } from "react";
import { CirclePlus } from "lucide-react";

const NoteForm = ({ onAddNote, categories }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 w-full p-2 text-left text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <CirclePlus size={18} />
          <span>Add a new note...</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows={3}
            autoFocus
          />

          <div className="flex justify-between items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              {Object.values(categories).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>

            <div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 mr-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
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
