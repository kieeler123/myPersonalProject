"use client";

import { useEffect, useState } from "react";
import TextForm from "./components/TextForm";
import TextItem from "./components/TextItem";

interface TextData {
  _id: string;
  content: string;
}

export default function HomePage() {
  const [texts, setTexts] = useState<TextData[]>([]);
  const [edit, setEdit] = useState<{ index: number; id: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch("/api/texts");
        if (!res.ok) throw new Error("데이터 로드 실패");
        const data = await res.json();
        setTexts(data);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        alert("데이터 로드 중 오류가 발생했습니다.");
      }
    };
    fetchTexts();
  }, []);

  useEffect(() => {
    // 다크모드 초기 상태 확인
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  const addText = async (text: string) => {
    if (edit) {
      try {
        const res = await fetch(`/api/texts/${edit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
        if (!res.ok) throw new Error("수정 실패");

        const updatedTexts = [...texts];
        updatedTexts[edit.index] = {
          ...updatedTexts[edit.index],
          content: text,
        };
        setTexts(updatedTexts);
        setEdit(null);
      } catch (err) {
        console.error("수정 중 오류:", err);
        alert("수정에 실패했습니다.");
      }
    } else {
      try {
        const res = await fetch("/api/texts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
        if (!res.ok) throw new Error("추가 실패");

        const result = await res.json();
        setTexts([{ _id: result._id, content: result.content }, ...texts]);
      } catch (err) {
        console.error("추가 중 오류:", err);
        alert("텍스트 추가에 실패했습니다.");
      }
    }
  };

  const deleteText = async (id: string) => {
    try {
      const res = await fetch(`/api/texts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");

      setTexts(texts.filter((t) => t._id !== id));
    } catch (err) {
      console.error("삭제 중 오류:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <main className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="box">
        <div className="header">
          <h1 className="title">📝 텍스트 CRUD</h1>
          <button onClick={toggleDarkMode} className="toggle">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <TextForm
          onSubmit={addText}
          editing={edit !== null}
          defaultText={edit ? texts[edit.index].content : ""}
        />

        <div className="list">
          {texts.map((text, idx) => (
            <TextItem
              key={text._id || `${text.content}-${idx}`}
              text={text.content}
              onDelete={() => deleteText(text._id)}
              onEdit={() => setEdit({ index: idx, id: text._id })}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
