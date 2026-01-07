// src/pages/Culture.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import CultureImg from "../assets/culture_category.jpg";

export default function Culture() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-sm tracking-[0.32em] uppercase text-black">
            {t.nav.culture}
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
                src={CultureImg}
                alt="Danilov Culture"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl uppercase tracking-wide font-bold">
                Danilov Culture
              </h2>
              <p className="mt-4 text-sm text-black/60 leading-relaxed font-light">
                Content will be added here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

