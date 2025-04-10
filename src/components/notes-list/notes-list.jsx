import React from "react";
import Note from "../note/note";
import EmptyState from "../empty-state/empty-state";

const NotesList = ({
  filteredNotes,
  onDelete,
  onEdit,
  categories,
  activeCategory,
}) => {
  return (
    <div>
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            categories={categories}
          />
        ))
      ) : (
        <EmptyState activeCategory={activeCategory} />
      )}
    </div>
  );
};

export default NotesList;
