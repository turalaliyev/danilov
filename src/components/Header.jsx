import { useEffect, useMemo, useState } from "react";

import giftImage from "../assets/gift_category.webp";
import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import personalizationCategory from "../assets/personalization_category.webp";
import cultureCategory from "../assets/culture_category.jpg";
import careCategory from "../assets/care_category.avif";

const NAV = [
  { label: "Gifts", key: "gifts" },
  { label: "Man", key: "man" },
  { label: "Woman", key: "woman" },
  { label: "Shoe Care", key: "care" },
  { label: "Personalization", key: "personal" },
  { label: "Culture", key: "culture" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const dropdownData = useMemo(
    () => ({
      gifts: {
        title: "Gifts",
        image: giftImage,
        links: [
          { label: "Our gift ideas for him", href: "/gifts/him" },
          { label: "Our gift ideas for her", href: "/gifts/her" },
          { label: "Precious gifts", href: "/gifts/precious" },
        ],
      },
      man: {
        title: "Man",
        image: manCategory,
        links: [
          { label: "New arrivals", href: "/man/new" },
          { label: "Oxfords", href: "/man/oxfords" },
          { label: "Derby", href: "/man/derby" },
          { label: "Loafers", href: "/man/loafers" },
          { label: "Sneakers", href: "/man/sneakers" },
        ],
      },
      woman: {
        title: "Woman",
        image: womanCategory,
        links: [
          { label: "New arrivals", href: "/woman/new" },
          { label: "Heels", href: "/woman/heels" },
          { label: "Loafers", href: "/woman/loafers" },
          { label: "Boots", href: "/woman/boots" },
          { label: "Sneakers", href: "/woman/sneakers" },
        ],
      },
      care: {
        title: "Shoe Care",
        image: careCategory,
        links: [
          { label: "Care kits", href: "/shoe-care/kits" },
          { label: "Creams & polishes", href: "/shoe-care/creams" },
          { label: "Brushes", href: "/shoe-care/brushes" },
          { label: "Laces & accessories", href: "/shoe-care/accessories" },
        ],
      },
      personal: {
        title: "Personalization",
        image: personalizationCategory,
        links: [
          { label: "Monogram", href: "/personalization/monogram" },
          { label: "Made to order", href: "/personalization/made-to-order" },
          { label: "Materials", href: "/personalization/materials" },
          {
            label: "Book an appointment",
            href: "/personalization/appointment",
          },
        ],
      },
      culture: {
        title: "Culture",
        image: cultureCategory,
        links: [
          { label: "The story", href: "/culture/story" },
          { label: "Craftsmanship", href: "/culture/craftsmanship" },
          { label: "Journal", href: "/culture/journal" },
          { label: "Stores", href: "/stores" },
        ],
      },
    }),
    []
  );

  const activeItem = active ? dropdownData[active] : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActive(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) setActive(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleDesktopDropdown = (key) => {
    setActive((prev) => (prev === key ? null : key));
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-black/10">
      <div className="px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="text-center select-none">
            <div className="font-display text-2xl md:text-3xl tracking-[0.22em] uppercase">
              Danilov
            </div>
            <div className="text-[11px] tracking-[0.28em] text-black/60 uppercase">
              Shoes & Leather
            </div>
          </a>

          {/* Nav + mobile button */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            {/* Desktop nav (dropdown triggers) */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              {NAV.map((i) => {
                const isActive = active === i.key;
                return (
                  <button
                    key={i.key}
                    type="button"
                    onClick={() => toggleDesktopDropdown(i.key)}
                    className={[
                      "tracking-wide transition inline-flex items-center gap-2",
                      "hover:opacity-70",
                      isActive ? "opacity-90" : "",
                    ].join(" ")}
                    aria-expanded={isActive}
                    aria-controls={`dropdown-${i.key}`}
                  >
                    {i.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Socials */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M17.6 6.7h.01"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 5 3.8 12.1c-.7.3-.66 1.31.06 1.57l4.7 1.73 1.8 5.6c.22.68 1.09.84 1.53.29l2.7-3.4 4.9 3.64c.56.41 1.35.1 1.48-.58L22 5.9c.14-.78-.63-1.38-1.28-.9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.6 15.2 19.6 7.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8.5V7.2c0-.9.6-1.2 1.1-1.2H17V3h-2.6C12 3 11 4.6 11 6.8v1.7H9v3h2V21h3v-9.5h2.6l.4-3H14Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Desktop Mega Dropdown (Santoni-like) */}
      <div
        className={[
          "hidden md:block fixed left-0 right-0 top-16",
          "transition-all duration-300 ease-out",
          active
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Click outside area (transparent, NOT dark) */}
        <div className="absolute inset-0" onClick={() => setActive(null)} />

        {/* Panel */}
        <div
          id={active ? `dropdown-${active}` : undefined}
          className={[
            "relative w-full bg-white border-t border-black/10",
            "h-[55vh] min-h-105",
            "transition-all duration-300 ease-out origin-top",
            active ? "translate-y-0 scale-y-100" : "-translate-y-2 scale-y-95",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button (top-right) */}
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close menu"
            className="absolute top-6 right-6 h-12 w-12 grid place-items-center border border-white hover:border-y-indigo-300 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Content: LEFT links + RIGHT image (full height, no rounding) */}
          <div className="h-full w-full flex">
            {/* Left (links) */}
            <div className="w-[40%] max-w-130 h-full px-12 py-10 overflow-auto">
              <div className="text-xs tracking-[0.35em] uppercase text-black/60">
                {activeItem?.title || "Menu"}
              </div>

              <div className="mt-10 space-y-5">
                {(activeItem?.links || []).map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setActive(null)}
                    className="block text-xs tracking-[0.28em] uppercase hover:opacity-70 transition"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right (image) */}
            <div className="flex-1 h-full">
              <img
                src={activeItem?.image || dropdownData.gifts.image}
                alt={activeItem?.title || "Danilov"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (same structure as before) */}
      <div
        className={[
          "md:hidden border-t border-black/10 bg-paper overflow-hidden",
          "transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-105 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="px-4 py-3 flex flex-col gap-2">
          {NAV.map((i) => (
            <a
              key={i.key}
              href="#"
              onClick={() => setOpen(false)}
              className="py-2 text-sm tracking-wide border-b border-black/10 last:border-b-0"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="pb-3 flex justify-center items-center gap-1">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M17.6 6.7h.01"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 5 3.8 12.1c-.7.3-.66 1.31.06 1.57l4.7 1.73 1.8 5.6c.22.68 1.09.84 1.53.29l2.7-3.4 4.9 3.64c.56.41 1.35.1 1.48-.58L22 5.9c.14-.78-.63-1.38-1.28-.9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.6 15.2 19.6 7.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 8.5V7.2c0-.9.6-1.2 1.1-1.2H17V3h-2.6C12 3 11 4.6 11 6.8v1.7H9v3h2V21h3v-9.5h2.6l.4-3H14Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
