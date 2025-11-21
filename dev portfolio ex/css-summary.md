📘 CSS SUMMARY (학습/실무용 레퍼런스)

이 문서는 CSS를 역할별, 비슷한 속성 비교, 핵심 개념, 예제 중심으로 정리한 실전용 레퍼런스입니다.
HTML 정리 문서와 동일한 포맷으로 구성해 확장성과 활용성을 높였습니다.

0. 개요

목적: CSS의 핵심 속성, 개념, 패턴을 체계적으로 정리하여 실전 개발 시 빠르게 참고할 수 있도록 구성

정리 기준

역할별 분류

비슷한 속성 비교

예제 중심 설명

확장 가능한 템플릿 포함

이 문서는 레이아웃 → 박스모델 → 타이포그라피 → 색상 → 애니메이션 → 반응형 순으로 구성됨

1. CSS 핵심 개념 요약
   개념 설명
   선택자(Selector) 스타일을 적용할 HTML 요소 지정
   박스 모델(Box Model) margin → border → padding → content 구조
   display 요소 레이아웃 방식 결정(block, inline, flex, grid)
   position 요소 배치 방식 결정
   Flexbox 1차원(가로/세로) 레이아웃 시스템
   Grid 2차원(행+열) 레이아웃 시스템
   단위(Unit) px, %, em, rem, vw 등
   색상(Color) hex, rgb, rgba, hsl 등
   반응형 디자인 미디어 쿼리로 화면 크기에 따라 스타일 적용

팁: 80%의 CSS 문제는 display + box model + flex만으로 해결할 수 있습니다.

2. 기본 선택자 정리
   선택자 의미 예시
   tag 태그 선택 p {}
   .class 클래스 선택 .item {}
   #id 고유 ID 선택 #header {}

- 전체 선택 \* { margin: 0 }
  A B 하위(후손) 선택 nav a {}
  A > B 직계 자식 선택 .list > li {}
  [attr] 속성 선택자 [type="text"]
  A + B 바로 다음 형제 h2 + p
  A ~ B 형제 선택(순서 상관없음) h2 ~ p

우선순위: !important > inline-style > #id > .class > tag

3. 역할별 CSS 속성 정리
   3.1 레이아웃(Layout)
   display
   값 의미
   block 한 줄 전체 차지, 줄바꿈 발생
   inline 내용만큼 차지, 줄바꿈 없음
   inline-block inline + width/height 조절 가능
   flex 1차원 레이아웃
   grid 2차원 레이아웃
   none 요소 숨김
   position
   position 기준 특징
   static 문서 흐름 기본값
   relative 자기 자신 기준점 이동
   absolute 가장 가까운 relative 부모 자유 배치
   fixed 뷰포트 스크롤 고정
   sticky 뷰포트 특정 지점에서 고정
   Flexbox 핵심 속성
   display: flex;
   flex-direction: row; /_ 또는 column _/
   justify-content: center; /_ 주축 정렬 _/
   align-items: center; /_ 교차축 정렬 _/
   gap: 16px;

Grid 핵심 속성
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;

3.2 박스 모델(Box Model)
속성 설명
width / height 요소 크기
margin 외부 여백
padding 내부 여백
border 테두리
border-radius 모서리 둥글기
box-sizing 크기 계산 방식 (border-box 추천)
box-sizing: border-box; /_ padding + border 포함한 width 계산 _/

3.3 타이포그래피(Text)
속성 설명
font-size 글자 크기
font-weight 굵기 (400=보통, 700=굵게)
line-height 줄간격
font-family 글꼴
text-align left / center / right
text-decoration underline / line-through
text-transform uppercase / lowercase
letter-spacing 자간
3.4 색상(Color)
방식 예시
Hex #3498db
rgb rgb(52, 152, 219)
rgba rgba(52, 152, 219, 0.5)
hsl hsl(204, 70%, 53%)
3.5 배경(Background)
속성 설명
background-color 배경색
background-image 이미지
background-repeat 반복 여부
background-position 배경 위치
background-size cover, contain
3.6 테두리 & 그림자(Border & Shadow)
border: 1px solid #ddd;
border-radius: 8px;

box-shadow: 0 2px 8px rgba(0,0,0,0.12);

팁: Box-shadow는 UI 완성도에 큰 영향을 주는 핵심 속성입니다.

3.7 전환 & 애니메이션
transition
transition: all 0.2s ease;

animation
@keyframes fade-in {
from { opacity: 0; }
to { opacity: 1; }
}

.element {
animation: fade-in 0.5s ease forwards;
}

3.8 반응형 미디어 쿼리
@media (max-width: 768px) {
.container {
flex-direction: column;
}
}

팁: 모바일 퍼스트 개발 시 (min-width) 방식 사용도 추천.

4. 비슷한 속성 비교
   display: inline vs inline-block vs block
   속성 줄 차지 width/height 특징
   inline X X 텍스트처럼 흐름 유지
   inline-block X O 버튼, 아이콘 스타일링에 유용
   block O O div, section 등 레이아웃 기본
   position 비교
   position 기준 흐름 영향 특징
   static 문서 흐름 유지 기본
   relative 자기 자신 유지 기준점 제공
   absolute relative 부모 제거 자유 배치
   fixed 화면 제거 네비게이션
   sticky 화면 유지 특정 위치에서 고정
   flex vs grid
   flex grid
   1차원 2차원
   정렬 중심 레이아웃 중심
   메뉴/버튼 카드/대시보드
   margin vs padding
   margin padding
   요소 바깥 요소 내부
   요소 간 거리 컨텐츠 여백
   배경 영향 없음 배경 포함됨
   em vs rem
   단위 기준 특징
   em 부모 요소 기준 중첩되면 값이 커질 수 있음
   rem 루트(html) 기준 일관된 크기 조절 가능
