import { useContext, useEffect, useRef, useState } from "react";
import LanguageContext from "../context/LanguageContext";

const LANGS = [
  { value: "az", label: "AZ" },
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
];

export default function LanguageSelect() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LANGS.find((l) => l.value === language)?.label || "EN";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-1.5",
          "text-xs tracking-[0.24em] uppercase",
          "text-white/80 hover:text-white transition",
          "px-2 py-1 rounded-sm",
          "border border-white/10 hover:border-white/20",
          "bg-transparent",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
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
              onClick={() => {
                setLanguage(l.value);
                setOpen(false);
              }}
              className={[
                "w-full text-left px-3 py-2",
                "text-xs tracking-[0.24em] uppercase",
                active ? "text-white" : "text-white/75 hover:text-white",
                "hover:bg-white/5 transition",
              ].join(" ")}
              role="menuitem"
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
