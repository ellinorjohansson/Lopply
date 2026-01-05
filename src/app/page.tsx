import AccentButton from "@/common/components/buttons/AccentButton";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const h = useTranslation("home_page");

  return (
    <main className="w-full">
      <section className="relative w-full h-screen">
        <Image
          src="/images/nature-background.avif"
          alt=""
          fill
          className="object-cover mask-bottom-fade"
          sizes="100vw"
        />

        <div className="relative z-10 flex flex-col justify-center h-full px-90">
          <span className="text-secondaryaccent text-8xl">
            {h("discover_your_next")}
          </span>
          <h2 className="text-8xl text-primaryaccent mb-4">
            {h("running_adventure")}
          </h2>
          <p className="text-3xl mb-20 w-180">
            {h("explore_races_by_terrain_text")}
          </p>

          <div className="flex gap-5">
            <Link href="/races">
              <PrimaryButton text="Explore races" icon="search" size="medium" />
            </Link>

            <Link href="/">
              <AccentButton
                text="How it works"
                icon="arrow_forward"
                size="medium"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 px-4">
        <h2 className="text-4xl">{h("featured_races")}</h2>
        <span className="text-secondaryaccent">{h("handpicked_adventures_across")}</span>
      </section>

    </main>
  );
}


