"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";

const UserLogIn = () => {
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
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<InputField
					label={a("email")}
					size="medium"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>
				<InputField
					label={a("password")}
					size="medium"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={errors.password}
				/>
				<PrimaryButton text={a("user.login")} size="large" />
			</form>
		</>
	);
};

export default UserLogIn;
