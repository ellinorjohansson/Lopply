"use client";

export interface SecondaryButtonProps {
	text: string;
	icon?: string;
	size: "small" | "medium" | "large";
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const SecondaryButton = ({ text, icon, size = "medium", onClick, type }: SecondaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-4 text-sm",
		medium: "py-2 px-14 text-base",
		large: "py-2 px-20 text-base"
	}[size];

	return (
		<button
			onClick={onClick}
			type={type || "button"}
			className={`${sizeClasses} font-sans flex items-center cursor-pointer bg-primary border border-secondaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition whitespace-nowrap`}
		>
			<span className="material-symbols-outlined mr-2">
				{icon}
			</span>
			{text}
		</button>
	);
}

export default SecondaryButton;
