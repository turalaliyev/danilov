import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoBlack from "../assets/logo-black.png";
import LogoWhite from "../assets/logo-white.png";

export default function Footer() {
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
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 xl:gap-32 2xl:gap-48">
          <div className="max-w-md xl:max-w-lg">
            <Link to="/" className="inline-block select-none cursor-pointer">
              <img
                src={isDarkMode ? LogoWhite : LogoBlack}
                alt="Danilov"
                className="h-16 -ml-3"
              />
            </Link>
            <p className="mt-1 text-sm text-black/80 leading-relaxed">
              A modern shoe house inspired by timeless craftsmanship and clean
              design. Built for daily wear — finished like a statement piece.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 lg:gap-32 xl:gap-48 2xl:gap-64">
            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-black/60">
                Customer care
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link className="hover:opacity-70" to="/category/personal">
                    Personalization
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-70" to="/category/findus">
                    Find us
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-70" to="/category/care">
                    Service
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-70" to="/category/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-black/60">
                Follow
              </div>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://www.instagram.com/danilov_baku?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 text-black/60 hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@danilov_baku?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 text-black/60 hover:text-black transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-black/60">
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
