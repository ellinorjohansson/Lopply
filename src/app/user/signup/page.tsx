"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import HelperButton from "@/common/components/helperButton/HelperButton";
import InputField from "@/common/components/input/inputField/InputField";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserSignUp = () => {
	const authT = useTranslation("authentication");
	const validationT = useTranslation("validation")
	const router = useRouter();
	const { status } = useSession();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccessToaster, setShowSuccessToaster] = useState(false);

	const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { name?: string; email?: string; password?: string } = {};

		if (!email) newErrors.email = validationT("empty_field");
		if (!password) newErrors.password = validationT("empty_field");

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
					setShowSuccessToaster(true);
					setTimeout(() => {
						router.push("/");
					}, 2000);
				} else {
					const data = await res.json();
					setErrors({ email: data.error || authT("user.signup_failed") });
				}
			} catch {
				setErrors({ email: authT("user.network_error") });
			}
			setLoading(false);
		}
	};

	const handleLogout = () => {
		signOut({ redirect: false }).then(() => {
			setName("");
			setEmail("");
			setPassword("");
			setErrors({});
		});
	};

	if (status === "loading") {
		return null;
	}

	if (status === "authenticated") {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h4 className="text-2xl md:text-3xl mt-10 font-medium text-accent">
						{authT("user.already_signed_in")}
					</h4>
					<span className="text-secondaryaccent">
						{authT("user.logged_in_message")}
					</span>
				</div>
				<PrimaryButton text={authT("user.logout")} size="large" onClick={handleLogout} />
			</div>
		);
	}

	return (
		<>
			{showSuccessToaster && (
				<SuccedToaster
					headerMessage={authT("user.signup_success")}
					text={authT("user.signup_success_text")}
					onClose={() => setShowSuccessToaster(false)}
				/>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<InputField
					label={authT("name")}
					size="medium"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					error={errors.name}
					helpButton={
						<HelperButton infoText={authT("user.optional_name")} />
					}
				/>
				<InputField
					label={authT("required_email")}
					size="medium"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>
				<InputField
					label={authT("required_password")}
					size="medium"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={errors.password}
				/>
				<PrimaryButton text={loading ? authT("user.signing_up") : authT("user.signup")} size="large" />
			</form>
			<span className="text-sm text-secondaryaccent">{validationT("required_field")}</span>
		</>
	);
};

export default UserSignUp;
