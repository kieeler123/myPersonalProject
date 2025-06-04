// Login.tsx
import { useState } from "react";
import { api } from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await api.post("/auth/login", { email, password });
      alert("로그인 성공");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button onClick={login}>로그인</button>
    </div>
  );
}
