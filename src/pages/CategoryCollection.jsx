import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlFor } from "../sanity/image";

import manCategory from "../assets/man_category.webp";
import womanCategory from "../assets/woman_category.jpg";
import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import CategoryContext from "../context/CategoryContext";

const MAN_TABS = [
  { label: "View All", slug: "man-shoes" },
  { label: "Classic", slug: "man-classic" },
  { label: "Derby", slug: "man-derby" },
  { label: "Oxford", slug: "man-oxford" },
  { label: "Monk", slug: "man-monk" },
  { label: "Loafers", slug: "man-loafers" },
  { label: "Boots", slug: "man-boots" },
  { label: "Moccasins", slug: "man-moccasins" },
  { label: "Sports", slug: "man-sports" },
  { label: "Sandals", slug: "man-sandals" },
  { label: "Slippers (Mules)", slug: "man-mules" },
];

const WOMAN_TABS = [
  { label: "View All", slug: "woman-shoes" },
  { label: "Boots", slug: "woman-boots" },
  { label: "High heels", slug: "woman-high-heels" },
  { label: "Moccasins", slug: "woman-moccasins" },
  { label: "Sports", slug: "woman-sports" },
  { label: "Flat shoes", slug: "woman-flat" },
  { label: "Pumps", slug: "woman-pumps" },
  { label: "Sandals", slug: "woman-sandals" },
  { label: "Slippers (Mules)", slug: "woman-mules" },
];

const underlineClass =
  "relative inline-block text-black after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[1px] after:w-full after:bg-black";

function titleFromSlug(slug) {
  if (!slug) return "";
  const clean = slug
    .replace(/^man-/, "")
    .replace(/^woman-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

  if (slug.startsWith("man-")) return `MEN'S ${clean.toUpperCase()}`;
  if (slug.startsWith("woman-")) return `WOMEN'S ${clean.toUpperCase()}`;
  return clean.toUpperCase();
}

export default function CategoryCollection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { categories } = useContext(CategoryContext);

  console.log(language);

  const group = useMemo(() => {
    if (category?.startsWith("man-")) return "man";
    if (category?.startsWith("woman-")) return "woman";
    return "other";
  }, [category]);

  const tabs = useMemo(() => {
    if (group === "man") return MAN_TABS;
    if (group === "woman") return WOMAN_TABS;
    return [];
  }, [group]);

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
            {titleFromSlug(category)}
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
            {loading ? "Loading..." : `${items.length} Products`}
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
                No products found for this category.
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
