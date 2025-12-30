"use client";

import { useTranslation } from "@/common/hooks/useTranslation";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const m = useTranslation("menu");
  const g = useTranslation("general");

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      <header className="flex items-center justify-between p-4">
        {/* Button on the left */}
        <button
          aria-label="Open left panel"
          className="flex items-center cursor-pointer ml-5"
          onClick={toggleNav}
        >
          <span className="material-symbols-outlined inline-block text-4xl! text-secondaryaccent hover:text-primaryaccent transition-colors">
            left_panel_open
          </span>
        </button>

        {/* Title in the center */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-3xl">
          {g("lopply")}
        </h1>
      </header>

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

        {/* Discover Section */}
        <div className="p-4 mt-16">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            Discover
          </span>
          <ul>
            <li className="mb-3">
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl hover:bg-primaryaccent/20 transition-all"
              >
                <span className="material-symbols-outlined">home</span>
                {m("home")}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">favorite</span>
                {m("race_match")}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">add</span>
                {m("add_race")}
              </Link>
            </li>
            <li className="mb-2">
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
            <li className="mb-2">
              <Link
                href="/"
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
            <li className="mb-2">
              <Link
                href="/user/login"
                onClick={closeNav}
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all hover:bg-primaryaccent/20"
              >
                <span className="material-symbols-outlined">person</span>
                {m("login_sign_up")}
              </Link>
            </li>
            <li className="mb-2">
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
