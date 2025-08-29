import type { FC } from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: FC<Props> = ({ todos, onToggle, onDelete }) => (
  <div className="space-y-2">
    {todos.map((todo) => (
      <TodoItem
        key={todo._id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TodoList;
