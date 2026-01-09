"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserLogIn = () => {
	const a = useTranslation("authentication");
	const v = useTranslation("validation")
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccessToaster, setShowSuccessToaster] = useState(false);

	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { email?: string; password?: string } = {};

		if (!email) newErrors.email = v("empty_field");
		if (!password) newErrors.password = v("empty_field");

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			setLoading(true);
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			setLoading(false);

			if (result?.error) {
				setErrors({ email: a("admin.invalid_credentials") });
			} else {
				setShowSuccessToaster(true);
				setTimeout(() => {
					router.push("/bucketlist");
				}, 2000);
			}
		}
	};

	return (
		<>
			{showSuccessToaster && (
				<SuccedToaster
					headerMessage={a("user.login_success")}
					text={a("user.signup_success_text")}
					onClose={() => setShowSuccessToaster(false)}
				/>
			)}
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
				<PrimaryButton text={loading ? "Logging in..." : a("user.login")} size="large" />
			</form>
		</>
	);
};

export default UserLogIn;
