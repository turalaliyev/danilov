import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import CategoryContext from "../context/CategoryContext";
import { translations } from "../translations";
import ProductCard from "../components/ProductCard";

const underlineClass =
  "relative inline-block text-black after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[1px] after:w-full after:bg-black";

function titleFromSlug(slug, t) {
  if (!slug) return "";

  if (slug === "man-shoes")
    return `${t.categoryCollection.mens} ${t.categoryCollection.viewAll.toUpperCase()}`;
  if (slug === "woman-shoes")
    return `${t.categoryCollection.womens} ${t.categoryCollection.viewAll.toUpperCase()}`;

  const slugToKey = {
    "man-classic": "classic",
    "man-derby": "derby",
    "man-oxford": "oxford",
    "man-monk": "monk",
    "man-loafers": "loafers",
    "man-boots": "boots",
    "man-moccasins": "moccasins",
    "man-sports": "sports",
    "man-sandals": "sandals",
    "man-mules": "slippers",
    "woman-boots": "boots",
    "woman-high-heels": "highHeels",
    "woman-moccasins": "moccasins",
    "woman-sports": "sports",
    "woman-flat": "flatShoes",
    "woman-pumps": "pumps",
    "woman-sandals": "sandals",
    "woman-mules": "slippers",
  };

  const key = slugToKey[slug];
  let label = key
    ? t.categoryCollection[key]
    : slug.replace(/^(man-|woman-)/, "").replace(/-/g, " ");

  if (slug.startsWith("man-"))
    return `${t.categoryCollection.mens} ${String(label).toUpperCase()}`;
  if (slug.startsWith("woman-"))
    return `${t.categoryCollection.womens} ${String(label).toUpperCase()}`;
  return String(label).toUpperCase();
}

export default function CategoryCollection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { categories } = useContext(CategoryContext);
  const t = translations[language] || translations.en;

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
      { label: t.categoryCollection.flatShoes, slug: "woman-flat" },
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
    if (group === "man") return manCategory;
    if (group === "woman") return womanCategory;
    return manCategory;
  }, [group]);

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
          categories
        } | order(_createdAt desc)`;

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
    navigate(`/category/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topItems = useMemo(() => (items || []).slice(0, 6), [items]);
  const restItems = useMemo(() => (items || []).slice(6), [items]);

  return (
    <section className="w-full">
      <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-[28px] leading-none tracking-wide font-semibold">
            {titleFromSlug(category, t)}
          </h1>

          {tabs.length > 0 && (
            <div className="hidden md:block max-w-[75%] overflow-x-auto">
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
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
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
                    alt="Category visual"
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
                    alt="Category visual"
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
                  onClick={() => p.sku && navigate(`/product/${p.sku}`)}
                  className="text-left"
                >
                  <ProductCard product={p} />
                </button>
              ))}

              {restItems.map((p) => (
                <button
                  key={p._id}
                  type="button"
                  onClick={() => p.sku && navigate(`/product/${p.sku}`)}
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
  );
}
