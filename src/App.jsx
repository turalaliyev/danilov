import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CategoryCollection from "./pages/CategoryCollection.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryCollection />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
