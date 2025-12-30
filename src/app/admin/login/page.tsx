"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import InputField from "@/common/components/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";

const AdminLogIn = () => {
	const a = useTranslation("authentication");
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
					<InputField label={a("email")} size="medium" />
					<InputField label={a("password")} size="medium" />
					<PrimaryButton text={a("admin.access_admin_panel")} size="large" />
				</form>
			</div>
		</section>
	);
};

export default AdminLogIn;
