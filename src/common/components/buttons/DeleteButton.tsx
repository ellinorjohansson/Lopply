"use client";

export interface DeleteButtonProps {
  text: string;
  onClick?: () => void;
}

const DeleteButton = ({ text, onClick }: DeleteButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={`py-2 px-27 text-base font-sans flex items-center justify-center cursor-pointer bg-error border border-secondaryaccent text-secondaryaccent rounded-3xl hover:brightness-80 transition whitespace-nowrap`}
    >
      {text}
    </button>
  );
}

export default DeleteButton;