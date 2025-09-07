import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, googleLogin } from "../../lib/firebase";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) return <div className="p-6">로딩중…</div>;

  if (!user)
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-xl font-semibold">채팅앱</h1>
          <button
            onClick={googleLogin}
            className="px-4 py-2 rounded-2xl shadow border"
          >
            Google로 로그인
          </button>
        </div>
      </div>
    );

  return children;
}
