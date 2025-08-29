// client/src/components/EntryForm.tsx
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../services/api";
import type { Entry } from "../types";

const EntryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // 폼 전체를 draft로만 관리 (LocalStorage에 자동 저장/복원)
  const [draft, setDraft] = useLocalStorage("tt:v1:draft", {
    title: "",
    description: "",
    url: "",
    tags: "", // 쉼표 구분 문자열
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = draft.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Omit<Entry, "_id"> = {
      title: draft.title,
      description: draft.description,
      url: draft.url,
      tags,
    };

    await api.post("/api/entries", payload);
    onSuccess(); // 상위에서 fetchEntries 등 호출

    // 제출 성공 후 폼/로컬스토리지 모두 초기화
    setDraft({ title: "", description: "", url: "", tags: "" });
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded shadow mb-6 space-y-2"
    >
      <input
        name="title"
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        placeholder="제목"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        placeholder="설명"
        className="w-full p-2 border rounded"
      />
      <input
        name="url"
        value={draft.url}
        onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        placeholder="URL"
        className="w-full p-2 border rounded"
      />
      <input
        name="tags"
        value={draft.tags}
        onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
        placeholder="태그 (쉼표로 구분)"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        등록
      </button>
    </form>
  );
};

export default EntryForm;
