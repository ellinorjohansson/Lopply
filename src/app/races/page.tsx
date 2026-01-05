export const dynamic = "force-dynamic";
import ShowRaces from "@/common/components/showRaces/ShowRaces";

export default async function RacesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 bg-primary min-h-screen">
      <ShowRaces />
    </main>
  );
}
