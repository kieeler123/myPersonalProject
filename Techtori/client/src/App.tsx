import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Entry } from "./types";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState({
    tags: "",
    from: "",
    to: "",
    sort: "desc" as "asc" | "desc",
  });

  const dq = useDebounce(q, 300);
  const dfilter = useDebounce(filter, 300);
  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { page, limit, sort: dfilter.sort };
      if (dq) params.q = dq;
      if (dfilter.tags) params.tags = dfilter.tags;
      if (dfilter.from) params.from = dfilter.from;
      if (dfilter.to) params.to = dfilter.to;

      const res = await api.get("/api/entries", { params });
      const payload = res.data;
      const list = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
        ? payload
        : [];

      setEntries(Array.isArray(list) ? list : []);
      setTotal(
        Number(payload?.total ?? (Array.isArray(list) ? list.length : 0))
      );
    } catch (e: any) {
      setEntries([]);
      setTotal(0);
      setError(e?.message || "데이터를 불러오지 못했습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dq, dfilter]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">TechTori 🐦</h1>

      <EntryForm
        onSuccess={() => {
          setPage(1);
          fetchEntries();
        }}
      />

      <div className="bg-white p-4 rounded shadow mb-4">
        <SearchBar value={q} onChange={setQ} />
        <FilterBar value={filter} onChange={setFilter} />
        <div className="text-sm text-gray-600">총 {total}건</div>
      </div>

      {error && <div className="mb-3 text-red-600">{error}</div>}
      {loading ? (
        <div className="bg-white p-4 rounded shadow">로딩 중...</div>
      ) : (
        <EntryList entries={entries ?? []} onRefresh={fetchEntries} />
      )}

      {/* 페이지네이션 */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded bg-white shadow"
        >
          이전
        </button>
        <span>페이지 {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded bg-white shadow"
        >
          다음
        </button>
      </div>
    </div>
  );
}
export default App;
