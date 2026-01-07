"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import HelperButton from "@/common/components/helperButton/HelperButton";
import InputField from "@/common/components/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";

const AddRace = () => {
  const b = useTranslation("buttons");
  const a = useTranslation("add_race_page");
  const v = useTranslation("validation");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = v("empty_field");
    if (!password) newErrors.password = v("empty_field");

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Temporary: send form", { email, password });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4 m-20">
      <div className="bg-secondary border border-secondaryaccent rounded-3xl p-15 flex flex-col gap-6">
        <div className="flex flex-col gap-1 mb-2">
          <h3 className="text-2xl font-medium">
            {a("add_new_race")}
          </h3>
          <span className="text-secondaryaccent text-base">
            {a("submit_a_race")}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <InputField
              label={a("race_title")}
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </div>
          <div className="col-span-1">
            <InputField
              label={a("locations")}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helpButton={
                <HelperButton infoText={a("user.optional_name")} />
              }
            />
          </div>
          <div className="col-span-1">
            <InputField
              label={a("distance")}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helpButton={
                <HelperButton infoText={a("user.optional_name")} />
              }
            />
          </div>
          <div className="col-span-1">
            <InputField
              label={a("date")}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          <div className="col-span-1">
            <InputField
              label={a("difficulty")}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          <div className="col-span-1">
            <InputField
              label={a("terrain")}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>

          <div className="col-span-2">
            <InputField
              label={a("image_url")}
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helpButton={
                <HelperButton infoText={a("user.optional_name")} />
              }
            />
          </div>
          <div className="col-span-2">
            <InputField
              label={a("description")}
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              height="110px"
            />
          </div>
          <div className="col-span-2">
            <InputField
              label={a("url_race_page")}
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>

          <div className="col-span-2 flex flex-row gap-3 mt-8">
            <PrimaryButton text={b("add_race")} size="large" />
            <SecondaryButton text={b("cancel")} size="small" />
          </div>
        </form>
        <span className="text-sm text-secondaryaccent">{v("required_field")}</span>

      </div>
    </section>
  )
}

export default AddRace;