"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/common/hooks/useTranslation";
import { getBucketlistRaces } from "@/services/bucketlistService";
import { IRace } from "@/models/Race";
import Card from "@/common/components/card/Card";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import Link from "next/link";

const Bucketlist = () => {
  const b = useTranslation("bucketlist");
  const bu = useTranslation("buttons");
  const [races, setRaces] = useState<IRace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBucketlist = async () => {
      setIsLoading(true);
      const bucketlistRaces = await getBucketlistRaces();
      setRaces(bucketlistRaces);
      setIsLoading(false);
    };

    fetchBucketlist();
  }, []);

  const handleFavoriteChange = async () => {
    const bucketlistRaces = await getBucketlistRaces();
    setRaces(bucketlistRaces);
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-18 mt-18 md:mt-25 md:mb-25 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {b("my_bucketlist")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {b("bucketlist_subtext")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">{b("loading")}</p>
          </div>
        ) : races.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 mt-40 mb-40 text-center space-y-3">
            <span className="material-symbols-outlined text-7xl! text-secondaryaccent">
              steps
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold">
              {b("no_races_saved")}
            </h3>

            <p className="text-base md:text-xl mb-20">
              {b("no_races_subtext")}
            </p>

            <Link href="/races" scroll={true}>
              <PrimaryButton
                text={bu("explore_races")}
                icon="search"
                size="small"
              />
            </Link>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {races.map((race) => (
              <Card
                key={race._id}
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
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Bucketlist;