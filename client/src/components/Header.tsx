import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved === "dark";
    // 첫 방문 시 OS 선호도
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark); // <html>에 부착
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">Text CRUD</h1>
        <button
          onClick={() => setDark((v) => !v)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}
