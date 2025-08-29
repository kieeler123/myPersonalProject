interface Props {
  title: string;
  setTitle: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  editId: string | null;
  onSubmit: () => void;
  cancelEdit: () => void;
}

export default function PostForm({
  title,
  setTitle,
  content,
  setContent,
  editId,
  onSubmit,
  cancelEdit,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h2 className="mb-3 text-base font-semibold">
        {editId ? "게시글 수정" : "새 게시글"}
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={5}
          className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={onSubmit}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              onClick={cancelEdit}
              className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          임시저장은 자동으로 로컬스토리지에 저장됩니다.
        </p>
      </div>
    </div>
  );
}
