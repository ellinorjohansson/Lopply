"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState, useEffect } from "react";
import { signIn, getSession, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";

const AdminLogIn = () => {
	const authT = useTranslation("authentication");
	const validationT = useTranslation("validation")
	const router = useRouter();
	const { data: session, status } = useSession();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	useEffect(() => {
		if (status === "authenticated" && session?.user?.admin) {
			router.push("/admin/panel");
		}
	}, [status, session, router]);

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

			if (result?.error) {
				setErrors({ email: authT("admin.invalid_credentials") });
				setLoading(false);
			} else {
				const session = await getSession();

				if (session?.user?.admin) {
					setShowSuccess(true);

					setTimeout(() => {
						router.push("/admin/panel");
					}, 1000);
				} else {
					setErrors({ email: authT("admin.access_denied") });
					setLoading(false);
				}
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
			<section className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-secondary border border-secondaryaccent rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-150 sm:max-w-180 flex flex-col gap-6">
					<div className="flex flex-col gap-1 mb-4">
						<h3 className="text-2xl md:text-3xl mt-10 font-medium text-accent">
							{authT("admin.already_signed_in")}
						</h3>
						<span className="text-secondaryaccent">
							{authT("admin.logged_in_message")}
						</span>
					</div>
					<PrimaryButton text={authT("admin.logout")} size="large" onClick={handleLogout} />
				</div>
			</section>
		);
	}

	return (
		<>
			<section className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-secondary border border-secondaryaccent rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-150 sm:max-w-180 flex flex-col gap-6">
					<div className="flex flex-col gap-1 mb-2">
						<h3 className="text-2xl font-medium">
							{authT("admin.admin_login")}
						</h3>
						<span className="text-secondaryaccent text-base">
							{authT("admin.admin_subtext")}
						</span>
					</div>
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
						<PrimaryButton text={loading ? authT("logging_in") : authT("admin.access_admin_panel")} size="large" />
					</form>
				</div>
			</section>
			{showSuccess && (
				<SuccedToaster
					headerMessage={authT("admin.login_success")}
					text={authT("admin.welcome")}
					onClose={() => setShowSuccess(false)}
				/>
			)}
		</>
	);
};

export default AdminLogIn;
