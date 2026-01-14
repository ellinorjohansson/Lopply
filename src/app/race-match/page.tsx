import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import Checkbox from "@/common/components/input/checkbox/Checkbox";
import { useTranslation } from "@/common/hooks/useTranslation";

const RaceMatch = () => {
  const r = useTranslation("race_match");
  const b = useTranslation("buttons");

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="bg-primaryaccent/20 text-primaryaccent mx-auto w-70 rounded-3xl px-6 py-2 flex justify-center mt-18 md:mt-25">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined">
            star_shine
          </span>{r("math_powered")}</span>
        </div>
        <div className="mt-10 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {r("find_your_favorite")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {r("find_your_subtext")}
          </p>
        </div>
      </section>
      <form className="mx-auto max-w-5xl px-15 py-12 mb-20 border border-secondaryaccent rounded-3xl bg-secondary">
        <h3 className="font-semibold mb-2 text-2xl">{r("your_race_preferences")}</h3>
        <p className="mb-8 text-base">{r("select_all_that")}</p>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_terrain")}</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Checkbox icon="apartment" label={r("terrain.urban")} />
            <Checkbox icon="water" label={r("terrain.coastal")} />
            <Checkbox icon="landscape" label={r("terrain.mountain")} />
            <Checkbox icon="wb_sunny" label={r("terrain.desert")} />
            <Checkbox icon="forest" label={r("terrain.forest")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_distance")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text={r("distance.5k")} />
            <SecondaryButton size="small" text={r("distance.10k")} />
            <SecondaryButton size="small" text={r("distance.half_marathon")} />
            <SecondaryButton size="small" text={r("distance.marathon")} />
            <SecondaryButton size="small" text={r("distance.ultra")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_location")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text={r("location.europe")} />
            <SecondaryButton size="small" text={r("location.africa")} />
            <SecondaryButton size="small" text={r("location.usa")} />
            <SecondaryButton size="small" text={r("location.asia")} />
            <SecondaryButton size="small" text={r("location.south_america")} />
            <SecondaryButton size="small" text={r("location.oceania")} />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_months")}</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <SecondaryButton size="small" text={r("months.jan")} />
            <SecondaryButton size="small" text={r("months.feb")} />
            <SecondaryButton size="small" text={r("months.mar")} />
            <SecondaryButton size="small" text={r("months.apr")} />
            <SecondaryButton size="small" text={r("months.may")} />
            <SecondaryButton size="small" text={r("months.jun")} />
            <SecondaryButton size="small" text={r("months.jul")} />
            <SecondaryButton size="small" text={r("months.aug")} />
            <SecondaryButton size="small" text={r("months.sep")} />
            <SecondaryButton size="small" text={r("months.oct")} />
            <SecondaryButton size="small" text={r("months.nov")} />
            <SecondaryButton size="small" text={r("months.dec")} />
          </div>
        </fieldset>

        <div className="flex justify-center mt-15">
          <PrimaryButton size="large" text={b("find_my_perfect_races")} icon="star_shine" />
        </div>
      </form>
    </main>
  )
}

export default RaceMatch;