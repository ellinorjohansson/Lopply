"use client";

import { useTranslation } from "@/common/hooks/useTranslation";

interface SearchBarProps {
  value: string;
  onChange: (_value: string) => void;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder,
  label,
  ariaLabel
}: SearchBarProps) => {
  const generalT = useTranslation("general");
  const buttonsT = useTranslation("buttons");
  const resolvedLabel = label || generalT("search");
  const resolvedPlaceholder = placeholder || `${generalT("search")}...`;

  return (
    <div>
      <label htmlFor="search-input" className="text-lg text-primaryaccent block mb-3">
        {resolvedLabel}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondaryaccent pointer-events-none">
          search
        </span>
        <input
          type="search"
          id="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={resolvedPlaceholder}
          className="w-full pl-14 pr-12 py-3 bg-primary text-secondaryaccent placeholder:text-secondaryaccent/50 border border-secondaryaccent/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primaryaccent focus:border-transparent transition-all [&::-webkit-search-cancel-button]:hidden"
          aria-label={ariaLabel || resolvedLabel}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondaryaccent hover:text-primaryaccent transition-colors p-1"
            aria-label={buttonsT("clear_search")}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
