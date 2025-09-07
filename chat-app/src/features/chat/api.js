// src/features/chat/api.js
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  orderBy,
  query,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

/** 1:1 DM: 같은 두 사람은 같은 chatId (중복 방지) */
export async function getOrCreate1to1Chat(uidA, uidB) {
  const [a, b] = [uidA, uidB].sort();
  const chatId = `dm_${a}_${b}`;
  const ref = doc(db, "chats", chatId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        type: "dm",
        members: [a, b],
        lastMessage: "",
        lastMessageAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        deleted: false,
      },
      { merge: true }
    );
  }
  return chatId;
}

/** 그룹 채팅 생성 */
export async function createGroupChat({ title, ownerUid, memberUids }) {
  const members = Array.from(new Set([ownerUid, ...memberUids])).sort();
  const ref = await addDoc(collection(db, "chats"), {
    type: "group",
    title: title?.trim() || "새 그룹",
    owner: ownerUid,
    members,
    lastMessage: "",
    lastMessageAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    deleted: false,
  });
  return ref.id;
}

/** 그룹 멤버 추가/삭제 */
export async function addGroupMember(chatId, uid) {
  await updateDoc(doc(db, "chats", chatId), { members: arrayUnion(uid) });
}
export async function removeGroupMember(chatId, uid) {
  await updateDoc(doc(db, "chats", chatId), { members: arrayRemove(uid) });
}

/** 메시지 전송 (+목록용 비정규화) */
export async function sendMessage(chatId, text) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("로그인이 필요합니다.");
  if (!text.trim()) return null; // 공백 메시지 방지

  try {
    // 1) 메시지 저장
    const msgRef = await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: uid,
      text,
      createdAt: serverTimestamp(),
    });

    // 2) 채팅 목록 갱신
    await updateDoc(doc(db, "chats", chatId), {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    });

    return msgRef.id;
  } catch (e) {
    console.error("메시지 전송 실패:", e);
    throw e;
  }
}

/** 소프트 삭제 (나에게서 숨김 용도) */
export async function softDeleteChat(chatId) {
  await updateDoc(doc(db, "chats", chatId), { deleted: true });
}

/** 메시지 실시간 구독 */
export function listenMessages(chatId, cb) {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

/** 메시지 더 불러오기 – 무한스크롤용 */
export async function loadMoreMessages(chatId, lastDocSnap, pageSize = 50) {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc"),
    startAfter(lastDocSnap),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return {
    items: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs.at(-1),
  };
}
