"use client";

import { useTranslation } from "@/common/hooks/useTranslation";

interface AuthSwitchProps {
  mode: "login" | "signup";
  onChange: (_value: "login" | "signup") => void;
}

const AuthSwitch = ({ mode, onChange }: AuthSwitchProps) => {
  const s = useTranslation("switch");
  return (
    <div className="flex w-full rounded-full border border-secondaryaccent overflow-hidden bg-primary text-secondaryaccent">
      <button
        className={`flex-1 py-1 text-center transition cursor-pointer ${mode === "login" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("login")}
      >
        {s("login")}
      </button>

      <button
        className={`flex-1 py-1 text-center transition cursor-pointer ${mode === "signup" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("signup")}
      >
        {s("signup")}
      </button>
    </div>
  );
};

export default AuthSwitch;
