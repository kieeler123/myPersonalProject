import { useState } from "react";
import type { Todo } from "../types/todo";

interface Props {
  onAdd: (todo: Todo) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
    };

    onAdd(newTodo);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
      />
      <button type="submit">추가</button>
    </form>
  );
}
