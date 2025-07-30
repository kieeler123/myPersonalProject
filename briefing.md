## 📝 텍스트 CRUD 프로젝트 설명서 (Next.js + MongoDB)

### 📌 프로젝트 개요

Next.js(App Router 기반)와 MongoDB를 활용하여 구현한 간단한 텍스트 CRUD 웹 애플리케이션입니다. TailwindCSS와 SCSS를 조합하여 UI 스타일링을 적용하였으며, 클라이언트와 서버 간의 데이터 통신은 Next.js의 API Route(핸들러)를 통해 이루어집니다.

---

### 🇰🇷 한국어 설명

#### ✅ 주요 기술 스택

- **Next.js (App Router)**: 클라이언트 및 API 라우트 구성
- **MongoDB Atlas**: 클라우드 NoSQL DB
- **TailwindCSS + SCSS**: 혼합 스타일링
- **API Routes (Route Handlers)**: CRUD 요청 처리
- **LocalStorage (초기 구현 시)** → 이후 MongoDB로 확장

#### ✅ 기능 상세

- 텍스트 추가 (Create)
- 텍스트 목록 조회 (Read)
- 텍스트 삭제 (Delete)
- (옵션) 텍스트 수정 기능 준비 중

#### ✅ MongoDB 연동 방식

- `/lib/mongodb.ts`에서 MongoClient 연결
- API 핸들러 (`/api/texts/route.ts`, `/api/texts/[id]/route.ts`)에서 DB 접근
- 클라이언트에서 fetch()로 호출하여 데이터 실시간 반영

#### ✅ 폴더 구조 예시

```
/app
  /page.tsx
  /api/texts/route.ts
  /api/texts/[id]/route.ts
/components
  TextForm.tsx
  TextItem.tsx
/lib
  mongodb.ts
/styles
  globals.scss
```

#### ✅ 핵심 설명 포인트 (면접용)

- **Next.js의 App Router 구조** 이해도
- **MongoDB Atlas 연결 및 보안 관리 (.env.local)**
- **클라이언트-서버 데이터 흐름(fetch ↔ API Routes ↔ MongoDB)**
- **Tailwind/SCSS 병행 사용 이유와 스타일 전략**

---

### 🇺🇸 English Explanation

#### ✅ Tech Stack

- **Next.js (App Router)**: Frontend + API structure
- **MongoDB Atlas**: Cloud NoSQL database
- **TailwindCSS + SCSS**: Combined styling strategy
- **API Routes (Route Handlers)**: For handling CRUD requests
- Started with **LocalStorage**, later expanded to **MongoDB**

#### ✅ Features

- Create text entry
- Read/list all entries
- Delete entry
- (Optionally ready for update feature)

#### ✅ MongoDB Integration

- MongoClient is initialized in `/lib/mongodb.ts`
- API handlers access DB in `/api/texts/route.ts` and `[id]/route.ts`
- Client uses `fetch()` to communicate with server

#### ✅ Directory Example

```
/app
  /page.tsx
  /api/texts/route.ts
  /api/texts/[id]/route.ts
/components
  TextForm.tsx
  TextItem.tsx
/lib
  mongodb.ts
/styles
  globals.scss
```

#### ✅ Interview Tips

- Understand **App Router structure** in Next.js
- Explain **MongoDB Atlas connection** and **.env handling**
- Walk through **data flow from UI → API → DB**
- Reason for **using both TailwindCSS and SCSS**

---

### 🇯🇵 日本語の説明

#### ✅ 技術スタック

- **Next.js (App Router)**: クライアント＋ API 構成
- **MongoDB Atlas**: クラウド NoSQL データベース
- **TailwindCSS + SCSS**: 混合スタイル戦略
- **API ルート**: CRUD 用ルートハンドラ
- 初期は**LocalStorage** → のちに**MongoDB 連携**へ移行

#### ✅ 機能

- テキスト作成（Create）
- テキスト一覧表示（Read）
- テキスト削除（Delete）
- （更新機能は準備中）

#### ✅ MongoDB 連携方法

- `/lib/mongodb.ts`で MongoClient 初期化
- API ハンドラ(`/api/texts/route.ts`と`[id]/route.ts`)で DB 接続
- クライアントから fetch()で非同期通信

#### ✅ ディレクトリ例

```
/app
  /page.tsx
  /api/texts/route.ts
  /api/texts/[id]/route.ts
/components
  TextForm.tsx
  TextItem.tsx
/lib
  mongodb.ts
/styles
  globals.scss
```

#### ✅ 面接での説明ポイント

- **Next.js App Router**の理解度
- **MongoDB Atlas 接続方法**と`.env.local`の管理
- **フロント ↔ API ↔ DB のデータフロー**の解説
- **TailwindCSS と SCSS の使い分け理由**

