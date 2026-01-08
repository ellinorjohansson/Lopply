"use client";
import { useState } from "react";
import PendingRaces from "../pending-races/page";
import UserManagement from "../user-management/page";
import AdminSwitch from "@/common/components/adminSwitch/AdminSwitch";
import { useTranslation } from "@/common/hooks/useTranslation";

const AdminOverview = () => {
  const [activeTab, setActiveTab] = useState<"races" | "users">("races");
  const t = useTranslation("admin_panel");

  return (
    <main className="w-full">
      <section className="mt-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:pl-9 md:text-4xl">
            {t("admin_dashboard")}
          </h2>
          <p className="text-secondaryaccent sm:pl-9 mt-1 mb-6 text-lg">
            {t("manage_races_and_users")}
          </p>

          <div className="sm:pl-9 mb-6">
            <AdminSwitch mode={activeTab} onChange={setActiveTab} />
          </div>

          <div className="mt-6">
            {activeTab === "races" ? <PendingRaces /> : <UserManagement />}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminOverview;
