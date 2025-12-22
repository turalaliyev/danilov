import { useEffect, useMemo, useState } from "react";

import giftImage from "../assets/gift_category.webp";
import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import personalizationCategory from "../assets/personalization_category.webp";
import cultureCategory from "../assets/culture_category.jpg";
import careCategory from "../assets/care_category.avif";
import { HiOutlineMagnifyingGlass, HiBars2 } from "react-icons/hi2";
import LogoBlack from "../assets/logo-black.png";

const NAV = [
  { label: "Gifts", key: "gifts" },
  { label: "Man", key: "man" },
  { label: "Woman", key: "woman" },
  { label: "Service", key: "care" },
  { label: "Personalization", key: "personal" },
  { label: "Danilov's Culture", key: "culture" },
  { label: "Accessories", key: "accessories" },
  { label: "Find Us", key: "culture" },
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
      <div className="pr-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left side: Brand + Desktop Nav */}
          <div className="flex items-center gap-2">
            {/* Brand */}
            <a href="/" className="select-none">
              <img 
                src={LogoBlack} 
                alt="Danilov" 
                className="h-18"
              />
            </a>
          
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
        
          {/* Right side: Mobile search + Mobile menu button + Desktop search */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search icon - mobile */}
            <div className="sm:hidden h-10 w-10 grid place-items-center">
              <HiOutlineMagnifyingGlass
                className="size-6 text-black/60"
                strokeWidth={1} 
                aria-hidden="true"
              />
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <HiBars2 
                className="size-7 text-black/60" 
                aria-hidden="true" 
                 
              />
            </button>
            
            {/* Desktop search icon */}
            <div className="hidden sm:grid h-10 w-10 place-items-center">
              <HiOutlineMagnifyingGlass
                className="size-6 text-black/60"
                strokeWidth={1} 
                aria-hidden="true"
              />
            </div>
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


      </div>
    </header>
  );
}
