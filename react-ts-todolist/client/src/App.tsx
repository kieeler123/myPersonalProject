// 📁 App.tsx (리팩토링된 형태)
import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import type { Todo } from "./types";
import { useEffect } from "react";
import { loadTodos, saveTodos } from "./utils/localStorage";
import api from "./api/api";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  useEffect(() => {
    const local = loadTodos();
    setTodos(Array.isArray(local) ? local : []);
    fetchTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.warn("서버 연결 실패, 로컬 데이터로 동작 중");
    }
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    const res = await api.post("/todos", { text });
    setTodos([res.data, ...todos]);
    setText("");
  };

  const handleToggle = async (id: string) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    const updated = await api.put(`/todos/${id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === id ? updated.data : t)));
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const filtered = todos
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "active") return !t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>
      <TodoInput text={text} setText={setText} onAdd={handleAdd} />
      <input
        type="text"
        placeholder="검색..."
        className="border px-2 py-1 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filtered}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
