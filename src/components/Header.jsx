import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import personalizationCategory from "../assets/personalization_category.webp";
import findusCategory from "../assets/findus_category.webp";
import cultureCategory from "../assets/culture_category.jpg";
import careCategory from "../assets/care_category.avif";
import { HiOutlineMagnifyingGlass, HiBars2 } from "react-icons/hi2";
import LogoBlack from "../assets/logo-black.png";
import LogoWhite from "../assets/logo-white.png";
import LanguageSelect from "./LanguageSelect";

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

  const [offset, setOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [manCategoryTab, setManCategoryTab] = useState("shoes");
  const [manShoeTab, setManShoeTab] = useState("man-classic");
  const [womanShoeTab, setWomanShoeTab] = useState("woman-boots");

  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const headerHeightRef = useRef(0);
  const ticking = useRef(false);

  const dropdownData = useMemo(
    () => ({
      man: { title: "Man", image: manCategory },
      woman: { title: "Woman", image: womanCategory },
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

  const [mView, setMView] = useState("nav");
  const [mNavKey, setMNavKey] = useState(null);
  const [mCategoryKey, setMCategoryKey] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActive(null);
        setMView("nav");
        setMNavKey(null);
        setMCategoryKey(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const measure = () => {
      const h = headerRef.current?.offsetHeight || 0;
      setHeaderHeight(h);
      headerHeightRef.current = h;
    };

    measure();

    const onResize = () => {
      if (window.innerWidth < 768) setActive(null);
      if (window.innerWidth >= 768) {
        measure();
        setMView("nav");
        setMNavKey(null);
        setMCategoryKey(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    // Track velocity to detect bounce-back
    let lastTime = performance.now();
    let velocity = 0;

    const onScroll = () => {
      const rawY = window.scrollY || document.documentElement.scrollTop || 0;
      const currentY = Math.max(rawY, 0);
      const prevY = Math.max(lastScrollY.current, 0);
      
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;
      
      const delta = currentY - prevY;
      
      // Calculate velocity (px per ms)
      if (dt > 0) {
        velocity = delta / dt;
      }
      
      lastScrollY.current = currentY;

      // Top zone where header is always visible - catches bounce-back
      const TOP_ZONE = 50;

      // At top: always show header
      if (currentY <= TOP_ZONE) {
        if (offsetRef.current !== 0) {
          offsetRef.current = 0;
          setOffset(0);
        }
        ticking.current = false;
        return;
      }

      // Ignore very small movements (bounce noise)
      if (Math.abs(delta) < 2) {
        ticking.current = false;
        return;
      }

      // Detect bounce-back: if we were near top and now getting pushed down with high velocity
      // This happens when trackpad/touch overscroll releases
      if (prevY < TOP_ZONE * 2 && delta > 0 && velocity > 0.5) {
        // This is likely bounce-back, ignore hiding
        ticking.current = false;
        return;
      }

      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const prev = offsetRef.current;
        const max = headerHeightRef.current || headerHeight || 0;
        let next = prev + delta;

        if (next < 0) next = 0;
        if (next > max) next = max;

        if (next !== prev) {
          offsetRef.current = next;
          setOffset(next);
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight]);

  const closeAll = () => {
    setActive(null);
    setOpen(false);
    setMView("nav");
    setMNavKey(null);
    setMCategoryKey(null);
  };

  const go = (href) => {
    closeAll();
    navigate(href);
  };

  const toggleDesktopDropdown = (key) => {
    if (key === "gifts") return go("/gift-card");
    if (key === "accessories") return go("/category/man-accessories");

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

  const showManSubcats = active === "man" && manCategoryTab === "shoes";
  const showWomanSubcats = active === "woman";
  const showSubcats = showManSubcats || showWomanSubcats;

  const underlineActiveTabClass =
    "relative inline-block text-black after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[1px] after:w-full after:bg-black";

  const mobileWrapClass = (isOpen) =>
    [
      "overflow-hidden",
      "transition-[max-height,opacity] duration-300 ease-out",
      isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
    ].join(" ");

  const mobileSlideClass = (isActive) =>
    [
      "transition-all duration-300 ease-out",
      isActive
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-2 pointer-events-none",
    ].join(" ");

  const mGoBack = () => {
    if (mView === "subcategories") {
      setMView("categories");
      setMCategoryKey(null);
      return;
    }
    if (mView === "categories") {
      setMView("nav");
      setMNavKey(null);
      setMCategoryKey(null);
      return;
    }
    setOpen(false);
  };

  const mobileNavHasCategories = (key) => key === "man" || key === "woman";

  const openMobileNav = (key) => {
    if (key === "gifts") return go("/gift-card");
    if (key === "accessories") return go("/category/man-accessories");

    setMNavKey(key);
    setMCategoryKey(null);
    setMView("categories");
  };

  const mobileCategoriesForNav = () => {
    if (mNavKey === "man") {
      return [
        { label: "Shoes", key: "shoes", hasSub: true },
        {
          label: "Accessories",
          key: "accessories",
          hasSub: false,
          href: "/man-accessories",
        },
        {
          label: "Clothes",
          key: "clothes",
          hasSub: false,
          href: "/man-clothes",
        },
      ];
    }
    if (mNavKey === "woman") {
      return [{ label: "Shoes", key: "shoes", hasSub: true }];
    }
    return (dropdownData[mNavKey]?.links || []).map((l) => ({
      label: l.label,
      key: l.href,
      hasSub: false,
      href: l.href,
    }));
  };

  const mobileSubcatsForNav = () => {
    if (mNavKey === "man") return MAN_SHOES;
    if (mNavKey === "woman") return WOMAN_SHOES;
    return [];
  };

  return (
    <header
      ref={headerRef}
      style={{ transform: `translateY(-${offset}px)` }}
      className="sticky top-0 z-50 bg-paper/85 backdrop-blur will-change-transform" // Сдвигаем header вверх пропорционально скроллу
    >
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
              <img
                src={isDarkMode ? LogoWhite : LogoBlack}
                alt="Danilov"
                className="h-19 mr-2"
              />
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
                      "tracking-wide cursor-pointer transition inline-flex items-center gap-2 uppercase",
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
            <div className="hidden md:block">
              <LanguageSelect />
            </div>
            <div className="sm:hidden h-10 w-10 grid place-items-center">
              <HiOutlineMagnifyingGlass
                className="size-6 text-black/60"
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>

            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
              onClick={() => {
                setOpen((v) => {
                  const next = !v;
                  setMView("nav");
                  setMNavKey(null);
                  setMCategoryKey(null);
                  return next;
                });
              }}
              aria-label="Open menu"
              type="button"
            >
              <HiBars2 className="size-7 text-black/60" aria-hidden="true" />
            </button>

            <div className="md:hidden">
              <LanguageSelect />
            </div>

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
                    const shouldUnderline =
                      isOn && t.key === "shoes" && showManSubcats;

                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => onManCategoryClick(t.key)}
                        className={[
                          "block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer",
                          "text-black/60 hover:text-black hover:opacity-100",
                        ].join(" ")}
                      >
                        <span
                          className={
                            shouldUnderline ? underlineActiveTabClass : ""
                          }
                        >
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {active === "woman" && (
                <div className="mt-10 space-y-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className={[
                      "block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer",
                      "text-black opacity-100",
                    ].join(" ")}
                  >
                    <span className={underlineActiveTabClass}>Shoes</span>
                  </button>
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

            {showSubcats ? (
              <div className="flex-1 h-full flex">
                <div className="w-[28%] min-w-65 h-full px-10 py-10 overflow-auto border-l border-black/5">
                  <div className="space-y-4">
                    {(showManSubcats ? MAN_SHOES : WOMAN_SHOES).map((s) => {
                      const selected = showManSubcats
                        ? manShoeTab === s.slug
                        : womanShoeTab === s.slug;

                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => {
                            if (showManSubcats) setManShoeTab(s.slug);
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

      <div className={mobileWrapClass(open)}>
        <div className="md:hidden">
          <div className="px-4 py-3 relative">
            {mView !== "nav" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={mGoBack}
                  className="relative text-xs tracking-[0.24em] uppercase text-black/60 hover:text-black transition"
                >
                  Back
                </button>
              </div>
            )}

            <div className={mobileSlideClass(mView === "nav")}>
              {mView === "nav" && (
                <div className="flex flex-col">
                  {NAV.map((i) => {
                    const expandable = mobileNavHasCategories(i.key);
                    return (
                      <button
                        key={i.key}
                        type="button"
                        onClick={() => {
                          if (i.key === "gifts") return go("/gift-card");
                          if (i.key === "accessories")
                            return go("/category/man-accessories");

                          if (!expandable) return openMobileNav(i.key);
                          openMobileNav(i.key);
                        }}
                        className="py-3 text-left text-sm tracking-wide border-b border-black/10 last:border-b-0 flex items-center justify-between uppercase"
                      >
                        <span>{i.label}</span>
                        {expandable ? (
                          <span className="text-black/50" aria-hidden="true">
                            ▸
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={mobileSlideClass(mView === "categories")}>
              {mView === "categories" && mNavKey && (
                <div className="flex flex-col">
                  {mobileCategoriesForNav().map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        if (c.href) return go(`/category${c.href}`);
                        if (c.hasSub) {
                          setMCategoryKey(c.key);
                          setMView("subcategories");
                        }
                      }}
                      className="py-3 text-left text-sm tracking-wide border-b border-black/10 last:border-b-0 text-black/70 hover:text-black transition flex items-center justify-between uppercase"
                    >
                      <span>{c.label}</span>
                      {c.hasSub ? (
                        <span className="text-black/45" aria-hidden="true">
                          ▸
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={mobileSlideClass(mView === "subcategories")}>
              {mView === "subcategories" && mNavKey && mCategoryKey && (
                <div className="flex flex-col">
                  {mobileSubcatsForNav().map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => go(`/category/${s.slug}`)}
                      className="py-3 text-left text-sm tracking-wide border-b border-black/10 last:border-b-0 text-black/60 hover:text-black transition uppercase"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
