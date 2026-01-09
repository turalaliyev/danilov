import React, { useContext, useMemo } from "react";
import { urlFor } from "../sanity/image";
import LanguageContext from "../context/LanguageContext";

export default function CollectionCard({ product }) {
  const { language } = useContext(LanguageContext);

  const title = useMemo(() => {
    if (!product) return "";
    if (language === "az") return product.title_az || product.title_en || "";
    if (language === "ru") return product.title_ru || product.title_en || "";
    return product.title_en || product.title_az || product.title_ru || "";
  }, [language, product]);

  const img = product?.mainImage
    ? urlFor(product.mainImage).width(600).height(700).url()
    : null;

  return (
    <div className="product-card shrink-0 h-[55vh] w-[40vh] bg-white p-4 text-center shadow-sm flex flex-col font-light">
      <img
        src={
          img ||
          "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB"
        }
        alt={title}
        className="w-full flex-1 min-h-0 object-cover mb-4"
      />

      <div className="flex-none">
        <h4 className="text-sm mb-1.5 text-black/80">{title}</h4>

        <span className="text-black/60 text-xs uppercase tracking-wide">
          {product?.price} AZN
        </span>
      </div>
    </div>
  );
}
