import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CategoryCollection from "./pages/CategoryCollection.jsx";
import GiftCardPage from "./pages/GiftCardPage.jsx";
import Contacts from "./pages/Contacts.jsx";
import Service from "./pages/Service.jsx";
import Culture from "./pages/Culture.jsx";
import DanilovIs from "./pages/Culture.jsx";
import ProductPage from "./pages/ProductPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryCollection />} />
        <Route path="/product/:sku" element={<ProductPage />} />
        <Route path="/gift-card" element={<GiftCardPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/service" element={<Service />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
