"use client";

import { ReactNode } from "react";

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  size?: "small" | "medium";
  error?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  id?: string;
  helpButton?: ReactNode;
  options: { value: string; label: string }[];
}

const DropdownField = ({
  label,
  placeholder,
  size = "medium",
  error,
  value,
  onChange,
  id,
  helpButton,
  options,
}: DropdownProps) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, "-") || "dropdown"}`;

  const sizeClasses = {
    small: "px-4 pr-8 text-sm sm:text-base w-full",
    medium: "px-4 pr-8 text-sm sm:text-base w-full",
  }[size];

  const containerClasses = {
    small: "max-w-[280px]",
    medium: "max-w-[630px]",
  }[size];

  return (
    <div className="flex flex-col">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <label htmlFor={selectId} className="font-sans font-medium text-secondaryaccent">
              {label}
            </label>
            {error && <span className="text-errortext text-sm ml-3">{error}</span>}
          </div>

          {helpButton && <div className="shrink-0 ml-3">{helpButton}</div>}
        </div>
      )}

      <div className={`relative inline-flex ${containerClasses}`}>
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`appearance-none border rounded-3xl py-2 bg-primary text-secondaryaccent 
            ${sizeClasses}
            ${error ? "border-error" : "border-secondaryaccent"}
            focus:border-primaryaccent
          `}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondaryaccent pointer-events-none">
          keyboard_arrow_down
        </span>
      </div>
    </div>
  );
};

export default DropdownField;
