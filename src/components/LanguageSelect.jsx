import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageContext, { SUPPORTED } from "../context/LanguageContext";

const LANGS = [
  { value: "az", label: "AZ" },
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
];

export default function LanguageSelect() {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const wrapRef = useRef(null);
  const ignoreNextClick = useRef(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    return () => mediaQuery.removeEventListener("change", checkDarkMode);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      // Skip if we just handled a button click
      if (ignoreNextClick.current) {
        ignoreNextClick.current = false;
        return;
      }
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LANGS.find((l) => l.value === language)?.label || "AZ";

  const handleToggle = () => {
    ignoreNextClick.current = true;
    setOpen((v) => !v);
  };

  // Switch language by navigating to new URL
  const switchLanguage = (newLang) => {
    if (newLang === language) {
      setOpen(false);
      return;
    }

    // Get current path and replace language segment
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Replace language segment if it exists
    if (pathParts.length > 0 && SUPPORTED.includes(pathParts[0])) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    
    const newPath = '/' + pathParts.join('/');
    
    // Update context and navigate
    setLanguage(newLang);
    navigate(newPath);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onPointerDown={handleToggle}
        className={[
          "inline-flex items-center gap-1.5",
          "text-xs tracking-[0.24em] uppercase",
          "px-2 py-1 rounded-sm",
          "bg-transparent transition",
          isDarkMode
            ? "text-white/80 hover:text-white border border-white/10 hover:border-white/20"
            : "text-ink/70 hover:text-ink border border-ink/10 hover:border-ink/20",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{current}</span>
        <span
          className={[
            "text-[10px] leading-none transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div
        className={[
          "absolute right-0 mt-2 min-w-21",
          "rounded-md overflow-hidden",
          "border border-white/10",
          "bg-[#1b1510]/95 backdrop-blur",
          "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
        ].join(" ")}
        role="menu"
      >
        {LANGS.map((l) => {
          const active = l.value === language;
          return (
            <button
              key={l.value}
              type="button"
              onPointerDown={() => switchLanguage(l.value)}
              className={[
                "w-full text-left px-3 py-2",
                "text-xs tracking-[0.24em] uppercase",
                active ? "text-white" : "text-white/75 hover:text-white",
                "hover:bg-white/5 transition",
              ].join(" ")}
              role="menuitem"
              aria-current={active ? "true" : undefined}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
