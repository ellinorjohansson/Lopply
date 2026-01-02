import RaceCardSkeleton from "@/common/modules/skeleton/RaceCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 bg-primary min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <RaceCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
