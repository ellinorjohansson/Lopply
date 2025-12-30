"use client";

export interface InputFieldProps {
	label: string;
	size: "small" | "medium";
	error?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: () => void;
	id?: string;
	helpButton?: React.ReactNode;
}

const InputField = ({ label, size = "medium", error, value, onChange, onClick, id, helpButton }: InputFieldProps) => {
	const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

	const sizeClasses = {
		small: "py-1 px-4 text-sm sm:text-base w-full max-w-[240px]",
		medium: "py-1 px-4 text-sm sm:text-base w-full max-w-[630px]",
	}[size];

	return (
		<div className="flex flex-col">
			<div className="flex items-center mb-1">
				<label htmlFor={inputId} className="font-sans font-medium text-secondaryaccent">
					{label}
				</label>
				{error && <span className="text-errortext text-sm ml-3">{error}</span>}
				{helpButton && (
					<div className="ml-auto">
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
				className={`border rounded-3xl focus:outline-none text-secondaryaccent bg-primary ${sizeClasses} ${error ? "border-error" : "border-secondaryaccent"} focus:border-primaryaccent`}
				aria-label={label}
			/>
		</div>
	);
};

export default InputField;
