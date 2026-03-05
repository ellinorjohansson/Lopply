"use client";

import { useEffect, useState } from "react";
import Card from "@/common/components/card/Card";
import RaceCardSkeleton from "@/common/modules/skeleton/RaceCardSkeleton";
import { IRace } from "@/models/Race";
import { getRaces } from "@/services/raceService";
import { getBucketlistRaces } from "@/services/bucketlistService";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useSession } from "next-auth/react";

const FEATURED_RACES_CACHE_KEY = "lopply:featured-races";

const getLocalDayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

type FeaturedRacesCache = {
  day: string;
  races: IRace[];
};

export default function FeaturedRaces() {
  const [races, setRaces] = useState<IRace[]>([]);
  const [loading, setLoading] = useState(true);
  const [bucketlistRaceIds, setBucketlistRaceIds] = useState<Set<string>>(new Set());
  const racesT = useTranslation("races");
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchFeaturedRaces() {
      try {
        const today = getLocalDayKey();

        // Fetch bucketlist races if user is logged in
        if (session) {
          const bucketlistRaces = await getBucketlistRaces();
          const bucketlistIds = new Set(bucketlistRaces.map(race => race._id as string));
          setBucketlistRaceIds(bucketlistIds);
        } else {
          setBucketlistRaceIds(new Set());
        }

        const cachedRaw = localStorage.getItem(FEATURED_RACES_CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as FeaturedRacesCache;
          if (cached.day === today && Array.isArray(cached.races)) {
            setRaces(cached.races);
            return;
          }
        }

        const allRaces = await getRaces();
        const currentDate = new Date();
        const futureRaces = allRaces.filter(
          (race) => new Date(race.date) >= currentDate
        );
        const randomRaces = futureRaces
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setRaces(randomRaces);

        const cachePayload: FeaturedRacesCache = {
          day: today,
          races: randomRaces,
        };
        localStorage.setItem(FEATURED_RACES_CACHE_KEY, JSON.stringify(cachePayload));
      } catch (err) {
        console.error("Error fetching featured races:", err);
        setRaces([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedRaces();
  }, [session]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
        {[...Array(3)].map((_, i) => (
          <RaceCardSkeleton key={i} />
        ))}
      </div>
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
          isFavorited={bucketlistRaceIds.has(race._id as string)}
        />
      ))}
    </div>
  );
}
