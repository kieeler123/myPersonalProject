// CreatePost.tsx
import { useState } from "react";
import { api } from "./api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = async () => {
    try {
      const res = await api.post("/posts", { title, content });
      alert("생성 완료: " + res.data.message);
    } catch (e) {
      alert("로그인 필요");
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={create}>글 작성</button>
    </div>
  );
}
