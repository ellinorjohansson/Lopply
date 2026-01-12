export const dynamic = "force-dynamic";

import ShowRaces from "@/common/components/showRaces/ShowRaces";
import FilterButton from "@/common/components/buttons/FilterButton";
import { useTranslation } from "@/common/hooks/useTranslation";

export default function RacesPage() {
  const r = useTranslation("races");

  return (
    <main>
      <section
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <div className="mb-8 mt-2 md:mt-25 md:mb-25">
          <h2
            className="text-3xl sm:pl-9 md:text-7xl"
          >
            {r("explore_your_next_race")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {r("explore_subtext")}
          </p>
        </div>
      </section>

      <section
        className="w-full bg-secondary py-8"
      >
        <div className="mx-auto max-w-6xl px-4">
          <form>
            <fieldset className="mb-8">
              <legend className="text-lg text-primaryaccent">
                {r("terrain_type")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton text="Urban" icon="location_city" />
                <FilterButton text="Mountain" icon="terrain" />
                <FilterButton text="Forest" icon="forest" />
                <FilterButton text="Coastal" icon="waves" />
                <FilterButton text="Desert" icon="wb_sunny" />
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="text-lg text-primaryaccent">
                {r("distance")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton text="5K" />
                <FilterButton text="10K" />
                <FilterButton text="Half Marathon" />
                <FilterButton text="Marathon" />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg text-primaryaccent">
                {r("difficulty")}
              </legend>

              <div className="flex flex-wrap gap-3 mt-2">
                <FilterButton text="Easy" />
                <FilterButton text="Medium" />
                <FilterButton text="Hard" />
              </div>
            </fieldset>
          </form>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-6xl px-4 py-12"
      >
        <div>
          <ShowRaces />
        </div>
      </section>
    </main>
  );
}
