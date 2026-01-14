import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../sanity/image";
import LanguageContext from "../context/LanguageContext";

export default function CollectionCard({ product }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const title = useMemo(() => {
    if (!product) return "";
    if (language === "az") return product.title_az || product.title_en || "";
    if (language === "ru") return product.title_ru || product.title_en || "";
    return product.title_en || product.title_az || product.title_ru || "";
  }, [language, product]);

  const img = product?.mainImage
    ? urlFor(product.mainImage).width(500).height(600).quality(85).url()
    : null;

  const handleClick = () => {
    if (product?.sku) {
      navigate(`/product/${product.sku}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!product?.sku}
      className={`product-card shrink-0 h-[55vh] w-[40vh] bg-white p-4 text-center shadow-sm flex flex-col font-light ${
        product?.sku
          ? "cursor-pointer hover:shadow-md transition-shadow"
          : "cursor-default"
      }`}
    >
      <img
        src={
          img ||
          "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB"
        }
        alt={title}
        className="w-full flex-1 min-h-0 object-cover mb-4"
        loading="lazy"
      />

      <div className="flex-none">
        <h4 className="text-sm mb-1.5 text-black/80">{title}</h4>

        <span className="text-black/60 text-xs uppercase tracking-wide">
          {product?.price} AZN
        </span>
      </div>
    </button>
  );
}
