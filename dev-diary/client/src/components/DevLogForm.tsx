import { useState } from "react";
import { createLog, updateLog } from "../services/devlog";

interface Props {
  existing?: { _id: string; title: string; content: string };
  onSuccess: () => void;
}

export default function DevLogForm({ existing, onSuccess }: Props) {
  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (existing) {
      await updateLog(existing._id, { title, content });
    } else {
      await createLog({ title, content });
    }
    onSuccess();
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-32"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        {existing ? "수정하기" : "작성하기"}
      </button>
    </form>
  );
}
