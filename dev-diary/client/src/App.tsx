import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 추후 상세 보기나 설정 페이지 등도 여기에 추가 가능 */}
      </Routes>
    </BrowserRouter>
  );
}
