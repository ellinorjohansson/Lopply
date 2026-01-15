"use client";

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
  placeholder = "Search...",
  label = "Search",
  ariaLabel
}: SearchBarProps) => {
  return (
    <div className="mb-8">
      <label htmlFor="search-input" className="text-lg text-primaryaccent block mb-3">
        {label}
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
          placeholder={placeholder}
          className="w-full pl-14 pr-12 py-3 bg-primary text-secondaryaccent placeholder:text-secondaryaccent/50 border border-secondaryaccent/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primaryaccent focus:border-transparent transition-all [&::-webkit-search-cancel-button]:hidden"
          aria-label={ariaLabel || label}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondaryaccent hover:text-primaryaccent transition-colors p-1"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
