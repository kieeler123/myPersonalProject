export const saveTodos = (todos: any[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const loadTodos = () => {
  const saved = localStorage.getItem("todos");
  try {
    const parsed = JSON.parse(saved || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
