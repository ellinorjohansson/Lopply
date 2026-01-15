import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";

export default function NotFound() {
  const errorT = useTranslation("error");
  const generalT = useTranslation("general");
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-xl w-full text-center p-8 rounded-2xl bg-primary/60 backdrop-blur-sm">
        <h2 className="text-3xl text-primaryaccent mb-2">
          {errorT("whoops_wrong_trail")}
        </h2>
        <p className="text-secondaryaccent mb-6">
          {errorT("this_page_missed_the_marker")}
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <PrimaryButton
              text={generalT("back_to_home")}
              icon="undo"
              size="medium" />
          </Link>
        </div>
      </div>
    </main>
  );
}
