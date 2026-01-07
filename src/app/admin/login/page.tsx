"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";

const AdminLogIn = () => {
	const a = useTranslation("authentication");
	const v = useTranslation("validation")

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
		<section className="flex items-center justify-center w-full min-h-screen p-4">
			<div className="bg-secondary border border-secondaryaccent rounded-3xl p-15 flex flex-col gap-6">
				<div className="flex flex-col gap-1 mb-2">
					<h3 className="text-2xl font-medium">
						{a("admin.admin_login")}
					</h3>
					<span className="text-secondaryaccent text-base">
						{a("admin.admin_subtext")}
					</span>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<InputField
						label={a("email")}
						size="medium"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={errors.email}
					/>
					<InputField
						label={a("password")}
						size="medium"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={errors.password}
					/>
					<PrimaryButton text={a("admin.access_admin_panel")} size="large" />
				</form>
			</div>
		</section>
	);
};

export default AdminLogIn;
