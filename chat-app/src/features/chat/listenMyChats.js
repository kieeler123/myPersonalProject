// src/features/chat/listenMyChats.js
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

/**
 * 내 채팅방 실시간 구독 (uid 기반)
 * @param {string} uid - 현재 로그인 사용자 UID
 * @param {(items:any[])=>void} cb - 데이터 변경 시 호출할 콜백
 * @returns {()=>void} unsubscribe 함수
 */
export function listenMyChats(uid, cb) {
  if (typeof uid !== "string" || !uid) {
    console.error("listenMyChats: 잘못된 uid", uid);
    return () => {};
  }

  const q = query(
    collection(db, "chats"),
    where("members", "array-contains", uid),
    where("deleted", "==", false), // 소프트 삭제 방 제외
    orderBy("lastMessageAt", "desc") // 최신 메시지 기준 정렬
  );

  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
}
