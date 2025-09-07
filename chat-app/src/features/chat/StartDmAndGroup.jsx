// src/features/chat/StartDmAndGroup.jsx
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { getOrCreate1to1Chat, createGroupChat } from "./api";

export default function StartDmAndGroup({ onOpenChat }) {
  const [peer, setPeer] = useState("");
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const me = auth.currentUser;

  const startDm = async () => {
    const myUid = me?.uid;
    const peerUid = peer.trim();

    if (!myUid) return alert("로그인이 필요합니다.");
    if (!peerUid) return alert("상대 UID를 입력하세요.");
    if (peerUid === myUid) return alert("본인과는 DM을 만들 수 없습니다.");

    try {
      setLoading(true);
      const chatId = await getOrCreate1to1Chat(myUid, peerUid);
      onOpenChat({ id: chatId, title: `DM:${peerUid}` });
      setPeer("");
    } catch (e) {
      console.error(e);
      alert("DM 생성 실패: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async () => {
    const myUid = me?.uid;
    if (!myUid) return alert("로그인이 필요합니다.");

    const list = members
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      // 본인 uid는 입력돼 있어도 제거(방장은 별도 owner로 추가됨)
      .filter((uid) => uid !== myUid);

    if (list.length < 1) return alert("최소 1명 이상의 멤버 UID가 필요합니다.");

    try {
      setLoading(true);
      const chatId = await createGroupChat({
        title: title.trim(),
        ownerUid: myUid,
        memberUids: list,
      });
      onOpenChat({ id: chatId, title: title || "새 그룹" });
      setTitle("");
      setMembers("");
    } catch (e) {
      console.error(e);
      alert("그룹 생성 실패: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const onPeerKeyDown = (e) => {
    if (e.key === "Enter") startDm();
  };
  const onMembersKeyDown = (e) => {
    if (e.key === "Enter") createGroup();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="상대 UID"
          value={peer}
          onChange={(e) => setPeer(e.target.value)}
          onKeyDown={onPeerKeyDown}
        />
        <button
          onClick={startDm}
          disabled={loading || !peer.trim()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          DM 시작
        </button>
      </div>

      <div className="p-3 border rounded space-y-2">
        <div className="text-sm font-semibold">그룹 만들기</div>
        <input
          className="border rounded px-2 py-1 w-full"
          placeholder="그룹 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createGroup()}
        />
        <input
          className="border rounded px-2 py-1 w-full"
          placeholder="멤버 UID들(,로 구분)"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          onKeyDown={onMembersKeyDown}
        />
        <button
          onClick={createGroup}
          disabled={loading || members.trim().length === 0}
          className="px-3 py-1 border rounded w-full disabled:opacity-50"
        >
          그룹 생성
        </button>
      </div>
    </div>
  );
}
