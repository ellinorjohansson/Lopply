import Link from "next/link";
import { IRace } from "@/models/Race";

// This is temporary

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
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 bg-primary">
        <div className="mb-8">
          <Link href="/" className="text-sm mb-2 inline-block text-secondary">
            ← Back to Home
          </Link>
          <h2 className="text-4xl font-bold mb-2 font-display">Races</h2>
          <p className="text-lg">Browse upcoming running races</p>
        </div>

        {races.length === 0 ? (
          <div className="rounded-lg border">
            <p className="bg-conic-120">
              No races found. Add some races to your database to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {races.map((race: IRace) => (
              <div key={race._id} className="rounded-lg border-primaryaccent">
                <h2 className="text-xl font-semibold mb-2">{race.name}</h2>
                <div className="space-y-1 text-sm ">
                  <p>📍 {race.location}</p>
                  <p>📅 {new Date(race.date).toLocaleDateString()}</p>
                  {race.distance && <p>🏃 {race.distance}</p>}
                </div>
                {race.description && (
                  <p className="mt-3 text-sm">{race.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
