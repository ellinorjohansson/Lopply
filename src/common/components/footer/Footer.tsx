"use client";
import { useTranslation } from "@/common/hooks/useTranslation";

const Footer = () => {
  const generalT = useTranslation("general");
  const footerT = useTranslation("footer");

  return (
    <footer className="border-t border-secondaryaccent flex flex-col sm:flex-row justify-between items-center sm:items-center text-center sm:text-left gap-y-12 py-6 px-25 bg-secondary">
      {/* Left Column */}
      <div className="flex flex-col space-y-1 text-center sm:text-left">
        <h2 className="text-3xl font-logo">{generalT("lopply")}</h2>
        <p className="w-50 text-sm mx-auto sm:mx-0">
          {footerT("text.discover_and_conquer")}
        </p>
        <p className="text-sm mt-2 mx-auto sm:mx-0">{footerT("text.all_rights")}</p>
      </div>

      {/* Right Column */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1 cursor-pointer text-primaryaccent mt-6 mb-10 sm:mt-0 sm:mb-0"
      >
        <span className="text-base">{footerT("scroll_to_top")}</span>
        <span className="material-symbols-outlined text-2xl">arrow_upward</span>
      </button>
    </footer>
  );
};

export default Footer;
