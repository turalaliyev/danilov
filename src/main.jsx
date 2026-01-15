import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CategoryProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </CategoryProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
