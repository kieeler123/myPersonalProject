# HTML & CSS 정리 (개인 레퍼런스북)

> 개발하면서 헷갈리는 HTML 태그와 CSS 속성을  
> **예제 + 역할별 정리 + 비슷한 것 비교** 방식으로 정리한 문서입니다.  
> 처음에는 아래 예제만 이해해도 충분하고,  
> 나중에 작업하면서 새로 배우는 것들은 맨 아래 “추가 정리” 섹션에 붙여 나가면 됩니다.

---

## 1. 예제 HTML 전체 코드 (포트폴리오 페이지)

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>개발자 포트폴리오 예제</title>
    <meta
      name="description"
      content="HTML 태그 연습용 포트폴리오 예제 페이지입니다."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
      /* ====== 기본 공통 스타일 ====== */
      * {
        box-sizing: border-box;
      }

      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        margin: 0;
        padding: 0;
        line-height: 1.5;
        background-color: #f5f5f5;
        color: #222;
      }

      header,
      nav,
      main,
      footer {
        padding: 16px;
      }

      header {
        background: #ffffff;
        border-bottom: 1px solid #e5e5e5;
      }

      nav ul {
        list-style: none;
        padding: 0;
        margin: 8px 0 0;
        display: flex;
        gap: 12px;
      }

      nav a {
        text-decoration: none;
        color: #0070f3;
        font-size: 0.95rem;
      }

      nav a:hover {
        text-decoration: underline;
      }

      main {
        max-width: 960px;
        margin: 0 auto;
      }

      section {
        padding: 16px;
        margin: 16px 0;
        border-radius: 12px;
        background-color: #ffffff;
        border: 1px solid #eee;
      }

      section header h2 {
        margin-top: 0;
      }

      /* ====== 소개 섹션 ====== */
      #about article {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: flex-start;
      }

      figure {
        margin: 0;
      }

      figure img {
        display: block;
        border-radius: 50%;
        border: 2px solid #ddd;
      }

      figure figcaption {
        margin-top: 8px;
        font-size: 0.9rem;
        color: #666;
      }

      /* ====== 기술 스택 섹션 ====== */
      .skills-list {
        padding-left: 20px;
      }

      .skills-list li {
        margin-bottom: 4px;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        max-width: 600px;
        margin-top: 12px;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        font-size: 0.9rem;
      }

      th {
        background: #f8f8f8;
        text-align: left;
      }

      /* ====== 프로젝트 섹션 ====== */
      .project-card {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 12px;
        background-color: #fafafa;
      }

      .project-card h3 {
        margin-top: 0;
      }

      .project-card video,
      .project-card iframe {
        display: block;
        margin-top: 8px;
        max-width: 100%;
      }

      /* ====== 연락 섹션 ====== */
      form {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-size: 0.9rem;
      }

      input,
      textarea,
      select {
        padding: 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 0.95rem;
      }

      input:focus,
      textarea:focus,
      select:focus {
        outline: none;
        border-color: #0070f3;
        box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.15);
      }

      button {
        padding: 10px;
        border-radius: 6px;
        border: none;
        background-color: #0070f3;
        color: white;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background-color 0.15s ease, transform 0.1s ease;
      }

      button:hover {
        background-color: #0059c1;
        transform: translateY(-1px);
      }

      button:active {
        transform: translateY(0);
      }

      /* ====== 푸터 ====== */
      footer {
        font-size: 0.875rem;
        background: #ffffff;
        border-top: 1px solid #e5e5e5;
        text-align: center;
        margin-top: 24px;
        padding-bottom: 24px;
      }

      /* ====== 반응형 ====== */
      @media (max-width: 640px) {
        nav ul {
          flex-wrap: wrap;
        }

        #about article {
          flex-direction: column;
          align-items: flex-start;
        }

        section {
          margin: 12px 8px;
        }
      }
    </style>
  </head>
  <body>
    <!-- 페이지 상단 -->
    <header>
      <h1>홍길동 포트폴리오</h1>
      <p>
        안녕하세요, <strong>웹 프론트엔드 개발자</strong> 홍길동입니다.
        <em>깔끔한 UI</em>와 <em>사용자 경험</em>에 관심이 많습니다.
      </p>
      <nav>
        <ul>
          <li><a href="#about">소개</a></li>
          <li><a href="#skills">기술 스택</a></li>
          <li><a href="#projects">프로젝트</a></li>
          <li><a href="#contact">연락하기</a></li>
        </ul>
      </nav>
    </header>

    <!-- 메인 콘텐츠 -->
    <main>
      <!-- 소개 섹션 -->
      <section id="about">
        <header>
          <h2>소개</h2>
        </header>

        <article>
          <div>
            <figure>
              <img src="profile.png" alt="홍길동 프로필 이미지" width="120" />
              <figcaption>프론트엔드 개발자 홍길동</figcaption>
            </figure>
          </div>

          <div>
            <h3>간단 프로필</h3>

            <p>
              저는 <strong>HTML, CSS, JavaScript</strong>를 주로 사용하며
              <mark>사용자 친화적인 인터페이스</mark>를 만드는 것을 좋아합니다.
            </p>

            <p>
              현재 관심 있는 키워드는
              <code>React</code>, <code>TypeScript</code>,
              <code>웹 접근성</code>입니다.
            </p>

            <details>
              <summary>더 보기 (경력 요약)</summary>
              <p>
                3년차 프론트엔드 개발자로 스타트업에서 웹 서비스 개발을
                담당했습니다.
              </p>
            </details>
          </div>
        </article>
      </section>

      <!-- 기술 스택 섹션 -->
      <section id="skills">
        <header>
          <h2>기술 스택</h2>
        </header>

        <ul class="skills-list">
          <li><strong>HTML5</strong> – 시맨틱 마크업, 접근성 고려</li>
          <li><strong>CSS3</strong> – Flexbox, Grid, 반응형 레이아웃</li>
          <li><strong>JavaScript(ES6+)</strong> – 비동기 처리, 모듈 시스템</li>
          <li><strong>React</strong> – 컴포넌트 기반 UI 개발</li>
        </ul>

        <h3>기술 수준</h3>
        <table>
          <thead>
            <tr>
              <th>기술</th>
              <th>숙련도</th>
              <th>사용 기간(년)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HTML/CSS</td>
              <td>상</td>
              <td>3</td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td>중상</td>
              <td>3</td>
            </tr>
            <tr>
              <td>React</td>
              <td>중</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 프로젝트 섹션 -->
      <section id="projects">
        <header>
          <h2>프로젝트</h2>
        </header>

        <article class="project-card">
          <h3>프로젝트 A – 할 일 관리 앱</h3>
          <p>
            <time datetime="2024-01">2024년 1월</time>에 개발한
            <strong>할 일(To-do) 관리 웹 앱</strong>입니다.
          </p>

          <p>주요 기능:</p>
          <ol>
            <li>할 일 추가/삭제/완료 표시</li>
            <li>로컬 스토리지에 데이터 저장</li>
            <li>반응형 레이아웃 지원</li>
          </ol>

          <p>
            깃허브 저장소:
            <a
              href="https://github.com/example/todo-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 링크
            </a>
          </p>
        </article>

        <article class="project-card">
          <h3>프로젝트 B – 포트폴리오 웹사이트</h3>
          <p>
            HTML, CSS, JavaScript만으로 구현한
            <em>정적 포트폴리오 사이트</em>입니다.
          </p>

          <p>데모 영상:</p>
          <video controls width="320">
            <source src="portfolio-demo.mp4" type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>

          <p>외부 서비스(예: 유튜브) 임베드:</p>
          <iframe
            width="320"
            height="180"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="프로젝트 데모 영상"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
        </article>
      </section>

      <!-- 연락 섹션 -->
      <section id="contact">
        <header>
          <h2>연락하기</h2>
        </header>

        <form action="#" method="post">
          <label for="name">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력하세요"
            required
          />

          <label for="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            required
          />

          <label for="type">문의 유형</label>
          <select id="type" name="type">
            <option value="job">채용 문의</option>
            <option value="project">프로젝트 제안</option>
            <option value="etc">기타</option>
          </select>

          <label for="message">메시지</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="내용을 입력하세요"
          ></textarea>

          <button type="submit">보내기</button>
        </form>
      </section>
    </main>

    <!-- 페이지 하단 -->
    <footer>
      <p>&copy; <time datetime="2025">2025</time> 홍길동. 모든 권리 보유.</p>
      <p>
        만든 기술:
        <abbr title="하이퍼텍스트 마크업 언어">HTML</abbr>,
        <abbr title="캐스케이딩 스타일 시트">CSS</abbr>, JavaScript
      </p>
    </footer>
  </body>