---

## 🎤 면접 대비 요약 정리

# 📘 텍스트 CRUD 프로젝트 면접 정리 (Next.js + MongoDB)

---

## ✅ 기술 스택 요약

- **Next.js 15 (App Router 기반)**
- **React 19**
- **MongoDB Atlas 연동**
- **순수 CSS 기반 UI (Tailwind 미사용)**
- **다크모드 toggle 구현 (classList 방식)**

---

## ✅ 주요 기능 설명

### 🟢 CRUD 기능

- **Create**: 입력폼에서 텍스트를 추가하면 MongoDB에 저장됨
- **Read**: 서버에서 텍스트를 가져와 리스트로 렌더링
- **Update**: 수정 버튼 클릭 시 해당 텍스트가 폼에 채워지고 수정 가능
- **Delete**: 삭제 버튼 클릭 시 해당 텍스트가 DB에서 제거됨

### 🌗 다크모드 기능

- `<html>`에 `dark` 클래스를 토글 방식으로 추가/삭제하여 구현
- `useState`와 `useEffect`를 활용하여 상태 관리

---

## ✅ Tailwind 미사용 이유

- 설정 오류(`@tailwind`, `@apply`) 및 PostCSS 충돌 이슈 발생
- `tailwind.config.js`, `postcss.config.js` 설정 번거로움
- 빠른 개발을 위해 순수 CSS 선택

---

## ✅ 안정성과 유지보수

- Tailwind 제거 후 설정 간소화 및 충돌 없음
- `next.config.js`의 `experimental.turbo` 옵션은 사용하지 않음 또는 삭제

---

## ✅ 면접 시 강조할 점

- 불필요한 설정/패키지를 걷어내고 필요한 기능만 구현
- 다크모드, CRUD 전부 직접 상태 관리와 렌더링으로 구현
- 문제 해결 경험 (Tailwind 설정 이슈 → CSS 전환) 강조

---

# 📘 テキスト CRUD プロジェクト面接整理 (Next.js + MongoDB)

---

## ✅ 技術スタック概要

- **Next.js 15（App Router ベース）**
- **React 19**
- **MongoDB Atlas 連携**
- **純粋な CSS で UI 構築（Tailwind 未使用）**
- **ダークモード切り替え（classList 方式）**

---

## ✅ 主な機能説明

### 🟢 CRUD 機能

- **Create**: 入力フォームからテキストを MongoDB に追加
- **Read**: サーバーからデータを取得してリスト表示
- **Update**: 編集ボタンでフォームに反映して修正可能
- **Delete**: 削除ボタンで MongoDB から削除

### 🌗 ダークモード機能

- `<html>`に`dark`クラスを付け替えてスタイル切替
- `useState`と`useEffect`で状態管理

---

## ✅ Tailwind 未使用の理由

- `@tailwind`, `@apply`のエラーや PostCSS の衝突
- `tailwind.config.js`, `postcss.config.js`の煩雑さ
- 素早い開発のために CSS を採用

---

## ✅ 安定性と保守性

- Tailwind を削除して設定がシンプルに
- `next.config.js`の`experimental.turbo`は削除推奨

---

## ✅ 面接でアピールすべき点

- 必要な機能だけを確実に実装
- ダークモードや CRUD を React の状態管理で制御
- 問題対応力（Tailwind の設定問題 →CSS に切り替え）を強調

---

# 📘 Text CRUD Project Interview Summary (Next.js + MongoDB)

---

## ✅ Tech Stack Summary

- **Next.js 15 (App Router based)**
- **React 19**
- **MongoDB Atlas connected**
- **Pure CSS for UI (No Tailwind)**
- **Dark mode toggle using `classList`**

---

## ✅ Key Features

### 🟢 CRUD Operations

- **Create**: Add new text via form, saved to MongoDB
- **Read**: Fetch and render data from the server
- **Update**: Click edit, prefill the form, and update
- **Delete**: Click delete to remove from DB

### 🌗 Dark Mode

- Toggle `dark` class on `<html>` element
- Managed via `useState` and `useEffect`

---

## ✅ Why Tailwind was Not Used

- Errors with `@tailwind`, `@apply` and PostCSS
- `tailwind.config.js`, `postcss.config.js` config issues
- Simpler to build quickly using plain CSS

---

## ✅ Stability & Maintainability

- Removed Tailwind for simplicity and stability
- Removed `experimental.turbo` from `next.config.js`

---

## ✅ Interview Highlights

- Focused on clean, maintainable structure
- All CRUD and dark mode handled manually
- Demonstrated problem-solving (Tailwind issues → switched to CSS)
