import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import personalizationCategory from "../assets/personalization_category.webp";
import { HiOutlineMagnifyingGlass, HiBars2 } from "react-icons/hi2";
import LogoBlack from "../assets/logo-black.png";
import LogoWhite from "../assets/logo-white.png";
import LanguageSelect from "./LanguageSelect";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import SearchOverlay from "./SearchOverlay";
import { client } from "../sanity/clients";

export default function Header() {
  const navigate = useNavigate();
  const { language, getLocalizedPath } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const [offset, setOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [manCategoryTab, setManCategoryTab] = useState("shoes");
  const [manShoeTab, setManShoeTab] = useState("man-classic");
  const [womanShoeTab, setWomanShoeTab] = useState("woman-boots");

  const [searchOpen, setSearchOpen] = useState(false);

  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const headerHeightRef = useRef(0);
  const ticking = useRef(false);

  const NAV = useMemo(
    () => [
      { label: t.nav.gifts, key: "gifts" },
      { label: t.nav.man, key: "man" },
      { label: t.nav.woman, key: "woman" },
      { label: t.nav.service, key: "service" },
      { label: t.nav.personalization, key: "personal" },
      { label: t.nav.culture, key: "culture" },
      { label: t.nav.accessories, key: "accessories" },
      { label: t.nav.findUs, key: "findus" },
    ],
    [t]
  );

  const MAN_SHOES = useMemo(
    () => [
      { label: t.header.classic, slug: "man-classic" },
      { label: t.header.derby, slug: "man-derby" },
      { label: t.header.oxford, slug: "man-oxford" },
      { label: t.header.monk, slug: "man-monk" },
      { label: t.header.loafers, slug: "man-loafers" },
      { label: t.header.boots, slug: "man-boots" },
      { label: t.header.moccasins, slug: "man-moccasins" },
      { label: t.header.sports, slug: "man-sports" },
      { label: t.header.sandals, slug: "man-sandals" },
      { label: t.header.slippers, slug: "man-mules" },
      { label: t.header.allShoes, slug: "man-shoes" },
    ],
    [t]
  );

  const WOMAN_SHOES = useMemo(
    () => [
      { label: t.header.boots, slug: "woman-boots" },
      { label: t.header.highHeels, slug: "woman-high-heels" },
      { label: t.header.moccasins, slug: "woman-moccasins" },
      { label: t.header.sports, slug: "woman-sports" },
      { label: t.header.flatShoes, slug: "woman-flat" },
      { label: t.header.pumps, slug: "woman-pumps" },
      { label: t.header.sandals, slug: "woman-sandals" },
      { label: t.header.slippers, slug: "woman-mules" },
      { label: t.header.allShoes, slug: "woman-shoes" },
    ],
    [t]
  );

  const dropdownData = useMemo(
    () => ({
      man: { title: t.nav.man, image: manCategory },
      woman: { title: t.nav.woman, image: womanCategory },
      personal: {
        title: t.nav.personalization,
        image: personalizationCategory,
        links: [
          {
            label: t.personalization.madeToMeasure,
            href: "whatsapp://made-to-measure",
          },
          { label: t.personalization.bespoke, href: "whatsapp://bespoke" },
        ],
      },
    }),
    [t]
  );

  const activeItem = active ? dropdownData[active] : null;

  // SEO-optimized alt texts for category images
  const categoryAltTexts = useMemo(() => {
    const alts = {
      man: {
        az: "Danilov kişi ayaqqabı kolleksiyası - əl ilə hazırlanmış premium ayaqqabılar",
        ru: "Коллекция мужской обуви Danilov - премиальная обувь ручной работы",
        en: "Danilov men's shoe collection - premium handmade footwear",
      },
      woman: {
        az: "Danilov qadın ayaqqabı kolleksiyası - əl ilə hazırlanmış premium ayaqqabılar",
        ru: "Коллекция женской обуви Danilov - премиальная обувь ручной работы",
        en: "Danilov women's shoe collection - premium handmade footwear",
      },
      personal: {
        az: "Danilov fərdiləşdirmə xidmətləri - ölçüyə görə və fərdi tikinti ayaqqabılar",
        ru: "Услуги персонализации Danilov - обувь по мерке и индивидуального пошива",
        en: "Danilov personalization services - made to measure and bespoke shoes",
      },
    };
    return alts[active]?.[language] || alts[active]?.en || "Danilov kolleksiyası";
  }, [active, language]);

  const [mView, setMView] = useState("nav");
  const [mNavKey, setMNavKey] = useState(null);
  const [mCategoryKey, setMCategoryKey] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("+994556746674");

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
    const fetchPhoneNumber = async () => {
      try {
        const INFO_QUERY = `*[_type == "info"]{
          phone_number
        }[0]`;

        const info = await client.fetch(INFO_QUERY);
        if (info?.phone_number) {
          setWhatsappNumber(info.phone_number);
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();
  }, []);

  const getWhatsAppLink = (message = "") => {
    const onlyDigits = String(whatsappNumber).replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${onlyDigits}${message ? `?text=${encodedMessage}` : ""}`;
  };

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

      if (dt > 0) {
        velocity = delta / dt;
      }

      lastScrollY.current = currentY;

      const TOP_ZONE = 50;

      if (currentY <= TOP_ZONE) {
        if (offsetRef.current !== 0) {
          offsetRef.current = 0;
          setOffset(0);
        }
        ticking.current = false;
        return;
      }

      if (Math.abs(delta) < 2) {
        ticking.current = false;
        return;
      }

      if (prevY < TOP_ZONE * 2 && delta > 0 && velocity > 0.5) {
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

  // Navigate with language prefix
  const go = (href) => {
    closeAll();
    navigate(getLocalizedPath(href));
  };

  const toggleDesktopDropdown = (key) => {
    if (key === "gifts") return go("/gift-card");
    if (key === "accessories") return go("/category/man-accessories");
    if (key === "findus") return go("/contacts");
    if (key === "service") return go("/service");
    if (key === "culture") return go("/culture");
    if (key === "personal") {
      // Don't navigate, just open dropdown
      setActive((prev) => (prev === key ? null : key));
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

  // ✅ show arrow for items that open a sub menu on mobile
  const mobileNavHasCategories = (key) => {
    return ["man", "woman", "personal"].includes(key);
  };

  // ✅ Only these hrefs should be prefixed with "/category"
  const isProductCategoryHref = (href) => {
    return (
      typeof href === "string" &&
      (href.startsWith("/man-") || href.startsWith("/woman-"))
    );
  };

  const openMobileNav = (key) => {
    if (key === "gifts") return go("/gift-card");
    if (key === "accessories") return go("/category/man-accessories");
    if (key === "findus") return go("/contacts");
    if (key === "service") return go("/service");
    if (key === "culture") return go("/culture");
    if (key === "personal") {
      setMNavKey(key);
      setMCategoryKey(null);
      setMView("categories");
      return;
    }

    setMNavKey(key);
    setMCategoryKey(null);
    setMView("categories");
  };

  const mobileCategoriesForNav = () => {
    if (mNavKey === "man") {
      return [
        { label: t.header.shoes, key: "shoes", hasSub: true },
        {
          label: t.header.accessories,
          key: "accessories",
          hasSub: false,
          href: "/man-accessories",
        },
        {
          label: t.header.clothes,
          key: "clothes",
          hasSub: false,
          href: "/man-clothes",
        },
      ];
    }
    if (mNavKey === "woman") {
      return [{ label: t.header.shoes, key: "shoes", hasSub: true }];
    }
    if (mNavKey === "personal") {
      return (dropdownData[mNavKey]?.links || []).map((l) => ({
        label: l.label,
        key: l.href,
        hasSub: false,
        href: l.href,
      }));
    }

    // culture and others use dropdownData links
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
      className="sticky top-0 z-50 bg-paper/85 backdrop-blur will-change-transform border-b border-black/10"
    >
      <div className="pr-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                navigate(getLocalizedPath("/"));
                closeAll();
              }}
              className="select-none cursor-pointer ml-2 md:ml-0"
              aria-label="Go to home"
            >
              <img
                src={isDarkMode ? LogoWhite : LogoBlack}
                alt="Danilov - Əl ilə hazırlanmış ayaqqabı"
                className="h-19 mr-2"
              />
            </button>

            <div className="hidden md:flex items-center gap-6 text-[13px]">
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

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="h-10 w-10 grid place-items-center"
              aria-label="Search"
            >
              <HiOutlineMagnifyingGlass
                className="size-6 text-black/60"
                strokeWidth={1}
              />
            </button>

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
          </div>
        </div>
      </div>

      {/* Desktop dropdown */}
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
                {activeItem?.title || t.header.menu}
              </div>

              {active === "man" && (
                <div className="mt-10 space-y-6">
                  {[
                    { label: t.header.shoes, key: "shoes" },
                    { label: t.header.accessories, key: "accessories" },
                    { label: t.header.clothes, key: "clothes" },
                  ].map((tab) => {
                    const isOn = manCategoryTab === tab.key;
                    const shouldUnderline =
                      isOn && tab.key === "shoes" && showManSubcats;

                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => onManCategoryClick(tab.key)}
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
                          {tab.label}
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
                    onClick={() => { }}
                    className={[
                      "block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer",
                      "text-black opacity-100",
                    ].join(" ")}
                  >
                    <span className={underlineActiveTabClass}>
                      {t.header.shoes}
                    </span>
                  </button>
                </div>
              )}

              {active !== "man" && active !== "woman" && (
                <div className="mt-10 space-y-5">
                  {(activeItem?.links || []).map((l) => {
                    const isWhatsApp = l.href?.startsWith("whatsapp://");
                    const handleClick = () => {
                      if (isWhatsApp) {
                        const messageType = l.href.replace("whatsapp://", "");
                        const message =
                          messageType === "made-to-measure"
                            ? "Hello, I'm interested in Made To Measure services."
                            : messageType === "bespoke"
                              ? "Hello, I'm interested in Bespoke services."
                              : "";
                        window.open(getWhatsAppLink(message), "_blank");
                        closeAll();
                      } else {
                        go(l.href);
                      }
                    };

                    return (
                      <button
                        key={l.label}
                        type="button"
                        onClick={handleClick}
                        className="block w-full text-left text-xs tracking-[0.28em] uppercase transition cursor-pointer text-black/60 hover:text-black hover:opacity-100"
                      >
                        {l.label}
                      </button>
                    );
                  })}
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
                    alt={categoryAltTexts}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 h-full">
                <img
                  src={activeItem?.image}
                  alt={categoryAltTexts}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
                  {t.header.back}
                </button>
              </div>
            )}

            {/* NAV VIEW */}
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
                          if (i.key === "findus") return go("/contacts");
                          if (i.key === "service") return go("/service");

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

            {/* CATEGORIES VIEW */}
            <div className={mobileSlideClass(mView === "categories")}>
              {mView === "categories" && mNavKey && (
                <div className="flex flex-col">
                  {mobileCategoriesForNav().map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        if (c.href) {
                          const isWhatsApp = c.href?.startsWith("whatsapp://");
                          if (isWhatsApp) {
                            const messageType = c.href.replace(
                              "whatsapp://",
                              ""
                            );
                            const message =
                              messageType === "made-to-measure"
                                ? language === "az"
                                  ? "Salam, Mən Ölçüyə görə xidmətləri ilə maraqlanıram."
                                  : language === "ru"
                                    ? "Здравствуйте, меня интересуют услуги По мерке."
                                    : "Hello, I'm interested in Made To Measure services."
                                : messageType === "bespoke"
                                  ? language === "az"
                                    ? "Salam, Mən Fərdi tikinti xidmətləri ilə maraqlanıram."
                                    : language === "ru"
                                      ? "Здравствуйте, меня интересуют услуги Индивидуального пошива."
                                      : "Hello, I'm interested in Bespoke services."
                                  : "";
                            window.open(getWhatsAppLink(message), "_blank");
                            closeAll();
                            return;
                          }
                          return isProductCategoryHref(c.href)
                            ? go(`/category${c.href}`)
                            : go(c.href);
                        }

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

            {/* SUBCATEGORIES VIEW */}
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
      {searchOpen ? (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      ) : null}
    </header>
  );
}
