"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/common/hooks/useTranslation";
import ConfirmModal from "@/common/components/comfirmModal/ConfirmModal";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import ErrorToaster from "@/common/components/toasters/ErrorToaster";
import DropdownFieldUserManagement from "@/common/components/input/dropdownFieldUserManagement/DropdownFieldUserManagement";

interface User {
  _id: string;
  name?: string;
  email: string;
  admin: boolean;
}

const UserManagement = () => {
  const u = useTranslation("user_management");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'role' | 'delete' | null>(null);
  const [pendingRole, setPendingRole] = useState<boolean | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (userId: string, newRole: boolean) => {
    setSelectedUserId(userId);
    setPendingRole(newRole);
    setActionType('role');
    setConfirmOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setActionType('delete');
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUserId) return;

    let success = false;

    if (actionType === 'delete') {
      success = await deleteUser(selectedUserId);
      if (success) {
        setSuccessMessage(u("user_deleted"));
      } else {
        setErrorMessage(u("delete_error"));
      }
    } else if (actionType === 'role' && pendingRole !== null) {
      success = await updateUserRole(selectedUserId, pendingRole);
      if (success) {
        setSuccessMessage(u("role_updated"));
      } else {
        setErrorMessage(u("update_error"));
      }
    }

    setConfirmOpen(false);
    setSelectedUserId(null);
    setPendingRole(null);
    setActionType(null);

    if (success) {
      setShowSuccessToaster(true);
      fetchUsers();
    } else {
      setShowErrorToaster(true);
    }
  };

  const updateUserRole = async (userId: string, admin: boolean) => {
    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, admin }),
      });
      return response.ok;
    } catch (error) {
      console.error("Failed to update user role:", error);
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users?userId=${userId}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Failed to delete user:", error);
      return false;
    }
  };

  const getConfirmMessage = () => {
    if (actionType === 'delete') {
      return u("confirm_delete_message");
    } else if (actionType === 'role' && pendingRole !== null) {
      const role = pendingRole ? u("admin") : u("user");
      return u("confirm_role_change_message", { role });
    }
    return "";
  };

  const getConfirmTitle = () => {
    if (actionType === 'delete') {
      return u("confirm_delete_title");
    } else if (actionType === 'role') {
      return u("confirm_role_change_title");
    }
    return "";
  };

  return (
    <>
      {showSuccessToaster && (
        <SuccedToaster
          headerMessage={u("success")}
          text={successMessage}
          onClose={() => setShowSuccessToaster(false)}
        />
      )}
      {showErrorToaster && (
        <ErrorToaster
          headerMessage={u("error")}
          text={errorMessage}
          onClose={() => setShowErrorToaster(false)}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title={getConfirmTitle()}
        message={getConfirmMessage()}
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedUserId(null);
          setPendingRole(null);
          setActionType(null);
        }}
      />
      <div className="p-6 max-w-6xl mx-auto mt-20">
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-secondaryaccent mb-2">{u("title")}</h3>
          <p className="text-secondaryaccent/80">{u("subtitle")}</p>
        </div>

        {loading ? (
          <p className="text-secondaryaccent text-center py-8">{u("loading")}</p>
        ) : users.length === 0 ? (
          <p className="text-secondaryaccent text-center py-8">{u("no_users")}</p>
        ) : (
          <div className="bg-secondary border border-secondaryaccent p-5 rounded-3xl mb-20">
            <table className="w-full border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-secondaryaccent/20">
                  <th className="text-left py-3 px-4 text-primaryaccent font-semibold">{u("name")}</th>
                  <th className="text-left py-3 px-4 text-primaryaccent font-semibold">{u("email")}</th>
                  <th className="text-left py-3 px-4 text-primaryaccent font-semibold">{u("role")}</th>
                  <th className="text-left py-3 px-4 text-primaryaccent font-semibold">{u("actions")}</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {users.map((user) => (
                  <tr key={user._id} className="block md:table-row border-b border-secondaryaccent/10 hover:bg-secondaryaccent/5 mb-4 md:mb-0">
                    <td className="block md:table-cell py-2 md:py-3 px-4 text-secondaryaccent before:content-[attr(data-label)] before:font-semibold before:text-primaryaccent before:block before:mb-1 md:before:hidden" data-label={`${u("name")}:`}>
                      {user.name || "-"}
                    </td>
                    <td className="block md:table-cell py-2 md:py-3 px-4 text-secondaryaccent before:content-[attr(data-label)] before:font-semibold before:text-primaryaccent before:block before:mb-1 md:before:hidden" data-label={`${u("email")}:`}>
                      {user.email}
                    </td>
                    <td className="block md:table-cell py-2 md:py-3 px-4 before:content-[attr(data-label)] before:font-semibold before:text-primaryaccent before:block before:mb-1 md:before:hidden" data-label={`${u("role")}:`}>
                      <DropdownFieldUserManagement
                        value={user.admin}
                        onChange={(newRole) => handleRoleChange(user._id, newRole)}
                      />
                    </td>
                    <td className="block md:table-cell py-2 md:py-3 px-4 before:content-[attr(data-label)] before:font-semibold before:text-primaryaccent before:block before:mb-1 md:before:hidden" data-label={`${u("actions")}:`}>
                      <button onClick={() => handleDeleteClick(user._id)}>
                        <span className="material-symbols-outlined text-secondaryaccent cursor-pointer" >
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;