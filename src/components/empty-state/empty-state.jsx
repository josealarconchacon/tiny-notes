const EmptyState = ({ activeCategory }) => {
  const message =
    activeCategory === "all"
      ? "You don't have any notes yet. Create your first note to get started!"
      : `You don't have any notes in this category yet.`;

  return (
    <div className="text-center py-10">
      <div className="text-4xl mb-4">📝</div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
        No notes found
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
