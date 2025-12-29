"use client";

export interface AccentButtonProps {
    text: string;
    icon: string;
    size: "small" | "medium" | "large";
}

const AccentButton = ({ text, icon, size = "medium" }: AccentButtonProps) => {

    const sizeClasses = {
        small: "py-2 px-4 text-sm",
        medium: "py-2 px-23 text-base",
        large: "py-2 px-60 text-base"
    }[size];

    return (
        <button
            className={`${sizeClasses} font-sans flex items-center cursor-pointer bg-secondary border border-primaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition`}
        >

            {text}
            <span className="material-symbols-outlined ml-2">
                {icon}
            </span>
        </button>
    );
}

export default AccentButton;
