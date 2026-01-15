"use client";

import { useEffect, useState } from "react";
import Card from "@/common/components/card/Card";
import { IRace } from "@/models/Race";
import { getRaces } from "@/services/raceService";
import { useTranslation } from "@/common/hooks/useTranslation";

export default function FeaturedRaces() {
  const [races, setRaces] = useState<IRace[]>([]);
  const [loading, setLoading] = useState(true);
  const racesT = useTranslation("races");

  useEffect(() => {
    async function fetchFeaturedRaces() {
      try {
        const allRaces = await getRaces();
        const currentDate = new Date();
        const futureRaces = allRaces.filter(
          (race) => new Date(race.date) >= currentDate
        );
        const randomRaces = futureRaces
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setRaces(randomRaces);
      } catch (err) {
        console.error("Error fetching featured races:", err);
        setRaces([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedRaces();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-secondaryaccent py-8">{racesT("loading")}</div>
    );
  }

  if (races.length === 0) {
    return (
      <div className="text-center text-secondaryaccent py-8">
        {racesT("no_races_found")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
      {races.map((race) => (
        <Card
          key={race._id}
          id={race._id}
          image={race.imageUrl}
          title={race.name}
          location={race.location}
          date={new Date(race.date).toISOString().slice(0, 10)}
          distance={race.distance}
          terrain={race.terrain}
          difficulty={race.difficulty}
          description={race.description || ""}
          raceUrl={race.raceUrl}
        />
      ))}
    </div>
  );
}
