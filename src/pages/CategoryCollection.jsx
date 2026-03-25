import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import accessoriesCategory from "../assets/AccessoriesCategory.jpg";
import clothesCategory from "../assets/ClothesCategory.webp";

// Import men's subcategory images
import manClassic from "../assets/man/classic.jpeg";
import manDerby from "../assets/man/derby.jpeg";
import manOxford from "../assets/man/oxford.jpeg";
import manMonk from "../assets/man/monk.jpeg";
import manLoafers from "../assets/man/loafers.jpeg";
import manBoots from "../assets/man/boots.jpeg";
import manMoccasin from "../assets/man/moccasin.jpeg";
import manSports from "../assets/man/sports.jpeg";
import manSandals from "../assets/man/sandals.jpeg";
import manSlippers from "../assets/man/slippers.jpeg";

// Import women's subcategory images
import womanBoots from "../assets/woman/boots.jpeg";
import womanHighHeels from "../assets/woman/high_heels.jpeg";
import womanMoccasins from "../assets/woman/moccasins.jpg";
import womanSports from "../assets/woman/sports.jpeg";
import womanFlat from "../assets/woman/flat_shoes.jpeg";
import womanPumps from "../assets/woman/pumps.jpeg";
import womanSandals from "../assets/woman/sandals.jpeg";
import womanSlippers from "../assets/woman/slippers.jpeg";

import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import CategoryContext from "../context/CategoryContext";
import { translations } from "../translations";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { getCategorySeoMeta } from "../seo/metadata";
import {
  organizationSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  combineSchemas,
} from "../seo/schema";

// SEO-optimized alt text helper
const getCategoryAltText = (group, language) => {
  const alts = {
    man: {
      az: "Danilov kişi ayaqqabı kolleksiyası",
      ru: "Коллекция мужской обуви Danilov",
      en: "Danilov men's shoe collection",
    },
    woman: {
      az: "Danilov qadın ayaqqabı kolleksiyası",
      ru: "Коллекция женской обуви Danilov",
      en: "Danilov women's shoe collection",
    },
  };
  return alts[group]?.[language] || alts[group]?.en || "Danilov collection";
};

// Helper function to get subcategory image
const getSubcategoryImage = (category) => {
  const subcategoryImages = {
    // Men's subcategories
    "man-classic": manClassic,
    "man-derby": manDerby,
    "man-oxford": manOxford,
    "man-monk": manMonk,
    "man-loafers": manLoafers,
    "man-boots": manBoots,
    "man-moccasins": manMoccasin,
    "man-sports": manSports,
    "man-sandals": manSandals,
    "man-mules": manSlippers,
    // Women's subcategories
    "woman-boots": womanBoots,
    "woman-high-heels": womanHighHeels,
    "woman-moccasins": womanMoccasins,
    "woman-sports": womanSports,
    "woman-flat": womanFlat,
    "woman-pumps": womanPumps,
    "woman-sandals": womanSandals,
    "woman-mules": womanSlippers,
  };
  
  return subcategoryImages[category] || null;
};

const underlineClass =
  "relative inline-block text-black after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[1px] after:w-full after:bg-black";

