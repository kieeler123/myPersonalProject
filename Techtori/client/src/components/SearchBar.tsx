const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="검색어를 입력하세요 (제목/설명/태그)"
    className="w-full mb-3 p-2 border rounded"
  />
);
export default SearchBar;
