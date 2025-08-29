import type { FC } from "react";

interface Props {
  filter: "all" | "completed" | "active";
  setFilter: (f: "all" | "completed" | "active") => void;
}

const TodoFilter: FC<Props> = ({ filter, setFilter }) => (
  <div className="flex gap-2 mb-4">
    <button
      onClick={() => setFilter("all")}
      className="px-2 py-1 border rounded"
    >
      전체
    </button>
    <button
      onClick={() => setFilter("active")}
      className="px-2 py-1 border rounded"
    >
      미완료
    </button>
    <button
      onClick={() => setFilter("completed")}
      className="px-2 py-1 border rounded"
    >
      완료
    </button>
  </div>
);

export default TodoFilter;
