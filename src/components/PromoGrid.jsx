import { useContext, useEffect, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import { client } from "../sanity/clients.js";
import { urlFor } from "../sanity/image.ts";

export default function PromoGrid() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const [promoImages, setPromoImages] = useState({});

  // Get today's date as a seed for daily rotation
  const getTodaySeed = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  // Get a stable index based on daily seed
  const getDailyIndex = (categorySlug, totalProducts) => {
    if (totalProducts <= 0) return 0;
    const seed = getTodaySeed() + categorySlug;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % totalProducts;
  };

  useEffect(() => {
    const fetchPromoImages = async () => {
      try {
        const categoryMappings = [
          { slug: "man-boots", key: "bootsForHim" },
          { slug: "woman-boots", key: "bootsForHer" },
          { slug: "man-clothes", key: "mensOutwear" },
          { slug: "man-accessories", key: "mensAccessories" },
        ];

        const images = {};

        for (const mapping of categoryMappings) {
          const query = `*[_type == "shoes" && $categorySlug in categories[]->slug.current]{
            mainImage,
            additionalImage
          }`;
          
          const products = await client.fetch(query, { categorySlug: mapping.slug });
          
          if (products && products.length > 0) {
            const dailyIndex = getDailyIndex(mapping.slug, products.length);
            const selectedProduct = products[dailyIndex];
            const imageAsset = selectedProduct.mainImage || selectedProduct.additionalImage;
            
            if (imageAsset) {
              images[mapping.key] = urlFor(imageAsset).width(800).height(1200).url();
            }
          }
        }

        setPromoImages(images);
      } catch (error) {
        console.error("Error fetching promo images:", error);
      }
    };

    fetchPromoImages();
  }, []);

  const promos = [
    { title: t.promoGrid.bootsForHim, link: "/category/man-boots", image: promoImages.bootsForHim },
    { title: t.promoGrid.bootsForHer, link: "/category/woman-boots", image: promoImages.bootsForHer },
    { title: t.promoGrid.mensOutwear, link: "/category/man-clothes", image: promoImages.mensOutwear },
    { title: t.promoGrid.mensAccessories, link: "/category/man-accessories", image: promoImages.mensAccessories, linkText: t.promoGrid.viewAll },
  ];

  return (
    <section className="promo-grid flex flex-wrap gap-0">
      {promos.map((promo, index) => (
        <div 
          key={index} 
          className={`promo-item relative w-full md:w-1/2 h-[120vh] ${index % 2 === 0 ? 'md:pr-0.5' : 'md:pl-0.5'}`}
        >
          {promo.image ? (
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black/10" />
          )}
          <div className="promo-overlay absolute inset-0 flex flex-col items-center justify-center text-white uppercase text-center bg-black/30">
            <h3 className="text-2xl mb-2.5">{promo.title}</h3>
            <a href={promo.link} className="border-b border-white text-sm pb-1 hover:opacity-80 transition">
              {promo.linkText || t.promoGrid.shopNow}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

