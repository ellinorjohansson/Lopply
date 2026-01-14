"use client";

export interface SecondaryButtonProps {
	text: string;
	icon?: string;
	size: "small" | "medium" | "large";
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	isActive?: boolean;
}

const SecondaryButton = ({ text, icon, size = "medium", onClick, type, isActive = false }: SecondaryButtonProps) => {

	const sizeClasses = {
		small: "py-2 px-4 text-sm",
		medium: "py-2 px-14 text-base",
		large: "py-2 px-20 text-base"
	}[size];

	const activeClasses = isActive
		? "bg-primaryaccent text-secondaryaccent border-primaryaccent"
		: "bg-primary text-secondaryaccent border-secondaryaccent";

	return (
		<button
			onClick={onClick}
			type={type || "button"}
			className={`${sizeClasses} font-sans flex items-center ${icon ? '' : 'justify-center'} cursor-pointer border rounded-3xl hover:brightness-80 transition whitespace-nowrap ${activeClasses}`}
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

export default SecondaryButton;