</html>
팁: 이 예제 하나에 시맨틱 태그 + 리스트 + 테이블 + 미디어 + 폼 + 반응형 CSS까지
다 들어 있으니, DOM 구조랑 스타일 구조를 같이 보면서 익히면 효율이 좋습니다. 2.
예제에서 사용된 HTML 태그 정리 (역할별) 2.1 문서 구조 & 메타 태그 역할
<!DOCTYPE html> HTML5 문서 선언 html 루트 요소, lang="ko" head 메타 정보,
타이틀, 스타일 meta 문자셋, description, viewport title 브라우저 탭 제목 style
문서 내부 CSS body 화면에 보이는 본문 2.2 시맨틱 구조 태그 역할 header 상단/섹션
머리글 nav 내비게이션 메뉴 main 메인 콘텐츠(1개 권장) section
구역(소개/스킬/프로젝트/연락) article 독립적인 콘텐츠(프로젝트 카드, 프로필
설명) footer 바닥글, 저작권, 기술 정보 2.3 텍스트 관련 태그 역할 h1, h2, h3 제목
계층 구조 p 문단 strong 의미 강조 em 문맥 강조(기울임) mark 강조/하이라이트 code
코드/키워드 표시 time 날짜/시간 표현 abbr 약어 + 툴팁 2.4 목록 & 표 태그 역할 ul
순서 없는 목록 (메뉴, 스킬) ol 순서 있는 목록 (기능 리스트) li 목록 항목 table
기술 수준 표 thead 표 헤더 tbody 표 본문 tr 행 th 헤더 셀 td 데이터 셀 2.5
미디어 & 인터랙티브 태그 역할 figure 이미지/설명을 묶는 컨테이너 figcaption
이미지 설명 img 이미지 video 자체 제공 영상 source 영상 소스 iframe 유튜브/외부
서비스 임베드 details 접기/펼치기 UI summary details 요약 제목 2.6 폼 관련 태그
역할 form 폼 전체 label 입력 라벨, for로 연결 input 단일 줄 입력(이름, 이메일)
select 드롭다운 option 선택 옵션 textarea 여러 줄 입력 button 제출 버튼 팁: 이
표는 “헷갈리면 다시 돌아오는 HTML 사전” 역할로 쓰면 좋습니다. 나중에 새 태그를
배우면 이 아래에 계속 추가해도 됩니다. 3. 예제에서 사용된 CSS 속성 정리 (역할별)
3.1 레이아웃 관련 속성 예시 설명 display flex, block, none 요소 레이아웃 방식
flex-direction row, column 플렉스 방향 flex-wrap wrap 줄바꿈 허용
justify-content center, space-between 주축 정렬 align-items center, flex-start
교차축 정렬 gap 16px flex/grid 간격 max-width 960px 최대 너비 제한 margin 0
auto, 16px 0 외부 여백 padding 16px 내부 여백 box-sizing border-box 크기 계산
방식 border 1px solid #ddd 테두리 border-radius 12px 모서리 둥글게 3.2
타이포그래피 & 텍스트 속성 예시 설명 font-family system-ui, sans-serif 글꼴
font-size 0.9rem, 0.95rem 폰트 크기 font-weight bold, 400 굵기 line-height 1.5
줄 간격 text-align center, left 정렬 text-decoration none, underline 밑줄 등
색인 color #222, #0070f3 글자 색 3.3 색상 & 배경 속성 예시 설명 background-color
#ffffff, #fafafa 배경색 background #ffffff 배경 단축 속성 border-color #e5e5e5
테두리 색 3.4 그림자 & 인터랙션 속성 예시 설명 box-shadow 0 0 0 2px rgba(...)
그림자 transition background-color 0.15s ease 전환 효과 transform
translateY(-1px) 위치/크기/회전 변화 cursor pointer 마우스 포인터 모양 3.5 폼
관련 스타일 속성 예시 설명 outline none 기본 포커스 테두리 제거 :focus
input:focus { ... } 포커스 상태 스타일 :hover button:hover { ... } 호버 상태
스타일 :active button:active { ... } 클릭 상태 스타일 3.6 반응형(Media Query)
css コードをコピーする @media (max-width: 640px) { nav ul { flex-wrap: wrap; }
#about article { flex-direction: column; align-items: flex-start; } section {
margin: 12px 8px; } } @media (max-width: 640px) : 화면 폭이 640px 이하일 때만
적용 모바일 레이아웃 전환용으로 사용 팁: CSS는 “모든 속성을 외우기”보다 레이아웃
/ 타이포 / 색 / 인터랙션 / 반응형 이 5가지 큰 덩어리만 머릿속에 두고, 세부
속성은 필요할 때 이 문서나 MDN에서 찾는 방식이 효율적입니다. 4. CSS 속성 좀 더
많이: 역할별 확장 리스트 4.1 레이아웃/박스 관련 자주 쓰는 속성들 display: block,
inline, inline-block, flex, grid, none position: static, relative, absolute,
fixed, sticky top, right, bottom, left: absolute/fixed 위치 지정 z-index: 쌓임
순서 (레이어) overflow: visible, hidden, scroll, auto width, height, min-width,
max-width, min-height, max-height margin, margin-top/right/bottom/left padding,
padding-top/right/bottom/left 4.2 Flexbox만 따로 기억해둘 것 display: flex
flex-direction: row, column justify-content: flex-start, center, space-between,
space-around align-items: stretch, center, flex-start, flex-end flex-wrap:
nowrap, wrap align-content: 여러 줄 정렬 align-self: 개별 아이템 교차축 정렬
flex: grow shrink basis (예: flex: 1) 4.3 Grid 기본 키워드 display: grid
grid-template-columns, grid-template-rows grid-column, grid-row grid-gap 또는
gap grid-template-areas (고급) 4.4 텍스트 & 폰트 확장 font-style: normal, italic
font-variant: small-caps white-space: nowrap, pre, pre-wrap word-break:
break-all, keep-all text-overflow: ellipsis (말줄임표) 예: 한 줄 말줄임 css
コードをコピーする .ellipsis { overflow: hidden; white-space: nowrap;
text-overflow: ellipsis; } 4.5 기타 유용한 속성들 opacity: 투명도 (0 ~ 1)
object-fit: 이미지/비디오 채우기 방식 (cover, contain) filter: blur, grayscale,
brightness 등 pointer-events: none (클릭 무시) 5. 비슷한 CSS 개념 비교 (헷갈리기
쉬운 것들) 5.1 display: inline vs inline-block vs block 값 줄 차지 width/height
조절 대표 요소 inline X X span, a inline-block X O 버튼, 아이콘 block O O div,
section 5.2 margin vs padding 속성 위치 효과 margin 요소 바깥 요소 사이 간격
padding 요소 안쪽 내용과 테두리 사이 간격 5.3 flex vs grid flex grid 1차원
레이아웃 (가로 or 세로) 2차원 레이아웃 (행+열) 정렬과 분배에 강함 전체 레이아웃
구성에 강함 메뉴/버튼 정렬 카드 레이아웃, 대시보드 5.4 em vs rem 단위 기준 특징
em 부모 요소의 font-size 중첩되면 예상 밖 값이 나올 수 있음 rem root(html)의
font-size 사이트 전체 스케일 조정에 유리
```
