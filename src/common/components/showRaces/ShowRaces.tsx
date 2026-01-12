"use client";

import { useEffect, useState } from "react";
import Card, { RaceCardProps } from "@/common/components/card/Card";
import { IRace } from "@/models/Race";
import { getRaces } from "@/services/raceService";
import { useTranslation } from "@/common/hooks/useTranslation";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";

interface ShowRacesProps {
  terrainFilter?: string[];
  distanceFilter?: string[];
  difficultyFilter?: string[];
}

export default function ShowRaces({
  terrainFilter = [],
  distanceFilter = [],
  difficultyFilter = []
}: ShowRacesProps) {
  const [allRaces, setAllRaces] = useState<RaceCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const r = useTranslation("races");

  useEffect(() => {
    async function fetchRaces() {
      setLoading(true);
      const racesData: IRace[] = await getRaces();

      const currentDate = new Date();
      let futureRaces = racesData.filter((race) => new Date(race.date) >= currentDate);

      if (terrainFilter.length > 0) {
        futureRaces = futureRaces.filter((race) =>
          terrainFilter.includes(race.terrain)
        );
      }

      if (distanceFilter.length > 0) {
        const distanceMap: { [key: string]: number } = {
          "5K": 5,
          "10K": 10,
          "Half Marathon": 21,
          "Marathon": 42,
        };
        futureRaces = futureRaces.filter((race) => {
          const dist = Number(race.distance);
          let match = false;
          if (distanceFilter.includes("1-10K") && dist >= 1 && dist <= 10) match = true;
          if (distanceFilter.includes("10-20K") && dist > 10 && dist <= 20) match = true;
          if (distanceFilter.includes("20K+") && dist > 20) match = true;
          if (distanceFilter.some(label => distanceMap[label] === dist)) match = true;
          return match;
        });
      }

      if (difficultyFilter.length > 0) {
        futureRaces = futureRaces.filter((race) =>
          difficultyFilter.includes(race.difficulty)
        );
      }

      const mappedRaces: RaceCardProps[] = futureRaces.map((race) => ({
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

      setAllRaces(mappedRaces);
      setLoading(false);
      setVisibleCount(12);
    }

    fetchRaces();
  }, [terrainFilter, distanceFilter, difficultyFilter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center auto-rows-fr">
        <p className="col-span-full text-center py-12 text-secondaryaccent">
          {r("loading")}
        </p>
      </div>
    );
  }

  const racesToShow = allRaces.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center auto-rows-fr">
        {racesToShow.length > 0 ? (
          racesToShow.map((race, index) => (
            <Card key={index} {...race} />
          ))
        ) : (
          <p className="col-span-full text-center py-12 text-secondaryaccent">
            {r("no_races")}
          </p>
        )}
      </div>
      {visibleCount < allRaces.length && (
        <div className="flex justify-center mt-6">
          <PrimaryButton
            text={r("load_more")}
            size="medium"
            onClick={() => setVisibleCount((prev) => prev + 12)}
          />
        </div>
      )}
    </>
  );
}