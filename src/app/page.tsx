import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";
import FeaturedRaces from "@/common/components/featuredRaces/FeaturedRaces";
import AccentButton from "@/common/components/buttons/AccentButton";

export default function Home() {
  const homeT = useTranslation("home_page");
  const buttonsT = useTranslation("buttons");

  return (
    <main className="w-full">
      <section className="relative overflow-hidden py-28 px-6 md:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="text-[28vw] font-bold text-primaryaccent/5 tracking-tighter whitespace-nowrap">
            RUN
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <header className="mb-8">
                <p className="uppercase tracking-[0.3em] text-sm text-secondaryaccent mb-6">
                  Curated running experiences
                </p>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                  <span className="block">Find your next</span>
                  <span className="block text-primaryaccent">
                    unforgettable race
                  </span>
                </h2>
              </header>

              <p className="text-lg md:text-xl text-secondaryaccent max-w-xl mb-10">
                Explore races by terrain, challenge and location. Find the perfect event that matches your goals and training timeline.
              </p>

              <div className="flex flex-wrap gap-4">
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

            <div className="lg:col-span-5 hidden lg:block">
              <article className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-3/4">
                  <Image
                    src="/images/hero-runner.jpg"
                    alt="Trail runner in the mountains"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-secondaryaccent">
                  <p className="text-sm opacity-80">
                    Where mountains test your limits
                  </p>
                  <p className="text-sm">
                    Chase the horizon. Conquer the impossible.
                  </p>
                  <p className="text-sm opacity-80">
                    Every climb tells a story. Every finish line changes you.
                  </p>

                </div>
              </article>
            </div>
          </div>

          <div className="mt-24 border-t border-neutral-200 pt-10 flex flex-wrap gap-12">
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12">
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

      <section className="bg-secondary py-24 mt-44" id="how-lopply-works">
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
