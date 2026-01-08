"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLogIn = () => {
	const a = useTranslation("authentication");
	const v = useTranslation("validation")
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

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

			if (result?.error) {
				setErrors({ email: a("admin.invalid_credentials") });
				setLoading(false);
			} else {
				const session = await getSession();
				if (session?.user?.admin) {
					router.push("/admin/panel");
				} else {
					setErrors({ email: a("admin.access_denied") });
					setLoading(false);
				}
			}
		}
	};

	return (
		<section className="flex items-center justify-center min-h-screen p-4">
			<div className="bg-secondary border border-secondaryaccent rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-150 sm:max-w-180 flex flex-col gap-6">
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
					<PrimaryButton text={loading ? a("logging_in") : a("admin.access_admin_panel")} size="large" />
				</form>
			</div>
		</section>
	);
};

export default AdminLogIn;
