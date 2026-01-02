import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

export default function AboutSection() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  return (
    <section className="about-section flex flex-wrap gap-10 py-16 px-8 bg-paper/50">
      <h2 className="flex-1 basis-[40%] text-2xl md:text-3xl uppercase tracking-wide font-bold">
        {t.about.title}
      </h2>
      <p className="flex-1 basis-[55%] text-sm text-black/60 leading-relaxed font-light">
        {t.about.description}
      </p>
    </section>
  );
}