function titleFromSlug(slug, t, language) {
  if (!slug) return "";

  const categoryTitles = {
    az: {
      "man-classic": "Ekzotik Dəri Kişi Ayaqqabıları",
      "man-derby": "Kişi Derby Ayaqqabıları",
      "man-oxford": "Kişi Oxford Ayaqqabıları",
      "man-monk": "Kişi Monk Ayaqqabıları",
      "man-loafers": "Kişi Loafers Ayaqqabıları",
      "man-boots": "Kişi Çəkmələri",
      "man-moccasins": "Kişi Mokasınları",
      "man-sports": "Kişi İdman Ayaqqabıları",
      "man-sandals": "Kişi Sandaletləri",
      "man-mules": "Kişi Mules Ayaqqabıları",
      "man-shoes": "Bütün Kişi Ayaqqabıları",
      "woman-boots": "Qadın Çəkmələri",
      "woman-high-heels": "Qadın Yüksək Dabanları",
      "woman-moccasins": "Qadın Mokasınları",
      "woman-sports": "Qadın İdman Ayaqqabıları",
      "woman-flat": "Düz Qadın Ayaqqabıları",
      "woman-pumps": "Qadın Pompaları",
      "woman-sandals": "Qadın Sandaletləri",
      "woman-mules": "Qadın Mules Ayaqqabıları",
      "woman-shoes": "Bütün Qadın Ayaqqabıları",
    },
    ru: {
      "man-classic": "Мужская Обувь из Экзотической Кожи",
      "man-derby": "Мужские Дерби",
      "man-oxford": "Мужские Оксфорды",
      "man-monk": "Мужские Монки",
      "man-loafers": "Мужские Лоферы",
      "man-boots": "Мужские Ботинки",
      "man-moccasins": "Мужские Мокасины",
      "man-sports": "Мужская Спортивная Обувь",
      "man-sandals": "Мужские Сандалии",
      "man-mules": "Мужские Мюли",
      "man-shoes": "Вся Мужская Обувь",
      "woman-boots": "Женские Сапоги",
      "woman-high-heels": "Женские Туфли на Каблуке",
      "woman-moccasins": "Женские Мокасины",
      "woman-sports": "Женская Спортивная Обувь",
      "woman-flat": "Женская Обувь на Плоской Подошве",
      "woman-pumps": "Женские Туфли",
      "woman-sandals": "Женские Сандалии",
      "woman-mules": "Женские Мюли",
      "woman-shoes": "Вся Женская Обувь",
    },
    en: {
      "man-classic": "Men's Exotic Leather Shoes",
      "man-derby": "Men's Derby Shoes",
      "man-oxford": "Men's Oxford Shoes",
      "man-monk": "Men's Monk Shoes",
      "man-loafers": "Men's Loafers",
      "man-boots": "Men's Boots",
      "man-moccasins": "Men's Moccasins",
      "man-sports": "Men's Sports Shoes",
      "man-sandals": "Men's Sandals",
      "man-mules": "Men's Mules",
      "man-shoes": "All Men's Shoes",
      "woman-boots": "Women's Boots",
      "woman-high-heels": "Women's High Heels",
      "woman-moccasins": "Women's Moccasins",
      "woman-sports": "Women's Sports Shoes",
      "woman-flat": "Women's Flat Shoes",
      "woman-pumps": "Women's Pumps",
      "woman-sandals": "Women's Sandals",
      "woman-mules": "Women's Mules",
      "woman-shoes": "All Women's Shoes",
    },
  };

  const lang = categoryTitles[language] ? language : "en";
  return categoryTitles[lang]?.[slug] || slug.replace(/^(man-|woman-)/, "").replace(/-/g, " ");
}

