"use client";
import AuthSwitch from "@/common/components/authSwitch/AuthSwitch";
import { useState } from "react";
import UserLogIn from "./login/page";
import UserSignUp from "./signup/page";
import { useTranslation } from "@/common/hooks/useTranslation";


const UserAuth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const a = useTranslation("authentication");

  return (
    <section className="flex items-center justify-center w-full min-h-screen p-4">
      <div className="bg-secondary border border-secondaryaccent rounded-3xl p-15 flex flex-col gap-6">
        <span className="text-secondaryaccent text-base flex justify-center mb-3">
          {a("user.user_text_discover")}
        </span>

        <AuthSwitch mode={mode} onChange={setMode} />

        {mode === "login" ? <UserLogIn /> : <UserSignUp />}
      </div>
    </section>
  );
};

export default UserAuth;
