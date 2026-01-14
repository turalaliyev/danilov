import { useEffect, useContext } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import LanguageContext, { SUPPORTED, DEFAULT_LANG } from "../context/LanguageContext.jsx";

export default function SiteLayout() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useContext(LanguageContext);

  // Validate language parameter and sync with context
  useEffect(() => {
    if (!lang) {
      // No language in URL, redirect to default
      navigate(`/${DEFAULT_LANG}`, { replace: true });
      return;
    }

    if (!SUPPORTED.includes(lang)) {
      // Invalid language, redirect to default while preserving path
      const pathWithoutLang = location.pathname.replace(`/${lang}`, '');
      const newPath = `/${DEFAULT_LANG}${pathWithoutLang || ''}`;
      navigate(newPath, { replace: true });
      return;
    }

    // Valid language - sync with context if different
    if (lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage, navigate, location.pathname]);

  // Don't render until language is valid
  if (!lang || !SUPPORTED.includes(lang)) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
