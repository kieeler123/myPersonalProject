// src/App.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthGate from "./features/auth/AuthGate";
import { listenMyChats } from "./features/chat/listenMyChats";
import { auth } from "./lib/firebase";
import ChatRoom from "./features/chat/ChatRoom";
import StartDmAndGroup from "./features/chat/StartDmAndGroup";

export default function App() {
  const [user, setUser] = useState(undefined); // undefined=로딩, null=비로그인, object=로그인
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(
    () => localStorage.getItem("activeChatId") || null
  );

  // 1) 인증 상태 구독
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return unsubAuth;
  }, []);

  // 2) 내 채팅 목록 실시간 구독
  useEffect(() => {
    if (!user?.uid) {
      setChats([]);
      return;
    }
    const unsubChats = listenMyChats(user.uid, setChats);
    return unsubChats;
  }, [user?.uid]);

  // 3) activeId를 localStorage에 저장/복원
  useEffect(() => {
    if (activeId) localStorage.setItem("activeChatId", activeId);
    else localStorage.removeItem("activeChatId");
  }, [activeId]);

  const openChat = ({ id }) => setActiveId(id);

  return (
    <AuthGate>
      <div className="h-screen grid grid-cols-[320px_1fr]">
        <aside className="border-r p-3 space-y-3 overflow-y-auto">
          <StartDmAndGroup onOpenChat={openChat} />
          <h2 className="font-bold">내 채팅</h2>

          <ul className="space-y-1">
            {chats.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => openChat({ id: c.id })}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                    activeId === c.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="text-sm truncate">
                    {c.title || c.lastMessage || "(메시지 없음)"}
                  </div>
                  <div className="text-xs opacity-60">
                    {c.lastMessageAt?.toDate?.().toLocaleString?.() ?? ""}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="h-full">
          {activeId ? (
            <ChatRoom chatId={activeId} />
          ) : (
            <div className="h-full grid place-items-center text-sm opacity-70">
              채팅을 선택하거나 새로 만드세요
            </div>
          )}
        </main>
      </div>
    </AuthGate>
  );
}
