"use client";

interface AuthSwitchProps {
  mode: "login" | "signup";
  onChange: (_value: "login" | "signup") => void;
}

const AuthSwitch = ({ mode, onChange }: AuthSwitchProps) => {
  return (
    <div className="flex w-full rounded-full border border-secondaryaccent overflow-hidden bg-primary text-secondaryaccent">
      <button
        className={`flex-1 py-1 text-center transition ${mode === "login" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("login")}
      >
        Login
      </button>

      <button
        className={`flex-1 py-1 text-center transition ${mode === "signup" ? "border m-1 rounded-3xl text-secondaryaccent bg-secondary" : ""
          }`}
        onClick={() => onChange("signup")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthSwitch;
