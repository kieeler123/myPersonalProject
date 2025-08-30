import DevLogList from "../components/DevLogList";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 개발일지</h1>
      <DevLogList />
    </main>
  );
}
