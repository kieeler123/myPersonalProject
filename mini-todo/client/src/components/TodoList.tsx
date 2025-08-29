import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <strong>{todo.title}</strong> - {todo.description}
          <button onClick={() => onDelete(todo.id)}>삭제</button>
          <button
            onClick={() => {
              const newTitle = prompt("새 제목 입력", todo.title);
              const newDesc = prompt("새 설명 입력", todo.description);
              if (newTitle && newDesc) {
                onUpdate({ ...todo, title: newTitle, description: newDesc });
              }
            }}
          >
            수정
          </button>
        </li>
      ))}
    </ul>
  );
}
