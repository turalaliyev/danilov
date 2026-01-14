import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import SEO from "../components/SEO";
import { getSeoMeta } from "../seo/metadata";

export default function NotFoundPage() {
  const { language, getLocalizedPath } = useContext(LanguageContext);
  const location = useLocation();
  const seo = getSeoMeta("notFound", language);

  // Localized 404 messages
  const messages = {
    az: {
      title: "404 — Səhifə tapılmadı",
      description: "Axtardığınız səhifə mövcud deyil və ya köçürülüb.",
      goHome: "Ana səhifəyə",
      browse: "Kateqoriyalara bax",
    },
    ru: {
      title: "404 — Страница не найдена",
      description: "Страница, которую вы ищете, не существует или была перемещена.",
      goHome: "На главную",
      browse: "Просмотр категорий",
    },
    en: {
      title: "404 — Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      goHome: "Go home",
      browse: "Browse categories",
    },
  };

  const m = messages[language] || messages.en;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        lang={language}
        path={location.pathname}
        noIndex={true}
      />
      <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-xs tracking-[0.4em] uppercase text-black/60">
        Danilov
      </div>

      <h1 className="mt-3 font-display text-4xl md:text-5xl">
        {m.title}
      </h1>

      <p className="mt-4 text-sm md:text-base text-black/60 max-w-xl leading-relaxed">
        {m.description}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link
          to={getLocalizedPath("/")}
          className="inline-flex items-center h-11 px-6 rounded-full bg-ink text-paper text-sm tracking-wide hover:opacity-90 transition"
        >
          {m.goHome}
        </Link>

        <Link
          to={getLocalizedPath("/category/man-shoes")}
          className="inline-flex items-center h-11 px-6 rounded-full border border-black/15 text-sm tracking-wide hover:bg-black/5 transition"
        >
          {m.browse}
        </Link>
      </div>
    </main>
    </>
  );
}
