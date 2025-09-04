import { useState } from "react";
import api from "../api";
import type { VideoDoc } from "../types";

interface Props {
  v: VideoDoc;
  onChanged: () => void;
}

export default function VideoCard({ v, onChanged }: Props) {
  const [title, setTitle] = useState(v.title);
  const [desc, setDesc] = useState(v.description);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/api/videos/${v._id}`, { title, description: desc });
      onChanged();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("정말 삭제할까요?")) return;
    await api.delete(`/api/videos/${v._id}`);
    onChanged();
  };

  const streamUrl = `${import.meta.env.VITE_API_BASE_URL}/api/videos/${
    v._id
  }/stream`;
  const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/videos/${
    v._id
  }/download`;

  return (
    <div className="border rounded-2xl p-3 space-y-2 shadow-sm">
      <video
        className="w-full rounded"
        src={streamUrl}
        controls
        preload="metadata"
      />
      <input
        className="w-full border rounded px-2 py-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded px-2 py-1"
        rows={2}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="text-sm text-gray-500">
        {(v.length / 1024 / 1024).toFixed(1)}MB ·{" "}
        {new Date(v.createdAt).toLocaleString()}
      </div>
      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="px-3 py-1 rounded-xl bg-blue-600 text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        <button
          onClick={remove}
          className="px-3 py-1 rounded-xl bg-red-600 text-white"
        >
          삭제
        </button>
        <a className="px-3 py-1 rounded-xl border" href={downloadUrl}>
          다운로드
        </a>
      </div>
    </div>
  );
}
