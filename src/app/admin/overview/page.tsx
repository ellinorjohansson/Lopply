"use client";
import { useState } from "react";
import PendingRaces from "../pending-races/page";
import UserManagement from "../user-management/page";
import AdminSwitch from "@/common/components/adminSwitch/AdminSwitch";

const AdminOverview = () => {
  const [activeTab, setActiveTab] = useState<"races" | "users">("races");

  return (
    <section className="flex flex-col items-center justify-start w-full min-h-screen p-4 gap-4">
      <AdminSwitch mode={activeTab} onChange={setActiveTab} />

      <div className="w-full mt-4">
        {activeTab === "races" ? <PendingRaces /> : <UserManagement />}
      </div>
    </section>
  );
};

export default AdminOverview;
