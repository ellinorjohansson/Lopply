"use client";

export interface ApproveButtonProps {
  text: string;
  onClick?: () => void;
}

const ApproveButton = ({ text, onClick }: ApproveButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={`py-2 px-7 text-base font-sans flex items-center justify-center cursor-pointer bg-success border border-secondaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition whitespace-nowrap`}
    >
      {text}
    </button>
  );
}

export default ApproveButton;
