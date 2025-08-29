
# 📝 React + TypeScript TodoList 프로젝트 정리

## 📌 프로젝트 개요

**기술 스택**  
- Frontend: React + TypeScript + Vite + TailwindCSS  
- Backend: Node.js + Express + MongoDB (with Mongoose)  
- 기타: Axios, localStorage 활용, ESM + ts-node-dev 개발환경 구성

**주요 기능**
- CRUD (Create, Read, Update, Delete)
- 검색 기능 (텍스트 필터)
- 완료 여부 필터 (전체 / 완료 / 미완료)
- 로컬스토리지 연동 (서버 오류 시 fallback, 자동 저장)
- 클라이언트와 서버 디렉토리 분리 구조
- 프론트엔드 구조 리팩토링 (컴포넌트 분리 및 관심사 분리)

---

## 🏗️ 프로젝트 구조

```
react-ts-todolist/
├── client/               # 프론트엔드
│   ├── src/
│   │   ├── components/   # TodoInput, TodoFilter, TodoList, TodoItem
│   │   ├── hooks/        # (선택 사항) useTodos 커스텀 훅
│   │   ├── api/          # axios 인스턴스
│   │   ├── types/        # Todo 타입 정의
│   │   ├── utils/        # localStorage.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── ...
├── server/               # 백엔드
│   ├── routes/
│   ├── models/
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
```

---

## ✅ 클라이언트 주요 기능 요약

### 📍 CRUD
- `/todos` API 연동
- POST, PUT, DELETE 요청 처리
- `axios`로 서버와 비동기 통신

### 📍 검색 + 필터
- 텍스트 검색 (`includes + toLowerCase`)
- 필터 상태: `all`, `active`, `completed`

### 📍 로컬스토리지 동기화
- 서버 오류 시 `localStorage`에서 불러오기
- 초기 렌더링 시 localStorage 먼저 표시 후 fetch
- todos 변경 시마다 `saveTodos()` 호출로 자동 저장

---

## ✅ 컴포넌트 분리 전략

| 컴포넌트명 | 역할 |
|------------|------|
| `TodoInput.tsx` | 입력창 및 추가 버튼 |
| `TodoFilter.tsx` | 필터 버튼 묶음 |
| `TodoList.tsx` | 할 일 목록 |
| `TodoItem.tsx` | 개별 할 일 |
| `App.tsx` | 전체 상태 관리 및 UI 조합 |

---

## 💡 기술적으로 어필할 포인트 (면접 대비)

1. **TypeScript 기반 안정성 확보**
   - props, 상태, API 응답 모두 타입 엄격 적용

2. **ESM + ts-node-dev 설정**
   - Node.js의 `type: module` 기반 ESM 완전 대응

3. **로컬스토리지 → 서버 fallback 구조**
   - 오프라인 상황까지 고려한 resilient 구조 설계

4. **컴포넌트 관심사 분리**
   - UI/로직 분리 → 유지보수성과 확장성 향상

5. **Axios 인스턴스 분리**
   - 공통 baseURL, 헤더 관리 구조화

---

## ✍️ 마무리

이 프로젝트는 단순한 CRUD를 넘어서, **유저 경험(UX)**, **코드 유지보수성**, **백엔드 연동**까지 실무에서 꼭 다뤄야 할 요소들을 한 번에 담고 있습니다.

> 면접 때 아래와 같이 어필할 수 있습니다:
> - "제가 만든 TodoList는 단순 CRUD가 아닌, 서버 장애 시 fallback까지 고려해서 localStorage를 활용한 구조입니다."
> - "프론트는 역할 단위로 컴포넌트를 나누고, Axios 인스턴스 및 타입을 정리해 협업과 테스트까지 신경 쓴 구조로 만들었습니다."

---

## 🧠 추천 심화 방향

- Zustand, Recoil 등 상태관리 라이브러리 적용
- useTodos 훅 분리로 로직 재사용
- 테스트 코드 (Jest, React Testing Library)
- PWA 적용하여 오프라인 완전 대응


---

## 🛠️ 개발 중 겪은 오류 및 해결 경험 (면접 어필용)

### [1] ❌ `Cannot read properties of undefined (reading 'filter')`

- **문제 원인**: `todos.filter(...)` 호출 시 `todos`가 undefined였음
- **해결 방법**:
  - `useState<Todo[]>([])`로 초기값을 항상 배열로 지정
  - 서버 응답 또는 localStorage에서 받아올 데이터를 `Array.isArray()`로 체크 후 세팅
  - Axios 응답이 올바른 데이터 구조인지 `console.log`로 확인하여 디버깅

### [2] ❌ `Must use import to load ES Module`

- **문제 원인**: Node.js 서버 코드에서 `import` 문법 사용 시 CommonJS 환경에서 충돌 발생
- **해결 방법**:
  - `package.json`에서 `"type": "module"` 설정 시 `ts-node-dev`가 인식 못하는 문제 발견
  - 해결 1: `type: module` 제거 + `tsconfig.json`에서 `"module": "CommonJS"`로 변경
  - 해결 2 (대안): `ts-node` + `--loader ts-node/esm` 방식으로 실행

### [3] ❌ 클라이언트가 API 주소를 인식하지 못함

- **문제 원인**: Axios 기본 주소(`/api/...`)가 실제 서버 주소(`http://localhost:4000`)와 매칭되지 않음
- **해결 방법**:
  - Vite 환경변수(`.env`)로 `VITE_API_URL` 설정 후 `import.meta.env`로 사용
  - 또는 `vite.config.ts`에서 프록시 설정으로 `/api` → `http://localhost:4000` 리다이렉트 처리

---

### 💬 면접에서 이렇게 설명할 수 있어요:

> "Todo 프로젝트를 진행하면서 단순한 코드 구현뿐 아니라, 환경 설정과 런타임 오류까지 직접 해결했습니다. 예를 들어 ESM 관련 오류나 localStorage fallback 구조를 직접 설계하고 문제를 디버깅하며 실무에서 마주칠 수 있는 상황을 직접 경험했습니다."

