// src/features/chat/ChatRoom.jsx
import { useEffect, useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import { listenMessages, sendMessage, softDeleteChat } from "./api";

export default function ChatRoom({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const me = auth.currentUser;

  // 🔴 채팅방 ID가 없으면 아무 것도 하지 않음
  useEffect(() => {
    if (!chatId) return;
    // Firestore 실시간 구독
    const unsub = listenMessages(chatId, setMessages);
    return () => unsub && unsub();
  }, [chatId]);

  // 메시지 갱신 시 자동으로 하단으로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    try {
      setSending(true);
      await sendMessage(chatId, text); // Firestore에 저장
      setInput("");
    } catch (e) {
      console.error("메시지 전송 실패:", e);
      alert("메시지 전송 실패: " + (e?.message || e));
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    // Enter 전송, Shift+Enter 줄바꿈
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const onDelete = async () => {
    if (!window.confirm("정말 이 채팅방을 목록에서 숨길까요? (소프트 삭제)"))
      return;
    try {
      await softDeleteChat(chatId);
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제(숨김) 실패: " + (e?.message || e));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <header className="p-3 border-b flex items-center justify-between">
        <div className="font-medium text-sm">채팅방: {chatId}</div>
        <button
          onClick={onDelete}
          className="text-xs text-red-600 border px-2 py-1 rounded hover:bg-red-50"
          title="소프트 삭제(목록에서 숨김)"
        >
          삭제
        </button>
      </header>

      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => {
          const isMine = m.senderId === me?.uid;
          return (
            <div
              key={m.id}
              className={`max-w-[75%] px-3 py-2 rounded-2xl shadow
                          ${
                            isMine
                              ? "ml-auto bg-blue-100"
                              : "mr-auto bg-gray-100"
                          }`}
            >
              <div className="text-sm whitespace-pre-wrap break-words">
                {m.text}
              </div>
              <div className="text-[10px] opacity-60 mt-1">
                {/* createdAt이 serverTimestamp 적용 전엔 undefined일 수 있음 */}
                {m.createdAt?.toDate?.()
                  ? m.createdAt.toDate().toLocaleTimeString()
                  : ""}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 입력 영역 */}
      <div className="p-2 flex gap-2 border-t">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 border rounded px-3 py-2 h-12 resize-none"
          placeholder="메시지 입력… (Enter 전송, Shift+Enter 줄바꿈)"
          disabled={sending}
        />
        <button
          onClick={onSend}
          disabled={sending || !input.trim()}
          className="px-4 py-2 rounded-xl shadow border disabled:opacity-50"
        >
          전송
        </button>
      </div>
    </div>
  );
}
