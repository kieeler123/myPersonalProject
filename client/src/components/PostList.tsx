import type { Post } from "../types/post";

interface Props {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export default function PostList({ posts, onEdit, onDelete }: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {posts.map((post) => (
          <li
            key={post._id}
            className="group p-4 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold">{post.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {post.content}
                </p>
                {post.category && (
                  <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {post.category}
                  </span>
                )}
              </div>
              <div className="shrink-0 space-x-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => onEdit(post)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post._id)}
                  className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-700/50 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
