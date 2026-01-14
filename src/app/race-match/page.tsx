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
            <Checkbox icon="apartment" label="Urban" />
            <Checkbox icon="water" label="Coastal" />
            <Checkbox icon="landscape" label="Mountain" />
            <Checkbox icon="wb_sunny" label="Desert" />
            <Checkbox icon="forest" label="Forest" />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_distance")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text="5K" />
            <SecondaryButton size="small" text="10K" />
            <SecondaryButton size="small" text="Half Marathon" />
            <SecondaryButton size="small" text="Marathon" />
            <SecondaryButton size="small" text="Ultra" />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_location")}</legend>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton size="small" text="Europe" />
            <SecondaryButton size="small" text="Africa" />
            <SecondaryButton size="small" text="USA" />
            <SecondaryButton size="small" text="Asia" />
            <SecondaryButton size="small" text="South America" />
            <SecondaryButton size="small" text="Oceania" />
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-secondaryaccent font-semibold mb-4">{r("preffered_months")}</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <SecondaryButton size="small" text="Jan" />
            <SecondaryButton size="small" text="Feb" />
            <SecondaryButton size="small" text="Mar" />
            <SecondaryButton size="small" text="Apr" />
            <SecondaryButton size="small" text="May" />
            <SecondaryButton size="small" text="Jun" />
            <SecondaryButton size="small" text="Jul" />
            <SecondaryButton size="small" text="Aug" />
            <SecondaryButton size="small" text="Sep" />
            <SecondaryButton size="small" text="Oct" />
            <SecondaryButton size="small" text="Nov" />
            <SecondaryButton size="small" text="Dec" />
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