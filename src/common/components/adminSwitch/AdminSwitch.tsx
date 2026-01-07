"use client";

import { useTranslation } from "@/common/hooks/useTranslation";

interface AdminSwitchProps {
  mode: "races" | "users";
  onChange: (_value: "races" | "users") => void;
}

const AdminSwitch = ({ mode, onChange }: AdminSwitchProps) => {
  const s = useTranslation("switch");
  return (
    <div className="flex w-full max-w-sm rounded-full border border-secondaryaccent overflow-hidden bg-primary text-secondaryaccent">
      <button
        className={`flex-1 py-1 text-center transition cursor-pointer ${mode === "races" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("races")}
      >
        {s("races")}
      </button>

      <button
        className={`flex-1 py-1 text-center transition cursor-pointer ${mode === "users" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("users")}
      >
        {s("users")}
      </button>
    </div>
  );
};

export default AdminSwitch;
