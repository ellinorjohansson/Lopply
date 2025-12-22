"use client";

import React, { useState } from "react";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4">
        {/* Button on the left */}
        <button
          aria-label="Open left panel"
          className="flex items-center cursor-pointer"
          onClick={toggleNav}
        >
          <span className="material-symbols-outlined text-5xl text-secondaryaccent">
            left_panel_open
          </span>
        </button>

        {/* Title in the center */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl">
          Lopply
        </h1>
      </header>

      {/* Navigation panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
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
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">home</span>
                Home
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">favorite</span>
                Race Match
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">add</span>
                Add Race
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">search</span>
                Explore Races
              </a>
            </li>
          </ul>
        </div>

        {/* My Journey Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            My Journey
          </span>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">
                  list_alt_check
                </span>
                Bucket List
              </a>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="p-4">
          <span className="block text-sm text-secondaryaccent/70 font-medium mb-2">
            Account
          </span>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">person</span>
                Login / Sign up
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center gap-2 text-secondaryaccent font-sans text-base relative hover:text-primaryaccent hover:py-1 hover:px-1 hover:rounded-2xl transition-all"
              >
                <span className="material-symbols-outlined">shield</span>
                Admin Panel
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
