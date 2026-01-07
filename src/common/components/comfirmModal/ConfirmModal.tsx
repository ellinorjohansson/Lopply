"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import { useTranslation } from "@/common/hooks/useTranslation";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  const c = useTranslation("confirm");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/97">
      <div className="bg-secondary border border-secondaryaccent rounded-3xl p-8 max-w-md w-full flex flex-col gap-6 shadow-lg">
        {title && <h3 className="text-xl font-medium text-secondaryaccent">{title}</h3>}
        <p className="text-secondaryaccent">{message}</p>

        <div className="flex justify-end gap-3 mt-4">
          <SecondaryButton text={c("cancel")} size="medium" onClick={onCancel} />
          <PrimaryButton text={c("confirm")} size="medium" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
