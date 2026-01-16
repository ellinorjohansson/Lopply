"use client";

export interface FilterButtonProps {
  text: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FilterButton = ({ text, icon, isActive = false, onClick }: FilterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        py-2 px-4
        font-sans
        flex items-center
        cursor-pointer
        rounded-3xl
        transition
        min-h-44px
        border
        focus-visible:outline-none
        focus-visible:ring-0
        ${isActive
          ? "bg-primaryaccent text-secondaryaccent border-primaryaccent focus-visible:border-secondaryaccent"
          : "bg-secondary text-secondaryaccent border-secondaryaccent hover:bg-primaryaccent/10 focus-visible:border-primaryaccent"
        }
      `}
    >
      {icon && (
        <span className="material-symbols-outlined mr-2 text-sm" aria-hidden="true">
          {icon}
        </span>
      )}
      {text}
    </button>
  );
};

export default FilterButton;
