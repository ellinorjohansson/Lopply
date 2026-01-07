"use client";
import React, { useRef } from "react";

export interface TextareaFieldProps {
  label: string;
  size?: "small" | "medium";
  error?: string;
  value?: string;
  onChange?: (_value: string) => void;
  id?: string;
  helpButton?: React.ReactNode;
  maxLength?: number;
}

const TextArea = ({
  label,
  size = "medium",
  error,
  value = "",
  onChange,
  id,
  helpButton,
  maxLength = 75,
}: TextareaFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const sizeClasses = {
    small: "px-4 text-sm sm:text-base w-full max-w-[280px]",
    medium: "px-4 text-sm sm:text-base w-full max-w-[920px]",
  }[size];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <label
            htmlFor={inputId}
            className="font-sans font-medium text-secondaryaccent"
          >
            {label}
          </label>
          {error && <span className="text-errortext text-sm">{error}</span>}
        </div>

        {helpButton && <div className="shrink-0 ml-3">{helpButton}</div>}
      </div>

      <textarea
        id={inputId}
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`border rounded-3xl py-4 resize-none focus:outline-none text-secondaryaccent bg-primary 
          ${sizeClasses} 
          ${error ? "border-error" : "border-secondaryaccent"} 
          focus:border-primaryaccent
        `}
        aria-label={label}
      />
      <div className="text-right text-sm text-secondaryaccent mt-1">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextArea;
