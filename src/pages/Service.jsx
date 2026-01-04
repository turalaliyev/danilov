// src/pages/Service.jsx
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import ServiceImg from "../assets/service.jpg";

export default function Service() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const navigate = useNavigate();

  const WHATSAPP_NUMBER = "+994556746674";
  const INSTAGRAM_URL = "https://www.instagram.com/danilov_service/";

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-sm tracking-[0.32em] uppercase text-black">
            {t.nav.service}
          </h1>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs tracking-[0.24em] uppercase text-black/60 hover:text-black transition"
          >
            {t.header.back}
          </button>
        </div>

        <div className="mt-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src={ServiceImg}
                alt="Danilov Service"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Text and Links */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl uppercase tracking-wide font-bold">
                {t.servicePage.title}
              </h2>
              <p className="mt-4 text-sm text-black/60 leading-relaxed font-light">
                {t.servicePage.description}
              </p>

              {/* Social Links */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-10 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all flex items-center justify-center gap-3"
                >
                  <FaWhatsapp size={18} />
                  {t.contact.chatOnWhatsApp}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-3 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all flex items-center justify-center gap-3"
                >
                  <FaInstagram size={18} />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}