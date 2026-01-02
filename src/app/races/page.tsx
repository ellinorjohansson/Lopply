import Card, { RaceCardProps } from "@/common/components/card/Card";
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
  const racesData = await getRaces();

  const races: RaceCardProps[] = racesData.map((race: IRace) => ({
    image: race.imageUrl,
    title: race.name,
    location: race.location,
    date: new Date(race.date).toISOString().slice(0, 10),
    distance: race.distance,
    terrain: race.terrain,
    difficulty: race.difficulty,
    description: race.description,
    raceUrl: race.raceUrl,
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 bg-primary min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
        {races.map((race: RaceCardProps, index: number) => (
          <Card key={index} {...race} />
        ))}
      </div>
    </main>
  );
}
