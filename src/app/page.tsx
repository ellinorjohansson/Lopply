import AccentButton from "@/common/components/buttons/AccentButton";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";
import ShowRaces from "@/common/components/showRaces/ShowRaces";

export default function Home() {
  const h = useTranslation("home_page");
  const b = useTranslation("buttons");
  const a = useTranslation("alt_text");

  return (
    <main className="w-full">
      <section className="relative h-[110vh] w-full flex items-center">
        <Image
          src="/images/nature-background.avif"
          alt={a("hero_alt")}
          fill
          priority
          className="object-cover mask-bottom-fade"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-6xl flex flex-col mb-60">
          <span className="text-secondaryaccent text-5xl md:text-7xl lg:text-7xl">
            {h("discover_your_next")}
          </span>
          <h2 className="text-primaryaccent text-4xl md:text-7xl lg:text-7xl mb-6">
            {h("running_adventure")}
          </h2>

          <p className="text-xl md:text-2xl lg:text-2xl max-w-2xl mb-10">
            {h("explore_races_by_terrain_text")}
          </p>

          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <Link href="/races">
              <PrimaryButton
                text={b("explore_races")}
                icon="search"
                size="medium"
              />
            </Link>

            <Link href="#how-lopply-works" scroll={true}>
              <AccentButton
                text={b("how_it_works")}
                icon="arrow_forward"
                size="medium"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:pl-9 md:text-4xl">
            {h("featured_races")}
          </h2>
          <p className="text-secondaryaccent sm:pl-9 mt-1 mb-10 text-lg">
            {h("handpicked_adventures_across")}
          </p>

          <ShowRaces limit={3} />

          <div className="flex justify-center mt-16">
            <Link href="/races">
              <PrimaryButton text={b("explore_races")} icon="search" size="medium" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 mt-24" id="how-lopply-works">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl mb-2">
            {h("how_lopply_works")}
          </h2>

          <p className="text-secondaryaccent text-lg mb-12">
            {h("a_new_way_to_discover")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">search</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{h("how_lopply_works_section.explore_visually")}</h3>
              <p>{h("how_lopply_works_section.browse_races_by_terrain")}</p>
            </article>

            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">group_search</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{h("how_lopply_works_section.match_by_preferences")}</h3>
              <p>{h("how_lopply_works_section.find_races_based")}</p>
            </article>

            <article className="p-8 rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">list_alt_check</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{h("how_lopply_works_section.build_your_bucket_list")}</h3>
              <p>{h("how_lopply_works_section.save_your_dream")}</p>
            </article>

            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">calendar_today</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{h("how_lopply_works_section.match_your_training")}</h3>
              <p>{h("how_lopply_works_section.find_races_that")}</p>
            </article>
          </div>
        </div>

      </section>
    </main>
  );
}
