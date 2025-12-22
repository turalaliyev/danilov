import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";

export const useLanguage = () => {
  return useContext(LanguageContext);
};
