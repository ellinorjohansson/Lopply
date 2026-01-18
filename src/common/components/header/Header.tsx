"use client";
import { useTranslation } from "@/common/hooks/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import SuccedToaster from "../toasters/SuccedToaster";
import { useSearchParams, useRouter } from "next/navigation";
import ToolTip from "../tooltip/ToolTip";

function LogoutToaster() {
  const searchParams = useSearchParams();
  const initialToasterState = searchParams.get("loggedOut") === "true";
  const [showLogoutToaster, setShowLogoutToaster] = useState(initialToasterState);
  const authT = useTranslation("authentication");

  if (!showLogoutToaster) return null;

  return (
    <SuccedToaster
      headerMessage={authT("toaster.logged_out")}
      text={authT("toaster.logged_out_text")}
      onClose={() => setShowLogoutToaster(false)}
    />
  );
}

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const menuT = useTranslation("menu");
  const generalT = useTranslation("general");
  const buttonsT = useTranslation("buttons");
  const { data: session } = useSession();
  const router = useRouter();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => setIsNavOpen(false);

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/user?loggedOut=true");
    });
  };

  return (
    <>
      <header className="flex items-center p-4 bg-secondary">
        <ToolTip text={buttonsT("open_nav")} position="right">
          <button
            aria-label="Open left panel"
            className="flex items-center cursor-pointer ml-5"
            onClick={toggleNav}
          >
            <span className="material-symbols-outlined text-4xl! text-secondaryaccent hover:text-primaryaccent transition-colors">
              left_panel_open
            </span>
          </button>
        </ToolTip>

        <h1 className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="hover:text-primaryaccent transition-colors"
          >
            {generalT("lopply")}
          </Link>
        </h1>

        {session?.user?.name && (
          <span className="text-secondaryaccent ml-3 sm:ml-8 max-w-80 md:max-w-90 truncate inline-block">{generalT("hello")} {session.user.name}</span>
        )}
        {session && (
          <div className="ml-auto flex items-center mr-5">
            <button
              aria-label="Logout"
              onClick={handleLogout}
              className="group flex items-center cursor-pointer text-secondaryaccent hover:text-primaryaccent transition-colors"
            >
              <span className="material-symbols-outlined text-4xl! transition-colors">
                logout
              </span>
              <span className="hidden sm:inline font-semibold ml-1 transition-colors">
                {buttonsT("logout")}
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
        <div className="absolute top-5 right-6">
          <ToolTip text={buttonsT("close_nav")} position="left">
            <button
              aria-label="Close navigation"
              className="text-secondaryaccent cursor-pointer hover:text-primaryaccent transition-colors"
              onClick={toggleNav}
            >
              <span className="material-symbols-outlined text-4xl sm:text-6xl">
                {buttonsT("close")}
              </span>
            </button>
          </ToolTip>
        </div>

        <div className="p-4 mt-4 sm:hidden">
          <h1 className="text-3xl text-secondaryaccent">{generalT("lopply")}</h1>
        </div>

        {/* Discover Section */}
        <div className="p-4 mt-5 sm:mt-16">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            {menuT("label.discover")}
          </span>
          <ul>
            <li className="mb-4 md:mb-3">
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl hover:bg-primaryaccent/20 transition-all"
              >
                <span className="material-symbols-outlined">home</span>
                {menuT("home")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/race-match"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">favorite</span>
                {menuT("race_match")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/add-race"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">add</span>
                {menuT("add_race")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/races"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">search</span>
                {menuT("explore_races")}
              </Link>
            </li>
          </ul>
        </div>

        {/* My Journey Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            {menuT("label.my_journey")}
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
                {menuT("bucket_list")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            {menuT("label.account")}
          </span>
          <ul>
            <li className="mb-4 md:mb-3">
              <Link
                href="/user"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">person</span>
                {menuT("login_sign_up")}
              </Link>
            </li>
            <li className="mb-4 md:mb-3">
              <Link
                href="/admin/login"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">shield</span>
                {menuT("admin_panel")}
              </Link>
            </li>
          </ul>
        </div>

        {session && (
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs text-secondaryaccent/60">
              {menuT("signed_in_as")} <span className="font-medium text-secondaryaccent">{session.user?.admin ? menuT("admin") : menuT("user")}</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
