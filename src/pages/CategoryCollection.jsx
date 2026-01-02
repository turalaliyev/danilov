import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlFor } from "../sanity/image";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import CategoryContext from "../context/CategoryContext";
import { translations } from "../translations";

const underlineClass =
  "relative inline-block text-black after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[1px] after:w-full after:bg-black";

function titleFromSlug(slug, t) {
  if (!slug) return "";
  
  if (slug === "man-shoes") return `${t.categoryCollection.mens} ${t.categoryCollection.viewAll.toUpperCase()}`;
  if (slug === "woman-shoes") return `${t.categoryCollection.womens} ${t.categoryCollection.viewAll.toUpperCase()}`;
  
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
  let label = key ? t.categoryCollection[key] : slug.replace(/^(man-|woman-)/, "").replace(/-/g, " ");

  if (slug.startsWith("man-")) {
    return `${t.categoryCollection.mens} ${label.toUpperCase()}`;
  }
  if (slug.startsWith("woman-")) {
    return `${t.categoryCollection.womens} ${label.toUpperCase()}`;
  }
  return label.toUpperCase();
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
    () => MAN_TABS.filter((t) => t.slug !== "man-shoes").map((t) => t.slug),
    []
  );

  const WOMAN_SHOE_SLUGS = useMemo(
    () => WOMAN_TABS.filter((t) => t.slug !== "woman-shoes").map((t) => t.slug),
    []
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
      try {
        if (!category) {
          setItems([]);
          setLoading(false);
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
            "slug": slug.current,
            mainImage,
            additionalImage,
            categories
            } | order(_createdAt desc)`;

        const shoes = await client.fetch(SHOES_QUERY, {
          catIds: categoryIdsForQuery,
        });
        setItems(shoes);
      } catch (error) {
        setErr(error);
      }
      setLoading(false);
    };
    getData();
  }, [category, categoryIdsForQuery]);

  const onTabClick = (slug) => {
    navigate(`/category/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                {tabs.map((t) => {
                  const active = t.slug === category;
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => onTabClick(t.slug)}
                      className={[
                        "transition cursor-pointer",
                        active
                          ? underlineClass
                          : "text-black/70 hover:text-black",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-black/70">
            {loading ? t.categoryCollection.loading : `${items.length} ${t.categoryCollection.products}`}
          </div>
        </div>

        {err ? <div className="mt-6 text-sm text-red-600">{err}</div> : null}

        <div className="mt-8 grid lg:grid-cols-[1fr_520px] gap-10">
          <div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="aspect-4/3 bg-black /5" />
                    <div className="h-4 bg-black/5 mt-6 w-3/4" />
                    <div className="h-4 bg-black/5 mt-3 w-1/3" />
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-sm text-black/60">
                {t.categoryCollection.noProducts}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                {items.map((p) => {
                  const img = p.mainImage
                    ? urlFor(p.mainImage).width(900).height(700).url()
                    : null;

                  return (
                    <button
                      key={p._id}
                      type="button"
                      className="text-left group"
                    >
                      <div className="aspect-4/3 bg-black/5 overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={p.title || "Product"}
                            className="w-full h-full object-contain group-hover:scale-[1.02] transition"
                            loading="lazy"
                          />
                        ) : null}
                      </div>

                      <div className="mt-2 text-[14px] text-black/90 flex justify-between">
                        <div>{p.title_en}</div>
                        {p.price != null && (
                          <div className=" text-[14px] text-black/80">
                            {Number(p.price).toLocaleString()} AZN
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28 h-130 bg-black/5 overflow-hidden">
              <img
                src={heroImage}
                alt="Category visual"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="h-16" />
      </div>
    </section>
  );
}
