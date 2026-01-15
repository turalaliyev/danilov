// src/pages/Service.jsx
import { useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaPhone } from "react-icons/fa";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import SEO from "../components/SEO";
import { getSeoMeta } from "../seo/metadata";
import { organizationSchema, generateBreadcrumbSchema, combineSchemas } from "../seo/schema";
import ServiceImg from "../assets/service.jpg";

export default function Service() {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const t = translations[language] || translations.en;
  const seo = getSeoMeta("service", language);
  const navigate = useNavigate();

  const WHATSAPP_NUMBER = "+994556746674";
  const INSTAGRAM_URL = "https://www.instagram.com/danilov_service/";

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  // SEO-optimized alt texts
  const altTexts = {
    az: "Danilov ayaqqabı servisi - peşəkar bərpa və qulluq",
    ru: "Сервис обуви Danilov - профессиональная реставрация и уход",
    en: "Danilov shoe service - professional restoration and care",
  };
  const alt = altTexts[language] || altTexts.en;

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Danilov", url: `https://danilov.az/${language}` },
    { name: t.nav.service, url: `https://danilov.az${location.pathname}` },
  ]);

  const pageSchema = combineSchemas(organizationSchema, breadcrumbSchema);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        lang={language}
        path={location.pathname}
        schema={pageSchema}
      />
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
                  alt={alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl uppercase tracking-wide font-bold">
                  {t.servicePage.title}
                </h2>
                <p className="mt-4 text-sm text-black/60 leading-relaxed font-light">
                  {t.servicePage.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-10 bg-[#d3d3d3]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide mb-4 text-black">
              {t.contact?.titleService || "Contact Us"}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black/70 font-light mb-6">
              {t.servicePage?.contactText ||
                "Have questions about our service? Contact us via WhatsApp or phone for assistance."}
            </p>
            
            {/* Phone */}
            <div className="mb-6 flex justify-center">
              <a
                href="tel:+994556746674"
                className="flex items-center gap-2 text-black/70 hover:text-black transition-colors text-base"
              >
                <FaPhone className="text-base" />
                <span>Tel: +994 55 674 66 74</span>
              </a>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* WhatsApp Button */}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[220px] py-4 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all"
              >
                {t.contact?.chatOnWhatsApp || "Chat on WhatsApp"}
              </a>

              {/* Instagram Button */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[220px] py-4 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all"
              >
                <FaInstagram className="mr-2" size={14} />
                {t.contact?.instagramButton || "Danilov Servis"}
              </a>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </>
  );
}
