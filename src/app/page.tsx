import AccentButton from "@/common/components/buttons/AccentButton";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";
import FeaturedRaces from "@/common/components/featuredRaces/FeaturedRaces";

export default function Home() {
  const homeT = useTranslation("home_page");
  const buttonsT = useTranslation("buttons");
  const altT = useTranslation("alt_text");

  return (
    <main className="w-full">
      <section className="relative h-[110vh] w-full flex items-center">
        <Image
          src="/images/nature-background.avif"
          alt={altT("hero_alt")}
          fill
          priority
          className="object-cover mask-bottom-fade"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-6xl flex flex-col mb-60">
          <h2 className="mb-3 md:mb-6 leading-tight">
            <span className="text-secondaryaccent text-5xl md:text-7xl lg:text-7xl block">
              {homeT("discover_your_next")}
            </span>
            <span className="text-primaryaccent font-display text-4xl md:text-7xl lg:text-7xl block">
              {homeT("running_adventure")}
            </span>
          </h2>


          <p className="text-xl md:text-2xl lg:text-2xl max-w-2xl mb-15">
            {homeT("explore_races_by_terrain_text")}
          </p>

          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <Link href="/races" scroll={true}>
              <PrimaryButton
                text={buttonsT("explore_races")}
                icon="search"
                size="small"
              />
            </Link>

            <Link href="#how-lopply-works" scroll={true}>
              <AccentButton
                text={buttonsT("how_it_works")}
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
            {homeT("featured_races")}
          </h2>
          <p className="text-secondaryaccent sm:pl-9 mt-1 mb-10 text-lg">
            {homeT("handpicked_adventures_across")}
          </p>

          <FeaturedRaces />

          <div className="flex justify-center mt-16">
            <Link href="/races" scroll={true}>
              <PrimaryButton text={buttonsT("explore_races")} icon="search" size="small" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 mt-24" id="how-lopply-works">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl mb-2">
            {homeT("how_lopply_works")}
          </h2>

          <p className="text-secondaryaccent text-lg mb-12">
            {homeT("a_new_way_to_discover")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">search</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{homeT("how_lopply_works_section.explore_visually")}</h3>
              <p>{homeT("how_lopply_works_section.browse_races_by_terrain")}</p>
            </article>

            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">group_search</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{homeT("how_lopply_works_section.match_by_preferences")}</h3>
              <p>{homeT("how_lopply_works_section.find_races_based")}</p>
            </article>

            <article className="p-8 rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">list_alt_check</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{homeT("how_lopply_works_section.build_your_bucket_list")}</h3>
              <p>{homeT("how_lopply_works_section.save_your_dream")}</p>
            </article>

            <article className="p-8  rounded-2xl backdrop-blur flex flex-col items-center shadow-lg">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primaryaccent text-secondaryaccent">
                <span className="material-symbols-outlined text-secondaryaccent text-4xl!">calendar_today</span>
              </div>

              <h3 className="font-semibold text-2xl mb-3">{homeT("how_lopply_works_section.match_your_training")}</h3>
              <p>{homeT("how_lopply_works_section.find_races_that")}</p>
            </article>
          </div>
        </div>

      </section>
    </main>
  );
}
