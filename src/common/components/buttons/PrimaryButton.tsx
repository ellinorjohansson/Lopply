"use client";

export interface PrimaryButtonProps {
	text: string;
	icon?: string;
	size: "small" | "medium" | "large";
	onClick?: () => void;
}

const PrimaryButton = ({ text, icon, size = "medium", onClick }: PrimaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-4 text-sm",
		medium: "py-2 px-23 text-base",
		large: "py-1 px-23 sm:px-40 md:px-50 text-base"
	}[size];

	return (
		<button
			onClick={onClick}
			className={`${sizeClasses} font-sans flex items-center justify-center cursor-pointer bg-primaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition`}
		>
			{icon && (
				<span className="material-symbols-outlined mr-2">
					{icon}
				</span>
			)}
			{text}
		</button>
	);
}

export default PrimaryButton;
