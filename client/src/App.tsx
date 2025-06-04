import { useState, useEffect } from "react"
import { api } from "./api";
import "./app.scss";

interface Post {
  title: string;
  content: string;
  _id?: string;
}

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [edit, setEdit] = useState<string | null>(null);

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (e) {
      console.error("게시글 목록 조회 실패:", e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClick = async () => {
    if(edit !== null){
      try {
        await api.put(`/posts/${edit}`, { title, content });
        await fetchPosts();
        setEdit(null);
      } catch (e) {
        console.error("수정 실패:", e);
      }
    } else {
      if (title.trim() && content.trim()) {
        try {
          await api.post("/posts", { title, content });
          await fetchPosts();
        } catch (e) {
          console.error("생성 실패:", e);
        }
      }
    }
    setTitle("");
    setContent("");
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      await fetchPosts();
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  }

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEdit(post._id || null);
  }

  return (
    <div>
      <div className="input-container">
        <h1>blog</h1>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handleClick}>{edit !== null ? "수정" : "작성"}</button>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>수정</button>
              <button onClick={() => post._id && handleDelete(post._id)}>삭제</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default App;