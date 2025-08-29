interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
}: Props) {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h2 className="mb-3 text-base font-semibold">검색 · 필터</h2>
      <div className="space-y-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="전체">전체</option>
          <option value="공지">공지</option>
          <option value="메모">메모</option>
          <option value="잡담">잡담</option>
        </select>
      </div>
    </aside>
  );
}
