# 📝 개발일지 웹앱 정리 (React + Vite + Tailwind + MongoDB)

## 📌 프로젝트 개요

- 기술 스택: React + TypeScript + Vite + TailwindCSS + MongoDB + Express
- 기능: 개발일지 작성/수정/삭제/조회 + 검색 필터

---

## 포름 구조

```
/client
  ├─ .env
  ├─ src/
  │   ├─ components/
  │   │   ├─ DevLogForm.tsx
  │   │   └─ DevLogList.tsx
  │   ├─ pages/
  │   │   └─ Home.tsx
  │   ├─ services/
  │   │   └─ devlog.ts
  │   └─ App.tsx

/server
  ├─ .env
  ├─ src/
      ├─ models/
      │   └─ DevLog.ts
      ├─ routes/
      │   └─ devlogs.ts
      ├─ controllers/
      └─ index.ts
```

---

## 타입스키벅트 & 환경변수

### 환경변수 (.env)

#### 클라이언트

```
VITE_API_BASE_URL=http://localhost:4000
```

#### 백업에딘

```
PORT=4000
MONGODB_URI=your_mongodb_url
```

---

## 클라이언트 API 연동

### services/devlog.ts

```ts
const API = import.meta.env.VITE_API_BASE_URL;

export const fetchLogs = async () => {
  const res = await axios.get(`${API}/api/devlogs`);
  return res.data.logs || res.data;
};

export const fetchLog = (id: string) => axios.get(`${API}/api/devlogs/${id}`);
export const createLog = (data: { title: string; content: string }) =>
  axios.post(`${API}/api/devlogs`, data);
export const updateLog = (
  id: string,
  data: { title: string; content: string }
) => axios.put(`${API}/api/devlogs/${id}`, data);
export const deleteLog = (id: string) =>
  axios.delete(`${API}/api/devlogs/${id}`);
```

---

## 검색 필터 규현

### DevLogList.tsx 에서

```ts
const [search, setSearch] = useState("");
const [filteredLogs, setFilteredLogs] = useState<any[]>([]);

useEffect(() => {
  if (!search.trim()) {
    setFilteredLogs(logs);
  } else {
    const lower = search.toLowerCase();
    const filtered = logs.filter(
      (log) =>
        log.title.toLowerCase().includes(lower) ||
        log.content.toLowerCase().includes(lower)
    );
    setFilteredLogs(filtered);
  }
}, [search, logs]);
```

---

## 서버

### index.ts

```ts
app.use("/api/devlogs", devlogRoutes);
```

### routes/devlogs.ts

```ts
router.get("/", async (req, res) => {
  const logs = await DevLog.find().sort({ createdAt: -1 });
  res.json(logs);
});
```

---

## 확장 가능성

- [ ] Markdown 작성 진행
- [ ] GitHub OAuth 로그인
- [ ] 태그 필터인
- [ ] 백에딘 검색 통합 기능

---

## 현재 관리 기능

- [x] CRUD (작성/수정/삭제/조회)
- [x] 검색 필터
- [x] API 환경변수 관리
- [x] 서버-클라이언트 연동
