"use client";
import { useTranslation } from "@/common/hooks/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import SuccedToaster from "../toasters/SuccedToaster";
import { useSearchParams } from "next/navigation";

function LogoutToaster() {
  const searchParams = useSearchParams();
  const initialToasterState = searchParams.get("loggedOut") === "true";
  const [showLogoutToaster, setShowLogoutToaster] = useState(initialToasterState);
  const a = useTranslation("authentication");

  if (!showLogoutToaster) return null;

  return (
    <SuccedToaster
      headerMessage={a("toaster.logged_out")}
      text={a("toaster.logged_out_text")}
      onClose={() => setShowLogoutToaster(false)}
    />
  );
}

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const m = useTranslation("menu");
  const g = useTranslation("general");
  const { data: session } = useSession();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => setIsNavOpen(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/user?loggedOut=true" });
  };

  return (
    <>
      <header className="flex items-center p-4 bg-secondary">
        <button
          aria-label="Open left panel"
          className="flex items-center cursor-pointer ml-5"
          onClick={toggleNav}
        >
          <span className="material-symbols-outlined text-4xl! text-secondaryaccent hover:text-primaryaccent transition-colors">
            left_panel_open
          </span>
        </button>

        <h1 className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl">
          {g("lopply")}
        </h1>
        {session?.user?.name && (
          <span className="text-secondaryaccent ml-3 sm:ml-8">{g("hello")} {session.user.name}</span>
        )}
        {session && (
          <div className="ml-auto flex items-center mr-5">
            <button
              aria-label="Logout"
              className="flex items-center cursor-pointer"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined text-4xl! text-secondaryaccent hover:text-primaryaccent transition-colors">
                logout
              </span>
              <span className="hidden sm:inline text-secondaryaccent font-semibold ml-1">
                Logout
              </span>
            </button>
          </div>
        )}
      </header>

      <Suspense fallback={null}>
        <LogoutToaster />
      </Suspense>

      {/* Navigation panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          aria-label="Close navigation"
          className="absolute top-4 right-4 text-secondaryaccent cursor-pointer hover:text-primaryaccent transition-colors"
          onClick={toggleNav}
        >
          <span className="material-symbols-outlined text-4xl sm:text-6xl">
            close
          </span>
        </button>

        <div className="p-4 mt-4 sm:hidden">
          <h1 className="text-3xl text-secondaryaccent">{g("lopply")}</h1>
        </div>

        {/* Discover Section */}
        <div className="p-4 mt-5 sm:mt-16">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            Discover
          </span>
          <ul>
            <li className="mb-4 md:mb-3">
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl hover:bg-primaryaccent/20 transition-all"
              >
                <span className="material-symbols-outlined">home</span>
                {m("home")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/race-match"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">favorite</span>
                {m("race_match")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/add-race"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">add</span>
                {m("add_race")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/races"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">search</span>
                {m("explore_races")}
              </Link>
            </li>
          </ul>
        </div>

        {/* My Journey Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            {m("label.my_journey")}
          </span>
          <ul>
            <li className="mb-4 md:mb-3">
              <Link
                href="/bucketlist"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">
                  list_alt_check
                </span>
                {m("bucket_list")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            {m("label.account")}
          </span>
          <ul>
            <li className="mb-4 md:mb-3">
              <Link
                href="/user"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">person</span>
                {m("login_sign_up")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/admin/login"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">shield</span>
                {m("admin_panel")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
