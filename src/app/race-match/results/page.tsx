"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/common/hooks/useTranslation";
import Card from "@/common/components/card/Card";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import Link from "next/link";

interface Race {
  _id: string;
  name: string;
  terrain: string;
  distance: number;
  difficulty: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  raceUrl: string;
}

interface RaceWithMatch extends Race {
  matchPercentage: number;
}

const Results = () => {
  const races = useTranslation("races");

  const [matchedRaces, setMatchedRaces] = useState<RaceWithMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndMatchRaces = async () => {
      try {
        const response = await fetch("/api/races");
        const data = await response.json();

        if (!data.data || !Array.isArray(data.data)) {
          console.error("Invalid data format:", data);
          setMatchedRaces([]);
          return;
        }

        const savedPreferences = localStorage.getItem("raceMatchPreferences");
        const preferences = savedPreferences ? JSON.parse(savedPreferences) : {};

        const terrains = preferences.terrains || [];
        const distances = preferences.distances || [];
        const locations = preferences.locations || [];
        const difficulties = preferences.difficulties || [];
        const months = preferences.months || [];

        const totalCategories = [terrains, distances, locations, difficulties, months].filter(cat => cat.length > 0).length;

        const racesWithMatch = data.data.map((race: Race) => {
          let matchedCategories = 0;

          if (terrains.length > 0 && terrains.some((t: string) => race.terrain.toLowerCase().includes(t.toLowerCase()))) {
            matchedCategories++;
          }

          if (distances.length > 0) {
            const raceDistance = race.distance;
            const isMatched = distances.some((d: string) => {
              if (d.toLowerCase().includes("5k")) return raceDistance >= 4 && raceDistance <= 6;
              if (d.toLowerCase().includes("10k")) return raceDistance >= 9 && raceDistance <= 11;
              if (d.toLowerCase().includes("half")) return raceDistance >= 20 && raceDistance <= 22;
              if (d.toLowerCase().includes("marathon")) return raceDistance >= 40 && raceDistance <= 45;
              if (d.toLowerCase().includes("ultra")) return raceDistance > 45;
              return false;
            });
            if (isMatched) matchedCategories++;
          }

          if (locations.length > 0 && locations.some((loc: string) => race.location.toLowerCase().includes(loc.toLowerCase()))) {
            matchedCategories++;
          }

          if (difficulties.length > 0 && difficulties.some((diff: string) => race.difficulty.toLowerCase().includes(diff.toLowerCase()))) {
            matchedCategories++;
          }

          if (months.length > 0) {
            const raceMonth = new Date(race.date).toLocaleString("en-US", { month: "short" });
            const isMatched = months.some((month: string) => raceMonth.toLowerCase().includes(month.toLowerCase()));
            if (isMatched) matchedCategories++;
          }

          const matchPercentage = totalCategories > 0 ? Math.round((matchedCategories / totalCategories) * 100) : 0;

          return {
            ...race,
            matchPercentage,
          };
        });

        const sorted = racesWithMatch.sort((a: { matchPercentage: number; }, b: { matchPercentage: number; }) => b.matchPercentage - a.matchPercentage);
        setMatchedRaces(sorted);
      } catch (error) {
        console.error("Error fetching races:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMatchRaces();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">{races("loading")}</p>
      </main>
    );
  }

  if (matchedRaces.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-6xl sm:pl-9 md:text-7xl">Your Race Matches</h2>
        <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">{races("no_races")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mx-auto max-w-6xl px-4 py-1">
        <div className="bg-primaryaccent/20 text-primaryaccent mx-auto w-70 rounded-3xl px-6 py-2 flex justify-center mt-5 md:mt-12">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined">
            favorite
          </span>Your personalized matches</span>
        </div>
        <div className="mt-10 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">Your Race Matches</h2>
          <p className="sm:pl-9 mt-1 md:mt-1 mb-6 text-1xl md:text-2xl">Based on your preferences, we have matched you with races that fit your style</p>
        </div>
        <div className="flex justify-center mt-15 mb-15">
          <Link href="/race-match">
            <SecondaryButton size="medium" text="Update Preferences" icon="tune" />
          </Link>
        </div>

      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-15 p-4 justify-items-center auto-rows-fr">
        {matchedRaces.map((race) => (
          <div key={race._id} className="relative h-full w-full flex">
            <Card
              id={race._id}
              image={race.imageUrl}
              title={race.name}
              location={race.location}
              date={new Date(race.date).toLocaleDateString()}
              distance={race.distance}
              terrain={race.terrain}
              difficulty={race.difficulty}
              description={race.description || ""}
              raceUrl={race.raceUrl}
            />
            <div className="bg-primaryaccent text-primary absolute top-[-12] left-[-12] px-4 py-2 rounded-full shadow-lg z-10 flex justify-center">
              <span className="flex items-center gap-2 text-secondaryaccent"><span className="material-symbols-outlined text-secondaryaccent">
                star_shine
              </span>{race.matchPercentage}% Match</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Results;