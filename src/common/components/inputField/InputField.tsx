"use client";

export interface InputFieldProps {
	label: string;
	size: "small" | "medium";
	onClick?: () => void;
	id?: string;
}

const InputField = ({ label, size = "medium", onClick, id }: InputFieldProps) => {
	const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

	const sizeClasses = {
		small: "py-1 px-4 text-sm sm:text-base w-full max-w-[240px]",
		medium: "py-1 px-4 text-sm sm:text-base w-full max-w-[560px]",
	}[size];


	return (
		<div className="flex flex-col">
			<label htmlFor={inputId} className="mb-1 font-sans text-secondaryaccent">
				{label}
			</label>
			<input
				id={inputId}
				type="text"
				className={`border border-secondaryaccent rounded-3xl focus:outline-none focus:border-primaryaccent text-secondaryaccent bg-primary ${sizeClasses}`}
				onClick={onClick}
				aria-label={label}
			/>
		</div>
	);
};

export default InputField;
