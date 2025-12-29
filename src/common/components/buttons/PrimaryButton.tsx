"use client";

export interface PrimaryButtonProps {
	text: string;
	icon: string;
	size: "small" | "medium" | "large";
}

const PrimaryButton = ({ text, icon, size = "medium" }: PrimaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-4 text-sm",
		medium: "py-2 px-23 text-base",
		large: "py-2 px-60 text-base"
	}[size];

	return (
		<button
			className={`${sizeClasses} font-sans flex items-center cursor-pointer bg-primaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition`}
		>
			<span className="material-symbols-outlined mr-2">
				{icon}
			</span>
			{text}
		</button>
	);
}

export default PrimaryButton;
