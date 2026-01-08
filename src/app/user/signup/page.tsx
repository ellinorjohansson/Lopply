"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import HelperButton from "@/common/components/helperButton/HelperButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserSignUp = () => {
	const a = useTranslation("authentication");
	const v = useTranslation("validation")
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { name?: string; email?: string; password?: string } = {};

		if (!email) newErrors.email = v("empty_field");
		if (!password) newErrors.password = v("empty_field");

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			setLoading(true);
			try {
				const res = await fetch("/api/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name, email, password }),
				});
				if (res.ok) {
					await signIn("credentials", { email, password, redirect: false });
					router.push("/");
				} else {
					const data = await res.json();
					setErrors({ email: data.error || a("user.signup_failed") });
				}
			} catch {
				setErrors({ email: "Network error" });
			}
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<InputField
					label={a("name")}
					size="medium"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					error={errors.name}
					helpButton={
						<HelperButton infoText={a("user.optional_name")} />
					}
				/>
				<InputField
					label={a("required_email")}
					size="medium"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>
				<InputField
					label={a("required_password")}
					size="medium"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={errors.password}
				/>
				<PrimaryButton text={loading ? "Signing up..." : a("user.signup")} size="large" />
			</form>
			<span className="text-sm text-secondaryaccent">{v("required_field")}</span>
		</>
	);
};

export default UserSignUp;
