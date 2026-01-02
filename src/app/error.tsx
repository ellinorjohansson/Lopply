"use client";

import PrimaryButton from "@/common/components/buttons/PrimaryButton";
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-primary gap-8 p-8">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl text-primaryaccent mb-2">
          {e("uhoh_something_tripped")}
        </h2>
        <p className="text-secondaryaccent mb-4">
          {e("an_unexpected_error_occurred")}{" "}
          {error?.message ? `(${error.message})` : ""}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <PrimaryButton
          text={g("try_again")}
          icon="undo"
          size="medium"
          onClick={reset}
        />
        <Link href="/" className="inline-flex">
          <PrimaryButton
            text={g("back_to_home")}
            icon="undo"
            size="medium"
          />
        </Link>
      </div>
    </main>

  );
}
