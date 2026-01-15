"use client";

import { useTranslation } from "@/common/hooks/useTranslation";

export interface DropdownFieldUserManagementProps {
  value: boolean;
  onChange: (_value: boolean) => void;
}

const DropdownFieldUserManagement = ({
  value,
  onChange,
}: DropdownFieldUserManagementProps) => {
  const userT = useTranslation("user_management");

  return (
    <div className="relative w-fit">
      <select
        value={value ? "admin" : "user"}
        onChange={(e) => onChange(e.target.value === "admin")}
        className="appearance-none bg-secondary border rounded-3xl px-3 py-2 pr-8 text-secondaryaccent border-primaryaccent focus:outline-none focus:border-primaryaccent cursor-pointer"
      >
        <option value="user">{userT("user")}</option>
        <option value="admin">{userT("admin")}</option>
      </select>

      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-secondaryaccent pointer-events-none text-lg">
        keyboard_arrow_down
      </span>
    </div>
  );
};

export default DropdownFieldUserManagement;
