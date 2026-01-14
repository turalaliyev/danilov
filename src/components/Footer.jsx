import { useEffect, useState, useContext } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoBlack from "../assets/logo-black.png";
import LogoWhite from "../assets/logo-white.png";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

export default function Footer() {
  const { language, getLocalizedPath } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
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

  return (
    <footer className="border-t border-black/10">
      <div className="max-w-6xl xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 xl:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-20 xl:gap-32 2xl:gap-48">
          <div className="max-w-md xl:max-w-lg text-center lg:text-left">
            <Link to={getLocalizedPath("/")} className="inline-block select-none cursor-pointer">
              <img
                src={isDarkMode ? LogoWhite : LogoBlack}
                alt="Danilov - Əl ilə hazırlanmış ayaqqabı Bakıda"
                className="h-16 -ml-1 -mt-2 mx-auto lg:mx-0"
              />
            </Link>
            <p className="mt-1 text-sm text-black/80 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 lg:gap-32 xl:gap-48 2xl:gap-64 w-full lg:w-auto">
            <nav className="text-center lg:text-left" aria-label="Customer care">
              <div className="text-xs tracking-[0.4em] uppercase text-black/60">
                {t.footer.customerCare}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link className="hover:opacity-70" to={getLocalizedPath("/contacts")}>
                    {t.footer.findUs}
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-70" to={getLocalizedPath("/service")}>
                    {t.footer.service}
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-70" to={getLocalizedPath("/contacts")}>
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="text-center lg:text-left">
              <div className="text-xs tracking-[0.4em] uppercase text-black/60">
                {t.footer.follow}
              </div>
              <div className="mt-4 flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.instagram.com/danilov_baku?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 text-black/60 hover:text-black transition-colors"
                  aria-label="Danilov Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@danilov_baku?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 text-black/60 hover:text-black transition-colors"
                  aria-label="Danilov TikTok"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row gap-3 items-center md:items-center md:justify-between text-xs text-black/60 text-center md:text-left">
          <span>
            © {new Date().getFullYear()} Danilov. All rights reserved.
          </span>
          <span className="tracking-[0.25em] uppercase">
            Made by T&T Lab
          </span>
        </div>
      </div>
    </footer>
  );
}
