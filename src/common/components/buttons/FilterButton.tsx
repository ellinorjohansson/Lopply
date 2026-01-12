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
      onClick={onClick}
      className={`py-2 px-4 font-sans flex items-center cursor-pointer rounded-3xl transition min-h-44px ${isActive
        ? "bg-primaryaccent text-secondaryaccent"
        : "bg-secondary border border-secondaryaccent text-secondaryaccent hover:bg-primaryaccent/10"
        }`}
    >
      <span className="material-symbols-outlined mr-2 text-sm">
        {icon}
      </span>
      {text}
    </button>
  );
};

export default FilterButton;