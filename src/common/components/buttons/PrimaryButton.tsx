"use client";

export interface PrimaryButtonProps {
	text: string;
	icon?: string;
	size: "small" | "medium" | "large";
	type?: string;
	onClick?: () => void;
}

const PrimaryButton = ({ text, icon, size = "medium", onClick }: PrimaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-23 text-base",
		medium: "py-2 px-4 text-base w-full max-w-[630px]",
		large: "py-2 px-4 text-base w-full max-w-[920px]"
	}[size];

	return (
		<button
			onClick={onClick}
			className={`${sizeClasses} min-h-11 min-w-11 font-sans flex items-center justify-center cursor-pointer bg-primaryaccent text-primary rounded-3xl hover:brightness-80 transition whitespace-nowrap`}
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
