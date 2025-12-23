import { useTranslation } from "@/common/hooks/useTranslation";

const Footer = () => {
  const g = useTranslation("general");
  const f = useTranslation("footer");
  return (
    <>
      <footer className="border-t border-secondaryaccent">
        <h2 className="text-3xl">{g("lopply")}</h2>
        <p className="w-40 text-xs">{f("text.discover_and_concuer")}</p>
        <span className="text-primaryaccent font-sans">
          {f("scroll_to_top")}
        </span>
        <span className="material-symbols-outlined text-primaryaccent">
          arrow_upward
        </span>
      </footer>
    </>
  );
};

export default Footer;
