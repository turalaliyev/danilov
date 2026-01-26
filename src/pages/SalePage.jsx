import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import CategoryContext from "../context/CategoryContext";
import { translations } from "../translations";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import {
  organizationSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  combineSchemas,
} from "../seo/schema";

export default function SalePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, getLocalizedPath } = useContext(LanguageContext);
  const { categories } = useContext(CategoryContext);
  const t = translations[language] || translations.en;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Find the "sale" category ID
  const saleCategoryId = useMemo(() => {
    if (!categories?.length) return null;
    const saleCategory = categories.find(
      (c) => c.slug?.current === "sale" || c.title?.toLowerCase() === "sale"
    );
    return saleCategory?._id || null;
  }, [categories]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setErr("");

      try {
        if (!saleCategoryId) {
          setItems([]);
          setLoading(false);
          return;
        }

        const SALE_QUERY = `*[_type == "shoes" && references($saleCategoryId)]{
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

        const products = await client.fetch(SALE_QUERY, {
          saleCategoryId,
        });

        setItems(products || []);
      } catch (error) {
        setErr(error?.message || String(error));
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [saleCategoryId]);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Danilov", url: `https://danilov.az/${language}` },
    { name: t.nav.sale, url: `https://danilov.az${location.pathname}` },
  ]);

  // Generate item list schema for products
  const itemListSchema =
    !loading && items.length > 0
      ? generateItemListSchema(items, language, t.nav.sale)
      : null;

  const pageSchema = combineSchemas(
    organizationSchema,
    breadcrumbSchema,
    itemListSchema
  );

  return (
    <>
      <SEO
        title={`${t.nav.sale} - Danilov`}
        description={`${t.nav.sale} - ${t.categoryCollection.products}`}
        lang={language}
        path={location.pathname}
        schema={pageSchema}
      />
      <section className="w-full">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-sm tracking-[0.32em] uppercase text-black">
              {t.nav.sale}
            </h1>
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
                {Array.from({ length: 10 }).map((_, idx) => (
                  <ProductCard key={idx} loading />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-sm text-black/60 mt-8">
                {t.categoryCollection.noProducts}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {items.map((p) => (
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
