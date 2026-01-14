import { useTranslation } from "@/common/hooks/useTranslation";

const RaceMatch = () => {
  const r = useTranslation("race_match");

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 mb-20">
        <div className="bg-primaryaccent/20 text-primaryaccent mx-auto w-70 rounded-3xl px-6 py-2 flex justify-center mt-18 md:mt-25">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined">
            star_shine
          </span>{r("math_powered")}</span>
        </div>
        <div className="mb-18 mt-10 md:mb-25 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {r("find_your_favorite")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {r("find_your_subtext")}
          </p>
        </div>
      </section>
    </main>
  )
}

export default RaceMatch;