import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";

export default function Home() {
  const g = useTranslation("general");
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-zinc-50 mb-4">
            {g("lopply")}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            Discover and track running races
          </p>
          <Link
            href="/pages/races"
            className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold hover:opacity-80 transition-opacity inline-block"
          >
            Browse Races
          </Link>
        </div>
      </main>
    </div>
  );
}
