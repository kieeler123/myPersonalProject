interface Props {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function SearchFilter({ keyword, setKeyword }: Props) {
  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="검색어로 필터링"
    />
  );
}
