import { useContext, useState, useEffect } from "react";
import Hero from "../components/Hero.jsx";
import CollectionSection from "../components/CollectionSection.jsx";
import PromoGrid from "../components/PromoGrid.jsx";
import AboutSection from "../components/AboutSection.jsx";
import AnthologySection from "../components/AnthologySection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

import Img8 from "../assets/test_images/IMG-20240910-WA0009.jpg";

import WomanCategory from "../assets/womanCategoryShoes.jpg";

import { client } from "../sanity/clients.js";
import CategoryContext from "../context/CategoryContext.jsx";

export default function HomePage() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const [menCategoryProducts, setMenCategoryProducts] = useState([]);
  const [womenCategoryProducts, setWomenCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        // find all category IDs that belong to man / woman
        const manCategoryIds = (categories || [])
          .filter((c) => c?.slug?.current?.startsWith("man-"))
          .map((c) => c._id);

        const womanCategoryIds = (categories || [])
          .filter((c) => c?.slug?.current?.startsWith("woman-"))
          .map((c) => c._id);

        // if categories not loaded yet, don't query (avoid empty IN [])
        if (!manCategoryIds.length && !womanCategoryIds.length) {
          setMenCategoryProducts([]);
          setWomenCategoryProducts([]);
          return;
        }

        // Fetch 6 men's shoes and 6 women's shoes
        const MEN_SHOES_QUERY = `*[
        _type == "shoes" &&
        count(categories[@._ref in $catIds]) > 0
      ]{
        _id,
        title_en, title_az, title_ru,
        description_en, description_az, description_ru,
        price,
        "slug": slug.current, sku,
        mainImage,
        additionalImage,
        categories
      } | order(_createdAt desc)[0...6]`;

        const WOMEN_SHOES_QUERY = `*[
        _type == "shoes" &&
        count(categories[@._ref in $catIds]) > 0
      ]{
        _id,
        title_en, title_az, title_ru,
        description_en, description_az, description_ru,
        price,
        "slug": slug.current, sku,
        mainImage,
        additionalImage,
        categories
      } | order(_createdAt desc)[0...6]`;

        const [menShoes, womenShoes] = await Promise.all([
          manCategoryIds.length
            ? client.fetch(MEN_SHOES_QUERY, { catIds: manCategoryIds })
            : Promise.resolve([]),
          womanCategoryIds.length
            ? client.fetch(WOMEN_SHOES_QUERY, { catIds: womanCategoryIds })
            : Promise.resolve([]),
        ]);

        setMenCategoryProducts(menShoes || []);
        setWomenCategoryProducts(womenShoes || []);
      } catch (error) {
        console.log(error);
        setMenCategoryProducts([]);
        setWomenCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [categories]);

  return (
    <main>
      <Hero />
      <CollectionSection
        title={t.collections.mensCollection}
        description={t.collections.mensDescription}
        products={menCategoryProducts}
        image={Img8}
        loading={loading}
      />

      <CollectionSection
        title={t.collections.womensCollection}
        description={t.collections.womensDescription}
        products={womenCategoryProducts}
        image={WomanCategory}
        reverse={true}
        loading={loading}
      />
      <PromoGrid />

      <AboutSection />

      <AnthologySection />

      <ContactSection />
    </main>
  );
}
