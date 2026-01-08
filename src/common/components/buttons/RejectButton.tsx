"use client";

export interface RejectButtonProps {
  text: string;
  onClick?: () => void;
}

const RejectButton = ({ text, onClick }: RejectButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={`py-2 px-9 text-base font-sans flex items-center justify-center cursor-pointer bg-error border border-secondaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition whitespace-nowrap`}
    >
      {text}
    </button>
  );
}

export default RejectButton;
