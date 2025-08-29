import type { FC } from "react";
import type { Todo } from "../types/index";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className="mr-2"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => onDelete(todo._id)} className="text-red-500">
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
