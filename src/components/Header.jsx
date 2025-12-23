import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import personalizationCategory from "../assets/personalization_category.webp";
import findusCategory from "../assets/findus_category.webp";
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
  { label: "Find Us", key: "findus" },
];

const MAN_SHOES = [
  { label: "Classic", slug: "man-classic" },
  { label: "Derby", slug: "man-derby" },
  { label: "Oxford", slug: "man-oxford" },
  { label: "Monk", slug: "man-monk" },
  { label: "Loafers", slug: "man-loafers" },
  { label: "Boots", slug: "man-boots" },
  { label: "Moccasins", slug: "man-moccasins" },
  { label: "Sports", slug: "man-sports" },
  { label: "Sandals", slug: "man-sandals" },
  { label: "Slippers (Mules)", slug: "man-mules" },
  { label: "All shoes", slug: "man-shoes" },
];

const WOMAN_SHOES = [
  { label: "Boots", slug: "woman-boots" },
  { label: "High heels", slug: "woman-high-heels" },
  { label: "Moccasins", slug: "woman-moccasins" },
  { label: "Sports", slug: "woman-sports" },
  { label: "Flat shoes", slug: "woman-flat" },
  { label: "Pumps", slug: "woman-pumps" },
  { label: "Sandals", slug: "woman-sandals" },
  { label: "Slippers (Mules)", slug: "woman-mules" },
  { label: "All shoes", slug: "woman-shoes" },
];

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const [manCategoryTab, setManCategoryTab] = useState("shoes");
  const [manShoeTab, setManShoeTab] = useState("man-classic");
  const [womanShoeTab, setWomanShoeTab] = useState("woman-boots");

  const dropdownData = useMemo(
    () => ({
      man: {
        title: "Man",
        image: manCategory,
      },
      woman: {
        title: "Woman",
        image: womanCategory,
      },
      care: {
        title: "Service",
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
        title: "Danilov's Culture",
        image: cultureCategory,
        links: [
          { label: "The story", href: "/culture/story" },
          { label: "Craftsmanship", href: "/culture/craftsmanship" },
          { label: "Journal", href: "/culture/journal" },
          { label: "Stores", href: "/stores" },
        ],
      },
      findus: {
        title: "Find Us",
        image: findusCategory,
        links: [{ label: "Find Us", href: "/contacts" }],
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

  const closeAll = () => {
    setActive(null);
    setOpen(false);
  };

  const go = (href) => {
    closeAll();
    navigate(href);
  };

  const toggleDesktopDropdown = (key) => {
    if (key === "gifts") {
      go("/gift-card");
      return;
    }

    if (key === "accessories") {
      go("/category/man-accessories");
      return;
    }

    setActive((prev) => {
      const next = prev === key ? null : key;

      if (next === "man") {
        setManCategoryTab("shoes");
        setManShoeTab("man-classic");
      }
      if (next === "woman") {
        setWomanShoeTab("woman-boots");
      }

      return next;
    });
  };

  const onManCategoryClick = (tab) => {
    if (tab === "accessories") return go("/category/man-accessories");
    if (tab === "clothes") return go("/category/man-clothes");
    setManCategoryTab("shoes");
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-black/10">
      <div className="pr-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                navigate("/");
                closeAll();
              }}
              className="select-none cursor-pointer"
              aria-label="Go to home"
            >
              <img src={LogoBlack} alt="Danilov" className="h-18" />
            </button>

            <div className="hidden md:flex items-center gap-6 text-sm">
              {NAV.map((i) => {
                const isActive = active === i.key;
                return (
                  <button
                    key={i.key}
                    type="button"
                    onClick={() => toggleDesktopDropdown(i.key)}
                    className={[
                      "tracking-wide cursor-pointer transition inline-flex items-center gap-2",
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

          <div className="flex items-center gap-2 md:gap-4">
            <div className="sm:hidden h-10 w-10 grid place-items-center">
              <HiOutlineMagnifyingGlass
                className="size-6 text-black/60"
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>

            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <HiBars2 className="size-7 text-black/60" aria-hidden="true" />
            </button>

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

      <div
        className={[
          "hidden md:block fixed left-0 right-0 top-16",
          "transition-all duration-300 ease-out",
          active
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="absolute inset-0" onClick={closeAll} />

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
          <button
            type="button"
            onClick={closeAll}
            aria-label="Close menu"
            className="absolute top-6 right-6 h-12 w-12 grid place-items-center border border-white hover:border-indigo-300 transition z-10"
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

          <div className="h-full w-full flex">
            <div className="w-[30%] max-w-130 h-full px-12 py-10 overflow-auto">
              <div className="text-xs tracking-[0.35em] uppercase text-black/60">
                {activeItem?.title || "Menu"}
              </div>

              {active === "man" && (
                <div className="mt-10 space-y-6">
                  {[
                    { label: "Shoes", key: "shoes" },
                    { label: "Accessories", key: "accessories" },
                    { label: "Clothes", key: "clothes" },
                  ].map((t) => {
                    const isOn = manCategoryTab === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => onManCategoryClick(t.key)}
                        className={[
                          "block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer",
                          "text-black/60 hover:text-black hover:opacity-100",
                          isOn ? "text-black opacity-100" : "opacity-100",
                        ].join(" ")}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {active === "woman" && (
                <div className="mt-10 space-y-6">
                  <div className="block text-xs tracking-[0.28em] uppercase opacity-90">
                    Shoes
                  </div>
                </div>
              )}

              {active !== "man" && active !== "woman" && (
                <div className="mt-10 space-y-5">
                  {(activeItem?.links || []).map((l) => (
                    <button
                      key={l.label}
                      type="button"
                      onClick={() => go(l.href)}
                      className="block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer text-black/60 hover:text-black hover:opacity-100"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(active === "man" && manCategoryTab === "shoes") ||
            active === "woman" ? (
              <div className="flex-1 h-full flex">
                <div className="w-[28%] min-w-65 h-full px-10 py-10 overflow-auto border-l border-black/5">
                  <div className="space-y-4">
                    {(active === "man" ? MAN_SHOES : WOMAN_SHOES).map((s) => {
                      const selected =
                        active === "man"
                          ? manShoeTab === s.slug
                          : womanShoeTab === s.slug;

                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => {
                            if (active === "man") setManShoeTab(s.slug);
                            else setWomanShoeTab(s.slug);
                            go(`/category/${s.slug}`);
                          }}
                          className={[
                            "block w-full text-left text-xs tracking-[0.22em] uppercase transition cursor-pointer",
                            "text-black/60 hover:text-black hover:opacity-100",
                            selected ? "text-black opacity-100" : "opacity-100",
                          ].join(" ")}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 h-full">
                  <img
                    src={activeItem?.image}
                    alt={activeItem?.title || "Danilov"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 h-full">
                <img
                  src={activeItem?.image}
                  alt={activeItem?.title || "Danilov"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={[
          "md:hidden border-t border-black/10 bg-paper overflow-hidden",
          "transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-105 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="px-4 py-3 flex flex-col gap-2">
          {NAV.map((i) => (
            <button
              key={i.key}
              type="button"
              onClick={() => {
                setOpen(false);
                if (i.key === "gifts") navigate("/gift-card");
              }}
              className="py-2 text-left text-sm tracking-wide border-b border-black/10 last:border-b-0"
            >
              {i.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
