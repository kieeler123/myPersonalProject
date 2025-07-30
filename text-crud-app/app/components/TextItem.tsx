"use client";

interface TextItemProps {
  text: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TextItem({ text, onDelete, onEdit }: TextItemProps) {
  return (
    <div className="text-card">
      <p className="text-content">{text}</p>
      <div className="text-actions">
        <button onClick={onEdit} className="action-button edit">
          ✏️ 수정
        </button>
        <button onClick={onDelete} className="action-button delete">
          🗑 삭제
        </button>
      </div>
    </div>
  );
}
