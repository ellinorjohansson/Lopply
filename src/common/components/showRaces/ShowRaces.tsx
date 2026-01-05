import Card, { RaceCardProps } from "@/common/components/card/Card";
import { IRace } from "@/models/Race";
import { getRaces } from "@/services/raceService";

interface ShowRacesProps {
  limit?: number;
}

export default async function ShowRaces({ limit }: ShowRacesProps) {
  const racesData: IRace[] = await getRaces();

  const races: RaceCardProps[] = racesData.map((race) => ({
    image: race.imageUrl,
    title: race.name,
    location: race.location,
    date: new Date(race.date).toISOString().slice(0, 10),
    distance: race.distance,
    terrain: race.terrain,
    difficulty: race.difficulty,
    description: race.description || "",
    raceUrl: race.raceUrl,
  }));

  const displayedRaces = limit ? races.slice(0, limit) : races;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
      {displayedRaces.map((race, index) => (
        <Card key={index} {...race} />
      ))}
    </div>
  );
}
