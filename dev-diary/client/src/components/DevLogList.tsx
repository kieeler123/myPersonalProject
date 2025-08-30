import { useEffect, useState } from "react";
import { fetchLogs, deleteLog } from "../services/devlog";
import DevLogForm from "./DevLogForm";

export default function DevLogList() {
  const [logs, setLogs] = useState<any[]>([]); // 초기값은 빈 배열
  const [editLog, setEditLog] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    const logs = await fetchLogs();
    setLogs(logs); // ✅ 배열 그대로 사용
  };

  useEffect(() => {
    if (!search.trim()) {
      setFilteredLogs(logs);
    } else {
      const lower = search.toLowerCase();
      const filtered = logs.filter(
        (log) =>
          log.title.toLowerCase().includes(lower) ||
          log.content.toLowerCase().includes(lower)
      );
      setFilteredLogs(filtered);
    }
  }, [search, logs]);

  return (
    <div className="space-y-6">
      {/* 검색 입력 UI 추가 */}
      {filteredLogs.length === 0 && (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
      <input
        type="text"
        placeholder="제목 또는 내용 검색"
        className="border px-3 py-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DevLogForm
        existing={editLog}
        onSuccess={() => {
          setEditLog(null);
          loadLogs();
        }}
      />
      {filteredLogs?.map((log) => (
        <div key={log._id} className="border p-4 rounded">
          <h2 className="text-xl font-bold">{log.title}</h2>
          <p className="text-gray-600">{log.content}</p>
          <div className="mt-2 space-x-2">
            <button className="text-blue-600" onClick={() => setEditLog(log)}>
              수정
            </button>
            <button
              className="text-red-600"
              onClick={async () => {
                await deleteLog(log._id);
                loadLogs();
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
