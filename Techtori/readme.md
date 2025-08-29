# TechTori — 技術ブログ・リンク 큐레이션 앱

> **React + TypeScript + Tailwind + Vite** · **Express + MongoDB(Atlas)** · **검색/필터/페이지네이션** · **localStorage로 UI 상태 영속화** · **계약(Contract) 기반 응답**

---

## TL;DR

- 개발 관련 글(제목/설명/URL/태그)을 등록·조회·삭제하는 **CRUD** 앱입니다.
- **검색/필터**(키워드 `$text` + regex fallback, 태그 AND 매칭, 날짜 범위, 정렬)와 **페이지네이션**을 제공합니다.
- **client/server 분리** + **axios 인스턴스 + .env**로 환경을 일관 관리합니다.
- 새로고침/재방문 시 **검색어·필터·페이지·폼 초안**을 **localStorage**에서 복원합니다.

**팁**: 면접에서 “구조적 선택(분리/계약) + 문제해결(포트 혼용, map/join 에러) + 확장 아이디어”를 함께 이야기하면 설득력이 커집니다.

---

## 데모 실행 (로컬)

```bash
# 1) 서버
cd server
npm install
npm run dev     # ▶ http://localhost:4000

# 2) 클라이언트 (새 터미널)
cd client
npm install
npm run dev     # ▶ http://localhost:5173
```

- `/server/.env` (예시)

  ```env
  MONGO_URI=mongodb://localhost:27017/techtori
  PORT=4000
  CLIENT_URL=http://localhost:5173
  ```

- `/client/.env`

  ```env
  VITE_API_BASE=http://localhost:4000
  ```

**팁**: DevTools → **Network**에서 `GET /api/entries`가 **4000 포트**로 나가는지 꼭 확인하세요.

---

## 기술 스택

| 레이어     | 기술                                        | 비고                                          |
| ---------- | ------------------------------------------- | --------------------------------------------- |
| 프론트엔드 | React, TypeScript, Vite, TailwindCSS, Axios | 디바운스, 빈/에러/로딩 상태, 환경 변수 일원화 |
| 백엔드     | Node.js, Express                            | REST API, CORS, 응답 표준화                   |
| 데이터     | MongoDB(Atlas/로컬), Mongoose               | 텍스트/날짜 인덱스, 스키마 모델링             |

**팁**: Vite는 개발 빌드가 빨라 학습과 데모에 최적. 응답 표준화는 팀 협업에서 큰 비용을 줄여줍니다.

---

## 폴더 구조 & 아키텍처

```
TechTori/
├── client/              # React + TS + Vite + Tailwind
│   ├── src/
│   │   ├── components/  # EntryForm, EntryList, SearchBar, FilterBar
│   │   ├── hooks/       # useDebounce, useLocalStorage
│   │   ├── services/    # api.ts (axios 인스턴스)
│   │   └── types/       # Entry 타입
│   └── .env             # VITE_API_BASE
└── server/              # Express + MongoDB
    ├── controllers/     # entryController (검색/필터/페이지네이션)
    ├── models/          # Entry (Mongoose Schema + Indexes)
    ├── routes/          # /api/entries
    ├── server.ts        # 부트스트랩 + CORS
    └── .env             # MONGO_URI, PORT, CLIENT_URL
```

**설계 의도**

- **관심사 분리**: UI/빌드 체인과 API/DB를 분리해 유지보수와 배포를 단순화.
- **계약 기반 개발**: 목록 응답을 `{ data, total, page, pages }`로 표준화해 프론트 변경 비용 최소화.

**팁**: README에 구조와 의도를 명시하면 면접관이 빠르게 이해합니다.

---

## 데이터 모델 (Mongoose)

```ts
const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// 검색·정렬 성능을 위한 인덱스
entrySchema.index({ title: "text", description: "text", tags: "text" });
entrySchema.index({ createdAt: 1 });
```

**팁**: 텍스트 인덱스는 한 개만 생성 가능(필드 조합은 가능). 날짜 인덱스로 최신순·기간 필터를 가속합니다.

---

## API 설계

### 엔드포인트

