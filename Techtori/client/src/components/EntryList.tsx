import { api } from "../services/api";
import type { Entry } from "../types";

const EntryList = ({
  entries = [],
  onRefresh,
}: {
  entries?: Entry[];
  onRefresh: () => void;
}) => {
  const safeEntries = Array.isArray(entries) ? entries : [];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await api.delete(`/api/entries/${id}`);
    onRefresh();
  };

  if (!safeEntries.length) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        등록된 항목이 없어요. 상단 폼에서 먼저 추가해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeEntries.map((entry) => (
        <div
          key={entry._id || entry.title}
          className="bg-white p-4 rounded shadow"
        >
          <h2 className="text-xl font-bold">{entry.title}</h2>
          <p>{entry.description}</p>
          {entry.url && (
            <a
              href={entry.url}
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              {entry.url}
            </a>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {entry.tags?.join(", ")}
          </div>
          <button
            onClick={() => handleDelete(entry._id)}
            className="text-red-500 text-sm mt-2"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};
export default EntryList;
