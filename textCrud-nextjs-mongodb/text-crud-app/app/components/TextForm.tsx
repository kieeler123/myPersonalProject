"use client";

import { useState, useEffect } from "react";

interface Props {
  onSubmit: (text: string) => void;
  editing?: boolean;
  defaultText?: string;
}

export default function TextForm({
  onSubmit,
  editing = false,
  defaultText = "",
}: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="내용을 입력하세요"
        className="form-input"
      />
      <button type="submit" className="form-button">
        {editing ? "수정 완료" : "추가"}
      </button>
    </form>
  );
}
