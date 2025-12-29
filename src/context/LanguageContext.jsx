// src/context/LanguageContext.jsx
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const LanguageContext = createContext();

const SUPPORTED = ["en", "az", "ru"];
const STORAGE_KEY = "danilov_lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) {
    console.log(e);
  }
  return "en";
}

export const LanguageProvider = ({ children }) => {
  const [language, _setLanguage] = useState(getInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      console.log(e);
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (!SUPPORTED.includes(lang)) return;
    _setLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    _setLanguage((prev) => {
      const idx = SUPPORTED.indexOf(prev);
      return SUPPORTED[(idx + 1) % SUPPORTED.length];
    });
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, supported: SUPPORTED }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageContext;
