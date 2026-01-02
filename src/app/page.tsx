import AccentButton from "@/common/components/buttons/AccentButton";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";

// This is temporary

export default function Home() {
  const g = useTranslation("general");
  return (
    <div className="min-h-screen font-sans bg-primary">
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-5xl text-primaryaccent mb-4">{g("lopply")}</h2>
          <p className="text-xl mb-8">Discover and track running races</p>
          <Link
            href="/races"
          >
            <PrimaryButton
              text="Explore races"
              icon="search"
              size="medium" />
          </Link>
          <div className="mt-5">
            <AccentButton
              text="How it works"
              icon="arrow_forward"
              size="medium"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
