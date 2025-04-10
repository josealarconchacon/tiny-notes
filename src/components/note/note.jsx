import { useState } from "react";
import CATEGORIES from "../../constants/categoty";
import { Trash2 } from "lucide-react";

const Note = ({ note, onDelete, onEdit, categories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    typeof note.content === "string"
      ? note.content
      : JSON.stringify(note.content)
  );
  // Edit the note
  const handleEdit = () => {
    if (typeof editedContent === "string") {
      onEdit(note.id, editedContent);
      setIsEditing(false);
    }
  };

  // Handle key down event
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
  };

  // Find the category details for this note
  const categoryKey = Object.keys(categories).find(
    (key) => categories[key].id === note.category
  );
  const category = categoryKey
    ? categories[categoryKey]
    : { icon: "📝", label: "Note" };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {category.icon} {category.label}
        </span>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            autoFocus
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 mr-2 text-sm rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-1 text-sm text-white rounded bg-blue-500 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap cursor-pointer"
        >
          {typeof note.content === "string"
            ? note.content
            : JSON.stringify(note.content)}
        </p>
      )}

      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        {new Date(note.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default Note;