| 메서드 | 경로               | 설명      | 파라미터                                                          |        |
| ------ | ------------------ | --------- | ----------------------------------------------------------------- | ------ |
| GET    | `/api/entries`     | 목록 조회 | `q`, `tags`(쉼표 구분), `from`, `to`, `page`, `limit`, \`sort=asc | desc\` |
| POST   | `/api/entries`     | 생성      | body: `{ title, description?, url?, tags[] }`                     |        |
| DELETE | `/api/entries/:id` | 삭제      | path: `id`                                                        |        |

### 표준 응답(목록)

```json
{
  "data": [{ "_id": "...", "title": "...", "tags": ["react"] }],
  "total": 42,
  "page": 1,
  "pages": 5
}
```

**팁**: 프론트는 위 계약만 신뢰하면 되어, 서버 내부 변경(인덱스/쿼리)이 프론트에 파급되지 않습니다.

---

## 검색/필터/페이지네이션 로직

- **키워드 검색**: `$text` 인덱스로 1차 검색 → 누락 보정을 위해 `title/description/tags`에 **정규식 OR**를 추가
- **태그 필터**: `$all`(모두 포함) 매칭. 필요 시 `$in`(하나라도 포함)으로 확장 가능
- **날짜 필터**: `from~to` 범위, `to`는 `23:59:59.999`까지 자동 포함
- **정렬/페이지네이션**: `createdAt` asc/desc, `page`, `limit`

**팁**: 일본어 등의 언어 특성으로 `$text`가 약한 경우 regex fallback을 설명하면 설득력이 큽니다.

---

## 프론트엔드 핵심 구현

### axios 인스턴스와 .env

```ts
// client/src/services/api.ts
import axios from "axios";
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });
```

**팁**: URL 하드코딩을 금지하고 `api.ts` 단일 창구로 관리.

### localStorage로 UI 상태 복원

```ts
// client/src/hooks/useLocalStorage.ts
import { useEffect, useState } from "react";
export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}
```

- 복원 대상: **검색어(q)**, **필터(tags/from/to/sort)**, **페이지(page)**, **폼 초안(draft)**
- 키 네이밍: `tt:v1:q`, `tt:v1:filter`, `tt:v1:page`, `tt:v1:draft`
- Reset 버튼 예시:

```tsx
<button
  onClick={() => {
    ["tt:v1:q", "tt:v1:filter", "tt:v1:page", "tt:v1:draft"].forEach((k) =>
      localStorage.removeItem(k)
    );
  }}
>
  Reset
</button>
```

**팁**: 데이터 본문(목록) 캐시는 무효화·일관성 비용이 크므로 제외. 필요하면 React Query로 확장하세요.

### 에러/로딩/빈 상태 처리

- `entries` 초기값 `[]` 보장, 로딩/에러/빈 상태 UI 제공.
- `map`/`join` 에러 방지: 타입과 초기값, 폼 문자열 → 전송 시 배열 변환.

**팁**: UX 안전장치가 많은 프로젝트일수록 실무 대응력이 돋보입니다.

---

## 트러블슈팅(실제 사례)

- **포트 혼용**: 클라 `5000`, 서버 `4000`으로 섞여 호출 → `.env` + `api.ts`로 통일해 해결
- **`entries.map` 에러**: 초기값이 `undefined` → `useState<Entry[]>([])`로 해결, 방어 렌더링 추가
- **`tags.join` 에러**: 폼에서 `tags`를 문자열로 편집 → 전송 직전에 `split(',')`로 배열 변환
- **CORS**: `CLIENT_URL=http://localhost:5173` 지정, `app.use(cors({ origin: CLIENT_URL }))`

**팁**: DevTools Network + 서버 로그 + Atlas 컬렉션을 **삼각 검증**하세요.

---

## 배포(요약)

- **서버(Render/Railway)**: `MONGO_URI`, `CLIENT_URL` 설정, 헬스체크 엔드포인트 권장
- **클라(Netlify/Vercel)**: `VITE_API_BASE=https://<server-domain>` 환경변수 지정

**팁**: 환경 변수를 플랫폼 시크릿으로 관리하고, 로컬과 값이 일치하는지 릴리즈 전에 검증합니다.

---

## 보안·확장 아이디어

- 입력 검증(Express Validator), 보안 헤더(helmet), rate limit
- 응답 압축, `.lean()` 적용, 필요한 필드만 projection
- Aggregation + `$facet`로 `data`/`total` 동시 계산 (대용량)
- 태그 AND/OR 토글, 공유 타입 패키지(`shared/types`)

**팁**: “앞으로의 개선 계획”을 명시하면 성장 가능성을 어필할 수 있습니다.

---

## 테스트(요약)

- **백엔드**: Supertest로 `/api/entries` E2E, 쿼리 파라미터별 필터 검증
- **프론트**: React Testing Library로 검색/필터/페이지 동작

**팁**: 핵심 흐름 한두 개만 있어도 신뢰도가 크게 올라갑니다.

---

## 일본어 설명 스크립트

### 30초

> 「React（TypeScript, Tailwind, Vite）でフロント、Express と MongoDB で API を実装しました。記事の登録・一覧・削除に加え、`$text` インデックスと正規表現のフォールバックで検索、タグ・日付・ソート・ページネーションに対応しています。環境は `.env` と Axios インスタンスで統一し、レスポンスは `{ data, total, page, pages }` に標準化しました。開発中のポート混在や `map` エラーは切り分けて解消しています。」

### 90초

> 「技術情報を登録・検索できるミニプラットフォームです。フロントは React + TS + Tailwind、バックは Express + MongoDB。検索は `$text` をベースに日本語を考慮して正規表現で補完、タグは AND マッチ、日付範囲とソート・ページネーションにも対応。Axios と `.env` で設定を一元化し、レスポンスを `{ data, total, page, pages }` に統一してフロントの安定性を高めました。開発中にポート混在・CORS・`map`/`join` など典型的な課題がありましたが、Network タブ・サーバーログ・DB の三点検証で原因を特定して再発しないように設計を整理しました。今後は AND/OR トグルや `$facet` での集計最適化、型の共有などを予定しています。」

**팁**: “무엇을 만들었나 + 왜 그 구조인가 + 문제를 어떻게 해결했나”를 꼭 포함하세요.

---

## 라이선스

MIT (필요 시 조정)
