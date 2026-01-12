"use client";

import { useState } from "react";
import ShowRaces from "@/common/components/showRaces/ShowRaces";
import FilterButton from "@/common/components/buttons/FilterButton";
import { useTranslation } from "@/common/hooks/useTranslation";

export default function RacesPage() {
  const r = useTranslation("races");

  const [selectedTerrain, setSelectedTerrain] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (_filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((f) => f !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-18 mt-18 md:mt-25 md:mb-25 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {r("explore_your_next_race")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {r("explore_subtext")}
          </p>
        </div>
      </section>

      <section className="w-full bg-secondary py-15">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <form>
            <fieldset className="mb-8">
              <legend className="text-lg text-primaryaccent">
                {r("terrain_type")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton
                  text="Urban"
                  icon="location_city"
                  isActive={selectedTerrain.includes("Urban")}
                  onClick={() => toggleFilter("Urban", selectedTerrain, setSelectedTerrain)}
                />
                <FilterButton
                  text="Mountain"
                  icon="terrain"
                  isActive={selectedTerrain.includes("Mountain")}
                  onClick={() => toggleFilter("Mountain", selectedTerrain, setSelectedTerrain)}
                />
                <FilterButton
                  text="Forest"
                  icon="forest"
                  isActive={selectedTerrain.includes("Forest")}
                  onClick={() => toggleFilter("Forest", selectedTerrain, setSelectedTerrain)}
                />
                <FilterButton
                  text="Coastal"
                  icon="waves"
                  isActive={selectedTerrain.includes("Coastal")}
                  onClick={() => toggleFilter("Coastal", selectedTerrain, setSelectedTerrain)}
                />
                <FilterButton
                  text="Desert"
                  icon="wb_sunny"
                  isActive={selectedTerrain.includes("Desert")}
                  onClick={() => toggleFilter("Desert", selectedTerrain, setSelectedTerrain)}
                />
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="text-lg text-primaryaccent">
                {r("distance")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton
                  text="1-10 km"
                  isActive={selectedDistance.includes("1-10K")}
                  onClick={() => toggleFilter("1-10K", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="5 km"
                  isActive={selectedDistance.includes("5K")}
                  onClick={() => toggleFilter("5K", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="10 km"
                  isActive={selectedDistance.includes("10K")}
                  onClick={() => toggleFilter("10K", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="10-20 km"
                  isActive={selectedDistance.includes("10-20K")}
                  onClick={() => toggleFilter("10-20K", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="20km +"
                  isActive={selectedDistance.includes("20K+")}
                  onClick={() => toggleFilter("20K+", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="Half Marathon"
                  isActive={selectedDistance.includes("Half Marathon")}
                  onClick={() => toggleFilter("Half Marathon", selectedDistance, setSelectedDistance)}
                />
                <FilterButton
                  text="Marathon"
                  isActive={selectedDistance.includes("Marathon")}
                  onClick={() => toggleFilter("Marathon", selectedDistance, setSelectedDistance)}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg text-primaryaccent">
                {r("difficulty")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton
                  text="Easy"
                  isActive={selectedDifficulty.includes("Easy")}
                  onClick={() => toggleFilter("Easy", selectedDifficulty, setSelectedDifficulty)}
                />
                <FilterButton
                  text="Medium"
                  isActive={selectedDifficulty.includes("Medium")}
                  onClick={() => toggleFilter("Medium", selectedDifficulty, setSelectedDifficulty)}
                />
                <FilterButton
                  text="Hard"
                  isActive={selectedDifficulty.includes("Hard")}
                  onClick={() => toggleFilter("Hard", selectedDifficulty, setSelectedDifficulty)}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <ShowRaces
          terrainFilter={selectedTerrain}
          distanceFilter={selectedDistance}
          difficultyFilter={selectedDifficulty}
        />
      </section>
    </main>
  );
}