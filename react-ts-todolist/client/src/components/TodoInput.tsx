import type { FC } from "react";

interface Props {
  text: string;
  setText: (text: string) => void;
  onAdd: () => void;
}

const TodoInput: FC<Props> = ({ text, setText, onAdd }) => (
  <div className="flex gap-2 mb-4">
    <input
      type="text"
      className="border rounded px-2 py-1 w-full"
      placeholder="할 일을 입력하세요"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button
      onClick={onAdd}
      className="bg-blue-500 text-white px-4 py-1 rounded"
    >
      추가
    </button>
  </div>
);

export default TodoInput;
