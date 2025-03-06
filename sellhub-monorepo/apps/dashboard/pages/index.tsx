import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <button 
        className="bg-blue-500 text-white px-6 py-2 rounded"
        onClick={() => router.push("/dashboard")}
      >
        Login (Mock)
      </button>
    </div>
  );
}
