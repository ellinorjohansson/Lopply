"use client";

export interface InputFieldProps {
	label: string;
	size?: "small" | "medium";
	error?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: () => void;
	id?: string;
	helpButton?: React.ReactNode;
	height?: string;
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
	height,
}: InputFieldProps) => {
	const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

	const sizeClasses = {
		small: "px-4 text-sm sm:text-base w-full max-w-[280px]",
		medium: "px-4 text-sm sm:text-base w-full max-w-[630px]",
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
				type="text"
				value={value}
				onChange={onChange}
				onClick={onClick}
				style={{ height }}
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
