"use client";

export interface SecondaryButtonProps {
	text: string;
	icon?: string;
	size: "small" | "medium" | "large";
	onClick?: () => void;
}

const SecondaryButton = ({ text, icon, size = "medium", onClick }: SecondaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-4 text-sm",
		medium: "py-2 px-23 text-base",
		large: "py-1 px-23 sm:px-40 md:px-50 text-base"
	}[size];

	return (
		<button
			onClick={onClick}
			className={`${sizeClasses} font-sans flex items-center cursor-pointer bg-primary border border-secondaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition`}
		>
			<span className="material-symbols-outlined mr-2">
				{icon}
			</span>
			{text}
		</button>
	);
}

export default SecondaryButton;
