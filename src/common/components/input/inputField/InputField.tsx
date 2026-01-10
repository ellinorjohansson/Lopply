"use client";

export interface InputFieldProps {
	label: string;
	size?: "small" | "medium" | "large";
	error?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: () => void;
	id?: string;
	helpButton?: React.ReactNode;
	type: string;
}

const InputField = ({
	label,
	size = "medium",
	error,
	value,
	onChange,
	onClick,
	id,
	helpButton,
	type
}: InputFieldProps) => {
	const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

	const sizeClasses = {
		small: "px-4 text-sm sm:text-base w-full md:max-w-[280px]",
		medium: "px-4 text-sm sm:text-base w-full md:max-w-[630px]",
		large: "px-4 text-sm sm:text-base w-full md:max-w-[920px]",
	}[size];

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between mb-1">
				<div className="flex items-center">
					<label htmlFor={inputId} className="font-sans font-medium text-secondaryaccent">
						{label}
					</label>
					{error && <span className="text-errortext text-sm ml-3">{error}</span>}
				</div>

				{helpButton && (
					<div className="shrink-0 ml-3">
						{helpButton}
					</div>
				)}
			</div>

			<input
				id={inputId}
				type={type}
				value={value}
				onChange={onChange}
				onClick={onClick}
				className={`border rounded-3xl py-1 focus:outline-none text-secondaryaccent bg-primary 
					${sizeClasses} 
					${error ? "border-error" : "border-secondaryaccent"} 
					focus:border-primaryaccent
				`}
				aria-label={label}
			/>
		</div>
	);
};

export default InputField;
