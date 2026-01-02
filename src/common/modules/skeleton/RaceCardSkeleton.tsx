"use client";

const RaceCardSkeleton = () => {
  return (
    <article
      className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent max-w-sm shadow-lg animate-pulse"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative h-48 md:h-60 w-full bg-white/20 rounded-3xl">
        {/* Favorite icon placeholder */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/40 rounded-xl" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col gap-4">

        {/* Title */}
        <div className="h-6 md:h-7 w-3/4 bg-white/20 rounded-lg" />

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-md" />
          <div className="h-4 w-1/2 bg-white/20 rounded-md" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-md" />
          <div className="h-4 w-1/3 bg-white/20 rounded-md" />
        </div>

        {/* Distance */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-md" />
          <div className="h-4 w-1/4 bg-white/20 rounded-md" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-white/20 rounded-md" />
          <div className="h-4 w-5/6 bg-white/20 rounded-md" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="px-5 py-2 h-8 rounded-full bg-white/20 w-24" />
          <div className="px-5 py-2 h-8 rounded-full bg-white/20 w-20" />
        </div>
      </div>
    </article>
  );
};

export default RaceCardSkeleton;
