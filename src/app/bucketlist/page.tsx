"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/common/hooks/useTranslation";
import { getBucketlistRaces } from "@/services/bucketlistService";
import { IRace } from "@/models/Race";
import Card from "@/common/components/card/Card";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import DropdownField from "@/common/components/input/dropdownField/DropdownField";
import SearchBar from "@/common/components/searchBar/SearchBar";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import Link from "next/link";

const Bucketlist = () => {
  const bucketT = useTranslation("bucketlist");
  const buttonsT = useTranslation("buttons");
  const racesT = useTranslation("races");
  const [races, setRaces] = useState<IRace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"upcoming" | "farthest" | "">("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showFavoriteSuccess, setShowFavoriteSuccess] = useState(false);

  useEffect(() => {
    const fetchBucketlist = async () => {
      setIsLoading(true);
      const bucketlistRaces = await getBucketlistRaces();
      setRaces(bucketlistRaces);
      setIsLoading(false);
    };

    fetchBucketlist();
  }, []);

  const handleFavoriteChange = async (raceId: string) => {
    setRaces((prevRaces) => prevRaces.filter((race) => race._id !== raceId));
  };

  const filteredRaces = races.filter((race) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      race.name.toLowerCase().includes(query) ||
      race.location.toLowerCase().includes(query)
    );
  });

  const sortedRaces = [...filteredRaces].sort((a, b) => {
    if (!sortBy) return 0;
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "upcoming" ? dateA - dateB : dateB - dateA;
  });

  return (
    <main>
      {showRemoveSuccess && (
        <SuccedToaster
          headerMessage={bucketT("removed_from_bucketlist")}
          text={bucketT("removed_subtext")}
          onClose={() => setShowRemoveSuccess(false)}
        />
      )}
      {showFavoriteSuccess && (
        <SuccedToaster
          headerMessage={bucketT("removed_from_bucketlist")}
          text={bucketT("removed_subtext")}
          onClose={() => setShowFavoriteSuccess(false)}
        />
      )}
      <section className="mx-auto max-w-6xl px-4 py-12 mb-20">
        <div className="mb-18 mt-18 md:mt-25 md:mb-25 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {bucketT("my_bucketlist")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {bucketT("bucketlist_subtext")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">{bucketT("loading")}</p>
          </div>
        ) : races.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 mt-40 mb-40 text-center space-y-3">
            <span className="material-symbols-outlined text-7xl! text-secondaryaccent">
              steps
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold">
              {bucketT("no_races_saved")}
            </h3>

            <p className="text-base md:text-xl mb-20">
              {bucketT("no_races_subtext")}
            </p>

            <Link href="/races" scroll={true}>
              <PrimaryButton
                text={buttonsT("explore_races")}
                icon="search"
                size="small"
              />
            </Link>
          </div>

        ) : (
          <>
            <div className="mb-6 px-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                label={bucketT("search_label")}
                placeholder={bucketT("search_placeholder")}
                ariaLabel={bucketT("search_aria_label")}
              />
            </div>
            <div className="mb-6 px-4">
              <DropdownField
                placeholder={racesT("sort_by")}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "upcoming" | "farthest" | "")}
                options={[
                  { value: "upcoming", label: racesT("upcoming_first") },
                  { value: "farthest", label: racesT("farthest_first") },
                ]}
                size="small"
              />
            </div>
            {sortedRaces.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64 text-center space-y-3">
                <span className="material-symbols-outlined text-7xl! text-secondaryaccent">
                  search_off
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {bucketT("no_search_results")}
                </h3>
                <p className="text-base md:text-xl">
                  {bucketT("adjust_search_terms")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center auto-rows-fr">
                {sortedRaces.map((race) => (
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
                    onFavoriteChange={() => handleFavoriteChange(race._id as string)}
                    onRemoveSuccess={() => setShowRemoveSuccess(true)}
                    onFavoriteSuccess={() => setShowFavoriteSuccess(true)}
                    showRemoveButton={true}
                    isFavorited={true}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Bucketlist;