"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import Checkbox from "@/common/components/input/checkbox/Checkbox";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const RaceMatch = () => {
  const r = useTranslation("race_match");
  const b = useTranslation("buttons");
  const router = useRouter();

  const [selectedTerrains, setSelectedTerrains] = useState<string[]>(() => {
    const saved = localStorage.getItem("raceMatchPreferences");
    return saved ? JSON.parse(saved).terrains || [] : [];
  });
  const [selectedDistances, setSelectedDistances] = useState<string[]>(() => {
    const saved = localStorage.getItem("raceMatchPreferences");
    return saved ? JSON.parse(saved).distances || [] : [];
  });
  const [selectedLocations, setSelectedLocations] = useState<string[]>(() => {
    const saved = localStorage.getItem("raceMatchPreferences");
    return saved ? JSON.parse(saved).locations || [] : [];
  });
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(() => {
    const saved = localStorage.getItem("raceMatchPreferences");
    return saved ? JSON.parse(saved).difficulties || [] : [];
  });
  const [selectedMonths, setSelectedMonths] = useState<string[]>(() => {
    const saved = localStorage.getItem("raceMatchPreferences");
    return saved ? JSON.parse(saved).months || [] : [];
  });

  useEffect(() => {
    return () => { };
  }, []);

  const toggleSelection = (value: string, array: string[], setter: (_val: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const allMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  const toggleAllMonths = () => {
    if (selectedMonths.length === allMonths.length) {
      setSelectedMonths([]);
    } else {
      setSelectedMonths(allMonths);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const preferences = {
      terrains: selectedTerrains,
      distances: selectedDistances,
      locations: selectedLocations,
      difficulties: selectedDifficulties,
      months: selectedMonths,
    };
    localStorage.setItem("raceMatchPreferences", JSON.stringify(preferences));

    router.push("/race-match/results");
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="bg-primaryaccent/20 text-primaryaccent mx-auto w-70 rounded-3xl px-6 py-2 flex justify-center mt-5 md:mt-12">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined">
            star_shine
          </span>{r("math_powered")}</span>
        </div>
        <div className="mt-10 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {r("find_your_favorite")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl w-full md:w-190">
            {r("find_your_subtext")}
          </p>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl px-15 py-12 mb-20 border border-secondaryaccent rounded-3xl bg-secondary">
        <h3 className="font-semibold mb-2 text-2xl">{r("your_race_preferences")}</h3>
        <p className="mb-8 text-base">{r("select_all_that")}</p>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_terrain")}</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Checkbox icon="apartment" label={r("terrain.urban")} checked={selectedTerrains.includes("urban")} onChange={() => toggleSelection("urban", selectedTerrains, setSelectedTerrains)} />
            <Checkbox icon="water" label={r("terrain.coastal")} checked={selectedTerrains.includes("coastal")} onChange={() => toggleSelection("coastal", selectedTerrains, setSelectedTerrains)} />
            <Checkbox icon="landscape" label={r("terrain.mountain")} checked={selectedTerrains.includes("mountain")} onChange={() => toggleSelection("mountain", selectedTerrains, setSelectedTerrains)} />
            <Checkbox icon="wb_sunny" label={r("terrain.desert")} checked={selectedTerrains.includes("desert")} onChange={() => toggleSelection("desert", selectedTerrains, setSelectedTerrains)} />
            <Checkbox icon="forest" label={r("terrain.forest")} checked={selectedTerrains.includes("forest")} onChange={() => toggleSelection("forest", selectedTerrains, setSelectedTerrains)} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_distance")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text={r("distance.5k")} onClick={() => toggleSelection("5k", selectedDistances, setSelectedDistances)} isActive={selectedDistances.includes("5k")} />
            <SecondaryButton size="small" text={r("distance.10k")} onClick={() => toggleSelection("10k", selectedDistances, setSelectedDistances)} isActive={selectedDistances.includes("10k")} />
            <SecondaryButton size="small" text={r("distance.half_marathon")} onClick={() => toggleSelection("half", selectedDistances, setSelectedDistances)} isActive={selectedDistances.includes("half")} />
            <SecondaryButton size="small" text={r("distance.marathon")} onClick={() => toggleSelection("marathon", selectedDistances, setSelectedDistances)} isActive={selectedDistances.includes("marathon")} />
            <SecondaryButton size="small" text={r("distance.ultra")} onClick={() => toggleSelection("ultra", selectedDistances, setSelectedDistances)} isActive={selectedDistances.includes("ultra")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_location")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text={r("location.europe")} onClick={() => toggleSelection("europe", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("europe")} />
            <SecondaryButton size="small" text={r("location.africa")} onClick={() => toggleSelection("africa", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("africa")} />
            <SecondaryButton size="small" text={r("location.usa")} onClick={() => toggleSelection("usa", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("usa")} />
            <SecondaryButton size="small" text={r("location.asia")} onClick={() => toggleSelection("asia", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("asia")} />
            <SecondaryButton size="small" text={r("location.south_america")} onClick={() => toggleSelection("south_america", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("south_america")} />
            <SecondaryButton size="small" text={r("location.oceania")} onClick={() => toggleSelection("oceania", selectedLocations, setSelectedLocations)} isActive={selectedLocations.includes("oceania")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_difficulty")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text={r("difficulty.easy")} onClick={() => toggleSelection("easy", selectedDifficulties, setSelectedDifficulties)} isActive={selectedDifficulties.includes("easy")} />
            <SecondaryButton size="small" text={r("difficulty.medium")} onClick={() => toggleSelection("medium", selectedDifficulties, setSelectedDifficulties)} isActive={selectedDifficulties.includes("medium")} />
            <SecondaryButton size="small" text={r("difficulty.hard")} onClick={() => toggleSelection("hard", selectedDifficulties, setSelectedDifficulties)} isActive={selectedDifficulties.includes("hard")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <legend className="text-secondaryaccent font-semibold">{r("preffered_months")}</legend>
            <button
              type="button"
              onClick={toggleAllMonths}
              className="text-sm text-primaryaccent hover:underline font-medium"
            >
              {selectedMonths.length === allMonths.length ? "Deselect all" : "Select all"}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <SecondaryButton size="small" text={r("months.jan")} onClick={() => toggleSelection("jan", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("jan")} />
            <SecondaryButton size="small" text={r("months.feb")} onClick={() => toggleSelection("feb", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("feb")} />
            <SecondaryButton size="small" text={r("months.mar")} onClick={() => toggleSelection("mar", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("mar")} />
            <SecondaryButton size="small" text={r("months.apr")} onClick={() => toggleSelection("apr", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("apr")} />
            <SecondaryButton size="small" text={r("months.may")} onClick={() => toggleSelection("may", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("may")} />
            <SecondaryButton size="small" text={r("months.jun")} onClick={() => toggleSelection("jun", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("jun")} />
            <SecondaryButton size="small" text={r("months.jul")} onClick={() => toggleSelection("jul", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("jul")} />
            <SecondaryButton size="small" text={r("months.aug")} onClick={() => toggleSelection("aug", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("aug")} />
            <SecondaryButton size="small" text={r("months.sep")} onClick={() => toggleSelection("sep", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("sep")} />
            <SecondaryButton size="small" text={r("months.oct")} onClick={() => toggleSelection("oct", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("oct")} />
            <SecondaryButton size="small" text={r("months.nov")} onClick={() => toggleSelection("nov", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("nov")} />
            <SecondaryButton size="small" text={r("months.dec")} onClick={() => toggleSelection("dec", selectedMonths, setSelectedMonths)} isActive={selectedMonths.includes("dec")} />
          </div>
        </fieldset>

        <div className="flex justify-center mt-15">
          <PrimaryButton size="large" text={b("find_my_perfect_races")} icon="star_shine" type="submit" />
        </div>
      </form>
    </main>
  );
};

export default RaceMatch;