import React, { useContext, useMemo } from "react";
import { urlFor } from "../sanity/image";
import LanguageContext from "../context/LanguageContext";

export default function ProductCard({ product, loading = false }) {
  const { language } = useContext(LanguageContext);

  const title = useMemo(() => {
    if (!product) return "";
    if (language === "az") return product.title_az || product.title_en || "";
    if (language === "ru") return product.title_ru || product.title_en || "";
    return product.title_en || product.title_az || product.title_ru || "";
  }, [language, product]);

  const img = product?.mainImage
    ? urlFor(product.mainImage).width(900).height(1100).url()
    : null;

  if (loading) {
    return (
      <div className="bg-white p-4 shadow-sm">
        <div className="animate-pulse">
          <div className="aspect-4/5 bg-black/10" />
          <div className="h-4 bg-black/10 mt-4 w-4/5" />
          <div className="h-3 bg-black/10 mt-2 w-2/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="aspect-4/5 bg-black/5 overflow-hidden">
        <img
          src={
            img ||
            "https://placeholder.pics/svg/600x800/DBDBDB-DBDBDB/DBDBDB-DBDBDB"
          }
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <h4 className="text-[13px] leading-snug text-black/80 mt-2">{title}</h4>
        {product?.price != null && (
          <div className="text-[13px] text-black/70 whitespace-nowrap">
            {Number(product.price).toLocaleString()} AZN
          </div>
        )}
      </div>
    </div>
  );
}
