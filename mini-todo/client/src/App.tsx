import { useState } from "react";
import type { Todo } from "./types/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [keyword, setKeyword] = useState("");

  const handleAdd = (todo: Todo) => setTodos([...todos, todo]);

  const handleDelete = (id: number) =>
    setTodos(todos.filter((t) => t.id !== id));

  const handleUpdate = (updated: Todo) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <h1>✅ Mini Todo 관리자</h1>
      <SearchFilter keyword={keyword} setKeyword={setKeyword} />
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={filteredTodos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