export default function CategoryCollection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, getLocalizedPath } = useContext(LanguageContext);
  const { categories } = useContext(CategoryContext);
  const t = translations[language] || translations.en;

  // Get SEO meta for this category
  const seo = getCategorySeoMeta(category, language);
  const pageTitle = titleFromSlug(category, t, language);

  const group = useMemo(() => {
    if (category?.startsWith("man-")) return "man";
    if (category?.startsWith("woman-")) return "woman";
    return "other";
  }, [category]);

  const MAN_TABS = useMemo(
    () => [
      { label: t.categoryCollection.viewAll, slug: "man-shoes" },
      { label: t.categoryCollection.classic, slug: "man-classic" },
      { label: t.categoryCollection.derby, slug: "man-derby" },
      { label: t.categoryCollection.oxford, slug: "man-oxford" },
      { label: t.categoryCollection.monk, slug: "man-monk" },
      { label: t.categoryCollection.loafers, slug: "man-loafers" },
      { label: t.categoryCollection.boots, slug: "man-boots" },
      { label: t.categoryCollection.moccasins, slug: "man-moccasins" },
      { label: t.categoryCollection.sports, slug: "man-sports" },
      { label: t.categoryCollection.sandals, slug: "man-sandals" },
      { label: t.categoryCollection.slippers, slug: "man-mules" },
    ],
    [t]
  );

  const WOMAN_TABS = useMemo(
    () => [
      { label: t.categoryCollection.viewAll, slug: "woman-shoes" },
      { label: t.categoryCollection.boots, slug: "woman-boots" },
      { label: t.categoryCollection.highHeels, slug: "woman-high-heels" },
      { label: t.categoryCollection.moccasins, slug: "woman-moccasins" },
      { label: t.categoryCollection.sports, slug: "woman-sports" },
      { label: t.categoryCollection.pumps, slug: "woman-pumps" },
      { label: t.categoryCollection.sandals, slug: "woman-sandals" },
      { label: t.categoryCollection.slippers, slug: "woman-mules" },
    ],
    [t]
  );

  const tabs = useMemo(() => {
    if (group === "man") return MAN_TABS;
    if (group === "woman") return WOMAN_TABS;
    return [];
  }, [group, MAN_TABS, WOMAN_TABS]);

  const heroImage = useMemo(() => {
    if (category === "man-accessories") return accessoriesCategory;
    if (category === "man-clothes") return clothesCategory;
    
    // Check if there's a specific subcategory image
    const subcategoryImage = getSubcategoryImage(category);
    if (subcategoryImage) return subcategoryImage;
    
    // Default to main category images for "view all" pages
    if (group === "man") return manCategory;
    if (group === "woman") return womanCategory;
    return manCategory;
  }, [category, group]);

  const MAN_SHOE_SLUGS = useMemo(
    () => MAN_TABS.filter((x) => x.slug !== "man-shoes").map((x) => x.slug),
    [MAN_TABS]
  );

  const WOMAN_SHOE_SLUGS = useMemo(
    () => WOMAN_TABS.filter((x) => x.slug !== "woman-shoes").map((x) => x.slug),
    [WOMAN_TABS]
  );

  const categoryIdsForQuery = useMemo(() => {
    if (!categories?.length || !category) return [];

    if (category === "man-shoes") {
      return categories
        .filter((c) => MAN_SHOE_SLUGS.includes(c.slug?.current))
        .map((c) => c._id);
    }

    if (category === "woman-shoes") {
      return categories
        .filter((c) => WOMAN_SHOE_SLUGS.includes(c.slug?.current))
        .map((c) => c._id);
    }

    const one = categories.find((c) => c.slug?.current === category);
    return one ? [one._id] : [];
  }, [categories, category, MAN_SHOE_SLUGS, WOMAN_SHOE_SLUGS]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setErr("");

      try {
        if (!category) {
          setItems([]);
          return;
        }

        const isViewAll =
          category === "man-shoes" || category === "woman-shoes";

        if (!isViewAll && categoryIdsForQuery.length === 0) {
          setItems([]);
          return;
        }

        const SHOES_QUERY = `*[_type == "shoes" && references($catIds)]{
          _id,
          title_en, title_az, title_ru,
          description_en, description_az, description_ru,
          price,
          "slug": slug.current, sku,
          mainImage,
          additionalImage,
          categories,
          _updatedAt
        } | order(_updatedAt desc)`;

        const shoes = await client.fetch(SHOES_QUERY, {
          catIds: categoryIdsForQuery,
        });

        setItems(shoes || []);
      } catch (error) {
        setErr(error?.message || String(error));
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [category, categoryIdsForQuery]);

  const onTabClick = (slug) => {
    navigate(getLocalizedPath(`/category/${slug}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topItems = useMemo(() => (items || []).slice(0, 6), [items]);
  const restItems = useMemo(() => (items || []).slice(6), [items]);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Danilov", url: `https://danilov.az/${language}` },
    {
      name: group === "man" ? t.nav.man : t.nav.woman,
      url: `https://danilov.az/${language}/category/${group}-shoes`,
    },
    ...(category !== `${group}-shoes`
      ? [{ name: pageTitle, url: `https://danilov.az${location.pathname}` }]
      : []),
  ]);

  // Generate item list schema for products
  const itemListSchema =
    !loading && items.length > 0
      ? generateItemListSchema(items, language, pageTitle)
      : null;

  const pageSchema = combineSchemas(
    organizationSchema,
    breadcrumbSchema,
    itemListSchema
  );

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        lang={language}
        path={location.pathname}
        schema={pageSchema}
      />
      <section className="w-full">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-sm tracking-[0.32em] uppercase text-black">
              {pageTitle}
            </h1>

            {tabs.length > 0 &&
              category !== "man-accessories" &&
              category !== "man-clothes" && (
                <nav
                  className="hidden md:block max-w-[75%] overflow-x-auto"
                  aria-label="Category navigation"
                >
                  <div className="flex items-center gap-6 text-xs whitespace-nowrap justify-end pb-2 pr-2">
                    {tabs.map((tab) => {
                      const active = tab.slug === category;
                      return (
                        <button
                          key={tab.slug}
                          type="button"
                          onClick={() => onTabClick(tab.slug)}
                          className={[
                            "transition cursor-pointer",
                            active
                              ? underlineClass
                              : "text-black/70 hover:text-black",
                          ].join(" ")}
                          aria-current={active ? "page" : undefined}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </nav>
              )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-black/70">
              {loading
                ? t.categoryCollection.loading
                : `${items.length} ${t.categoryCollection.products}`}
            </div>
          </div>

          {err ? <div className="mt-6 text-sm text-red-600">{err}</div> : null}

          <div className="mt-8">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <div className="hidden lg:block lg:col-start-4 lg:row-start-1 lg:col-span-2 lg:row-span-2">
                  <div className="w-full h-full bg-black/5 overflow-hidden">
                    <img
                      src={heroImage}
                      alt={getCategoryAltText(group, language)}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>

                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductCard key={idx} loading />
                ))}

                {Array.from({ length: 5 }).map((_, idx) => (
                  <ProductCard key={`b-${idx}`} loading />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-sm text-black/60 mt-8">
                {t.categoryCollection.noProducts}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <div className="hidden lg:block lg:col-start-4 lg:row-start-1 lg:col-span-2 lg:row-span-2">
                  <div className="w-full h-full bg-black/5 overflow-hidden">
                    <img
                      src={heroImage}
                      alt={getCategoryAltText(group, language)}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>

                {topItems.map((p) => (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() =>
                      p.sku && navigate(getLocalizedPath(`/product/${p.sku}`))
                    }
                    className="text-left"
                  >
                    <ProductCard product={p} />
                  </button>
                ))}

                {restItems.map((p) => (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() =>
                      p.sku && navigate(getLocalizedPath(`/product/${p.sku}`))
                    }
                    className="text-left"
                  >
                    <ProductCard product={p} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-16" />
        </div>
      </section>
    </>
  );
}
