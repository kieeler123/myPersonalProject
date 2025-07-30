// app/layout.tsx
import "../styles/global.css";

export const metadata = {
  title: "Text CRUD App",
  description: "Next.js + MongoDB + TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
