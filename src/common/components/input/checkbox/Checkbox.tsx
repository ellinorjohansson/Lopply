"use client";
import { useState } from "react";

type CheckboxProps = {
  label: string;
  icon?: string;
  defaultChecked?: boolean;
  name?: string;
  value?: string;
  onChange?: (_checked: boolean) => void;
};

const Checkbox = ({
  label,
  icon,
  defaultChecked = false,
  name,
  value,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className={`flex flex-col items-center cursor-pointer border rounded-3xl p-4 bg-primary transition-all duration-200 focus-within:ring-2 focus-within:ring-primaryaccent ${checked ? 'border-primaryaccent' : 'border-secondaryaccent'}`}>
      {icon && (
        <span
          className={`material-symbols-outlined text-4xl mb-2 transition-colors duration-200 ${checked ? 'text-primaryaccent' : 'text-secondaryaccent'}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span className="text-sm font-medium text-center mb-2 text-secondaryaccent">
        {label}
      </span>

      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="absolute w-px h-px opacity-0"
        aria-label={label}
      />

      <div
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${checked
            ? "border-primaryaccent bg-primaryaccent"
            : "border-primaryaccent bg-transparent"
          }
        `}
      >
      </div>
    </label>
  );
};

export default Checkbox;
