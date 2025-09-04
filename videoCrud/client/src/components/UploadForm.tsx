import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";

interface Props {
  onUploaded: () => void;
}

export default function UploadForm({ onUploaded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0); // 0~100
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  // Axios v1 이상에서는 AbortController로 취소 가능
  const abortRef = useRef<AbortController | null>(null);

  // 속도(B/s)와 ETA(초) 계산
  const speed = useMemo(() => {
    if (!startedAt || loadedBytes <= 0) return 0;
    const elapsedSec = (Date.now() - startedAt) / 1000;
    return loadedBytes / Math.max(elapsedSec, 0.001);
  }, [startedAt, loadedBytes]);

  const etaSec = useMemo(() => {
    if (speed <= 0 || totalBytes <= 0) return 0;
    const remain = totalBytes - loadedBytes;
    return remain / speed;
  }, [speed, totalBytes, loadedBytes]);

  const humanSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
  };

  const humanTime = (sec: number) => {
    if (!isFinite(sec) || sec < 0) return "-";
    if (sec < 60) return `${Math.round(sec)}초`;
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}분 ${s}초`;
  };

  const resetState = () => {
    setProgress(0);
    setLoadedBytes(0);
    setTotalBytes(0);
    setStartedAt(null);
    setIsUploading(false);
    abortRef.current = null;
  };

  const submit = async () => {
    try {
      if (!file) return setError("파일을 선택하세요");
      if (!title.trim()) return setError("제목을 입력하세요");

      setError("");
      setIsUploading(true);
      setProgress(0);
      setLoadedBytes(0);
      setTotalBytes(file.size);
      setStartedAt(Date.now());

      const controller = new AbortController();
      abortRef.current = controller;

      const form = new FormData();
      form.append("file", file!);
      form.append("title", title.trim()); // ← 공백 제거 후 전송
      form.append("description", description ?? "");
      await api.post("/api/videos", form); // Content-Type 수동 지정 ❌ (Axios가 자동 지정)

      await api.post("/api/videos", form, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: controller.signal,
        onUploadProgress: (evt) => {
          // 일부 브라우저/프록시 환경에서 total이 없을 수도 있음
          if (typeof evt.loaded === "number") {
            setLoadedBytes(evt.loaded);
            if (evt.total) {
              const pct = Math.round((evt.loaded * 100) / evt.total);
              setProgress(Math.min(100, Math.max(0, pct)));
              setTotalBytes(evt.total);
            } else {
              // total 미제공 시 추정 불가: 진행 바는 불확정 스타일로 처리 가능
              setProgress(0);
            }
          }
        },
      });

      // 성공 → 폼 초기화
      setTitle("");
      setDescription("");
      setFile(null);
      resetState();
      onUploaded();
    } catch (e: any) {
      if (e?.name === "CanceledError" || e?.message === "canceled") {
        setError("업로드가 취소되었습니다");
      } else {
        setError(e?.response?.data?.error || "업로드 실패");
      }
      resetState();
    }
  };

  const cancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  };

  // 파일 선택 시 오류 메시지 초기화
  useEffect(() => {
    if (file) setError("");
  }, [file]);

  // 진행률 % 텍스트
  const pctText = totalBytes ? `${progress}%` : isUploading ? "전송 중..." : "";

  return (
    <div className="p-4 border rounded-2xl shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">업로드</h2>

      <div className="flex flex-col gap-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="설명(선택)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isUploading}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isUploading}
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* 진행 영역 */}
      {isUploading && (
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
            {/* total이 없으면 애니메이션 바처럼 보이게 처리하고 싶다면 Tailwind animate- 클래스를 사용하세요 */}
            <div
              className="bg-blue-600 h-3 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 상세 정보 */}
          <div className="text-sm text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
            <span>{pctText}</span>
            <span>
              {humanSize(loadedBytes)} / {humanSize(totalBytes)}
            </span>
            <span>속도: {speed ? `${humanSize(speed)}/s` : "-"}</span>
            <span>남은 시간: {etaSec ? humanTime(etaSec) : "-"}</span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={isUploading}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
        >
          {isUploading ? "업로드 중..." : "업로드"}
        </button>
        {isUploading && (
          <button
            type="button"
            onClick={cancel}
            className="px-4 py-2 rounded-xl border"
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
}
