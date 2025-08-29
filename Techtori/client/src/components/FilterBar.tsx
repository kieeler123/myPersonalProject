type Filter = { tags: string; from: string; to: string; sort: "asc" | "desc" };
const FilterBar = ({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) => {
  const handle = (k: keyof Filter, v: string) =>
    onChange({ ...value, [k]: v } as Filter);
  return (
    <div className="grid md:grid-cols-4 gap-2 bg-white p-3 rounded shadow mb-4">
      <input
        placeholder="태그: 쉼표로 구분"
        value={value.tags}
        onChange={(e) => handle("tags", e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="date"
        value={value.from}
        onChange={(e) => handle("from", e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="date"
        value={value.to}
        onChange={(e) => handle("to", e.target.value)}
        className="p-2 border rounded"
      />
      <select
        value={value.sort}
        onChange={(e) => handle("sort", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </select>
    </div>
  );
};
export default FilterBar;
