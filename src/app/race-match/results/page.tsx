"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/common/hooks/useTranslation";
import { getBucketlistRaces } from "@/services/bucketlistService";
import Card from "@/common/components/card/Card";
import RaceCardSkeleton from "@/common/modules/skeleton/RaceCardSkeleton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const racesT = useTranslation("races");
  const resultsT = useTranslation("results");
  const { data: session } = useSession();

  const [matchedRaces, setMatchedRaces] = useState<RaceWithMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [bucketlistRaceIds, setBucketlistRaceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchBucketlist() {
      if (session) {
        const bucketlistRaces = await getBucketlistRaces();
        const bucketlistIds = new Set(bucketlistRaces.map(race => race._id as string));
        setBucketlistRaceIds(bucketlistIds);
      } else {
        setBucketlistRaceIds(new Set());
      }
    }

    fetchBucketlist();
  }, [session]);

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

          if (locations.length > 0) {
            const locationString = race.location.toLowerCase();
            const isMatched = locations.some((loc: string) => {
              const region = loc.toLowerCase();

              if (region === "europe") {
                return ["france", "germany", "italy", "spain", "uk", "united kingdom", "sweden", "norway", "denmark", "finland", "netherlands", "belgium", "austria", "switzerland", "portugal", "greece", "poland", "czech", "ireland", "iceland"].some(country => locationString.includes(country));
              }
              if (region === "africa") {
                return ["kenya", "tanzania", "south africa", "morocco", "egypt", "ethiopia", "uganda", "namibia", "botswana", "zimbabwe"].some(country => locationString.includes(country));
              }
              if (region === "usa") {
                return locationString.includes("usa") || locationString.includes("united states") || locationString.includes("america");
              }
              if (region === "asia") {
                return ["japan", "china", "thailand", "singapore", "malaysia", "indonesia", "vietnam", "korea", "philippines", "taiwan", "india", "nepal", "bhutan"].some(country => locationString.includes(country));
              }
              if (region === "south_america") {
                return ["brazil", "argentina", "chile", "peru", "colombia", "ecuador", "bolivia", "uruguay", "paraguay", "venezuela"].some(country => locationString.includes(country));
              }
              if (region === "oceania") {
                return ["australia", "new zealand", "fiji", "papua new guinea", "samoa", "tahiti"].some(country => locationString.includes(country));
              }

              return locationString.includes(region);
            });
            if (isMatched) matchedCategories++;
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

        const filteredRaces = sorted.filter((race: { matchPercentage: number; }) => race.matchPercentage > 0);

        setMatchedRaces(filteredRaces);
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
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
        <h2 className="text-6xl sm:pl-9 md:text-7xl">{resultsT("your_race_matches")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-15 p-4 justify-items-center auto-rows-fr mx-auto w-full mt-8">
          {[...Array(12)].map((_, i) => (
            <RaceCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (matchedRaces.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
        <h2 className="text-6xl sm:pl-9 md:text-7xl">{resultsT("your_race_matches")}</h2>
        <div className="flex justify-center mt-50">
          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-xl md:text-2xl">
            {racesT("no_races")}
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/race-match">
            <SecondaryButton size="medium" text={resultsT("update_preferences")} icon="tune" />
          </Link>
        </div>
      </main>
    );
  }


  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mx-auto max-w-6xl px-4 py-1">
        <div className="bg-primaryaccent/20 text-primaryaccent mx-auto w-70 rounded-3xl px-6 py-2 flex justify-center mt-5 md:mt-12">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined">
            favorite
          </span>{resultsT("personalized_matches")}</span>
        </div>
        <div className="mt-10 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">{resultsT("your_race_matches")}</h2>
          <p className="sm:pl-9 mt-1 md:mt-1 mb-6 text-1xl md:text-2xl">{resultsT("matches_subtitle")}</p>
        </div>
        <div className="flex justify-center mt-15 mb-15">
          <Link href="/race-match">
            <SecondaryButton size="medium" text={resultsT("update_preferences")} icon="tune" />
          </Link>
        </div>

      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-15 p-4 justify-items-center auto-rows-fr mx-auto w-full">
        {matchedRaces.map((race) => (
          <div key={race._id} className="relative h-full w-80 flex">
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
              isFavorited={bucketlistRaceIds.has(race._id)}
            />
            <div className="bg-primaryaccent text-primary absolute top-[-12] left-[-12] px-4 py-2 rounded-full shadow-lg z-10 flex justify-center">
              <span className="flex items-center gap-2 text-secondaryaccent"><span className="material-symbols-outlined text-secondaryaccent">
                star_shine
              </span>{race.matchPercentage}% {resultsT("match_percentage")}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Results;