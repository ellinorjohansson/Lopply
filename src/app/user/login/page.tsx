"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserLogIn = () => {
	const authT = useTranslation("authentication");
	const validationT = useTranslation("validation")
	const router = useRouter();
	const { status } = useSession();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccessToaster, setShowSuccessToaster] = useState(false);

	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { email?: string; password?: string } = {};

		if (!email) newErrors.email = validationT("empty_field");
		if (!password) newErrors.password = validationT("empty_field");

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
				setErrors({ email: authT("admin.invalid_credentials") });
			} else {
				setShowSuccessToaster(true);
				setTimeout(() => {
					router.push("/bucketlist");
				}, 2000);
			}
		}
	};

	const handleLogout = () => {
		signOut({ redirect: false }).then(() => {
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
					headerMessage={authT("user.login_success")}
					text={authT("user.signup_success_text")}
					onClose={() => setShowSuccessToaster(false)}
				/>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<InputField
					label={authT("email")}
					size="medium"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>
				<InputField
					label={authT("password")}
					size="medium"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={errors.password}
				/>
				<PrimaryButton text={loading ? authT("user.logging_in") : authT("user.login")} size="large" />
			</form>
		</>
	);
};

export default UserLogIn;
