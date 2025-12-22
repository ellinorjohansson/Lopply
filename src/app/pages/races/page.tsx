import Link from "next/link";
import { IRace } from "@/models/Race";

async function getRaces() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/races`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch races");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
}

export default async function RacesPage() {
  const races = await getRaces();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-2 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            Races
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Browse upcoming running races
          </p>
        </div>

        {races.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No races found. Add some races to your database to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {races.map((race: IRace) => (
              <div
                key={race._id}
                className="rounded-lg border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                  {race.name}
                </h2>
                <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>📍 {race.location}</p>
                  <p>📅 {new Date(race.date).toLocaleDateString()}</p>
                  {race.distance && <p>🏃 {race.distance}</p>}
                </div>
                {race.description && (
                  <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                    {race.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
