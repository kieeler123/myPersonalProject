import { useEffect, useMemo, useState } from "react";
import api from "./api";
import type { Post } from "./types/post";
import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function App() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const cached = localStorage.getItem("postsCache");
    return cached ? (JSON.parse(cached) as Post[]) : [];
  });

  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem("searchTerm") || ""
  );
  const [category, setCategory] = useState(
    () => localStorage.getItem("category") || "전체"
  );

  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await api.get<Post[]>("/posts");
    setPosts(res.data);
    localStorage.setItem("postsCache", JSON.stringify(res.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    const saved = localStorage.getItem("draft");
    if (saved) {
      const { title: t, content: c } = JSON.parse(saved);
      if (t) setTitle(t);
      if (c) setContent(c);
    }
  }, []);
  useEffect(() => {
    const draft = { title, content, editId };
    localStorage.setItem("draft", JSON.stringify(draft));
  }, [title, content, editId]);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCategory = category === "전체" || p.category === category;
      const matchSearch =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [posts, searchTerm, category]);

  const onSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    if (editId) {
      await api.put(`/posts/${editId}`, { title, content, category });
    } else {
      await api.post("/posts", { title, content, category });
    }
    await fetchPosts();
    setTitle("");
    setContent("");
    setEditId(null);
    localStorage.removeItem("draft");
  };

  const onEdit = (post: Post) => {
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category ?? "전체");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await api.delete(`/posts/${id}`);
    await fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
              setCategory={setCategory}
            />
          </div>
          <div className="md:col-span-3 space-y-6">
            <PostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              editId={editId}
              onSubmit={onSubmit}
              cancelEdit={() => {
                setTitle("");
                setContent("");
                setEditId(null);
              }}
            />
            <PostList
              posts={filteredPosts}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
