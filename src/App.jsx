import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CategoryCollection from "./pages/CategoryCollection.jsx";
import GiftCardPage from "./pages/GiftCardPage.jsx";
import Contacts from "./pages/Contacts.jsx";
import Service from "./pages/Service.jsx";
import Culture from "./pages/Culture.jsx";
import ProductPage from "./pages/ProductPage.jsx";

// Supported languages
const SUPPORTED_LANGS = ["az", "ru", "en"];
const DEFAULT_LANG = "az";

// Language validator component
function LanguageRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Redirect root to default language (Azerbaijan - primary market) */}
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
      
      {/* Language-prefixed routes */}
      <Route path="/:lang" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:category" element={<CategoryCollection />} />
        <Route path="product/:sku" element={<ProductPage />} />
        <Route path="gift-card" element={<GiftCardPage />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="service" element={<Service />} />
        <Route path="culture" element={<Culture />} />
      </Route>
      
      {/* 404 fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Export for use in other components
export { SUPPORTED_LANGS, DEFAULT_LANG };
