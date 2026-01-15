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

const SUPPORTED = ["az", "ru", "en"];
const DEFAULT_LANG = "az";
const STORAGE_KEY = "danilov_lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    // Ignore localStorage errors
  }
  return DEFAULT_LANG;
}

export const LanguageProvider = ({ children }) => {
  const [language, _setLanguage] = useState(getInitialLang);

  // Save to localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore localStorage errors
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

  // Get localized path for a given route (adds language prefix)
  const getLocalizedPath = useCallback((path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Check if path already has language prefix
    const pathParts = cleanPath.split('/').filter(Boolean);
    if (pathParts.length > 0 && SUPPORTED.includes(pathParts[0])) {
      pathParts[0] = language;
      return '/' + pathParts.join('/');
    }
    
    // Add language prefix
    if (!cleanPath) {
      return `/${language}`;
    }
    return `/${language}/${cleanPath}`;
  }, [language]);

  const value = useMemo(
    () => ({ 
      language, 
      setLanguage, 
      toggleLanguage, 
      supported: SUPPORTED,
      defaultLang: DEFAULT_LANG,
      getLocalizedPath,
      isValidLang: (l) => SUPPORTED.includes(l)
    }),
    [language, setLanguage, toggleLanguage, getLocalizedPath]
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
export { SUPPORTED, DEFAULT_LANG };
