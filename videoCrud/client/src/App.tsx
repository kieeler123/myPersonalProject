import React, { Suspense, useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import api from "./api";
import type { Paginated, VideoDoc } from "./types";

export default function App() {
  const [items, setItems] = useState<VideoDoc[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"createdAt" | "title">("createdAt");

  const VideoCard = React.lazy(() => import("./components/VideoCard"));

  const load = async () => {
    const { data } = await api.get<Paginated<VideoDoc>>("/api/videos", {
      params: { q, sort, page: 1, limit: 50 },
    });
    setItems(data.items);
  };

  useEffect(() => {
    load();
  }, [q, sort]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold">Video CRUD</h1>
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2 w-64"
            placeholder="검색(제목/설명)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="createdAt">최신순</option>
            <option value="title">제목순</option>
          </select>
          <button className="border rounded px-3 py-2" onClick={load}>
            새로고침
          </button>
        </div>
      </header>

      <UploadForm onUploaded={load} />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <div className="text-gray-500">데이터가 없습니다.</div>
        )}
        {items.map((v) => (
          <div key={v._id}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore (VideoCard default export uses props) */}
            {items.map((v) => (
              <Suspense fallback={<div>로딩중...</div>} key={v._id}>
                <VideoCard v={v} onChanged={load} />
              </Suspense>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
