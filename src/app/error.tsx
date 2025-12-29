"use client";

import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const g = useTranslation("general");
  const e = useTranslation("error");
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-xl w-full text-center p-8">
        <h2 className="text-3xl text-primaryaccent mb-2">
          {e("uhoh_something_tripped")}
        </h2>
        <p className="text-secondaryaccent mb-4">
          {e("an_unexpected_error_occurred")}{" "}
          {error?.message ? `(${error.message})` : ""}
        </p>

        <div className="flex justify-center gap-4">
          <button onClick={() => reset()}>{g("try_again")}</button>

          <Link href="/">
            <button>{g("back_to_home")}</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
