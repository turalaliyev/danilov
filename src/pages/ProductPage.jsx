import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../sanity/clients";
import { urlFor } from "../sanity/image";
import LanguageContext from "../context/LanguageContext";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { translations } from "../translations";

export default function ProductPage() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const i18n = useMemo(() => {
    const dict = {
      en: {
        back: "Back",
        notFoundTitle: "Product Not Found",
        notFoundText: "The product you're looking for doesn't exist.",
        goHome: "Go to Homepage",
        sku: "SKU",
        contact: "WhatsApp / Contact",
      },
      ru: {
        back: "Назад",
        notFoundTitle: "Товар не найден",
        notFoundText: "Товар, который вы ищете, не существует.",
        goHome: "На главную",
        sku: "SKU",
        contact: "WhatsApp / Контакт",
      },
      az: {
        back: "Geri",
        notFoundTitle: "Məhsul tapılmadı",
        notFoundText: "Axtardığınız məhsul mövcud deyil.",
        goHome: "Ana səhifəyə",
        sku: "SKU",
        contact: "WhatsApp / Əlaqə",
      },
    };
    return dict[language] || dict.en;
  }, [language]);

  const title = useMemo(() => {
    if (!product) return "";
    if (language === "az") return product.title_az || product.title_en || "";
    if (language === "ru") return product.title_ru || product.title_en || "";
    return product.title_en || product.title_az || product.title_ru || "";
  }, [language, product]);

  const categoryName = useMemo(() => {
    const c =
      product?.categories?.[0]?.slug ||
      product?.categories?.[0]?.slug?.current ||
      product?.categories?.[0]?.title ||
      "";
    if (!c) return "";
    return String(c).replace(/-/g, " ").toUpperCase();
  }, [product]);

  const mainImage = useMemo(() => product?.mainImage || null, [product]);

  const additionalImages = useMemo(() => {
    if (!product) return [];
    const imgs = [];
    if (product.additionalImage1) {
      if (Array.isArray(product.additionalImage1)) {
        imgs.push(...product.additionalImage1.filter(Boolean));
      } else {
        imgs.push(product.additionalImage1);
      }
    }
    if (product.additionalImage2) {
      if (Array.isArray(product.additionalImage2)) {
        imgs.push(...product.additionalImage2.filter(Boolean));
      } else {
        imgs.push(product.additionalImage2);
      }
    }
    return imgs;
  }, [product]);

  const allImages = useMemo(() => {
    const imgs = [];
    if (mainImage) imgs.push(mainImage);
    imgs.push(...additionalImages);
    return imgs;
  }, [mainImage, additionalImages]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [sku]);

  useEffect(() => {
    if (!allImages.length) return;
    if (selectedImageIndex > allImages.length - 1) setSelectedImageIndex(0);
  }, [allImages.length, selectedImageIndex]);

  const currentImageUrl = useMemo(() => {
    if (!allImages.length) return null;
    const img = allImages[selectedImageIndex] || allImages[0];
    if (!img) return null;
    return urlFor(img).width(1100).height(900).fit("max").url();
  }, [allImages, selectedImageIndex]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const INFO_QUERY = `*[_type == "info"]{
          _id,
          address,
          location,
          phone_number,
          locationImage
        }`;

        const info = await client.fetch(INFO_QUERY);
        setData(info?.[0] || null);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const fetchProduct = async () => {
    if (!sku) {
      setError("Product SKU is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const PRODUCT_QUERY = `*[_type == "shoes" && sku == $sku][0]{
        _id,
        title_en, title_az, title_ru,
        price,
        sku,
        mainImage,
        additionalImage1,
        additionalImage2,
        categories[]->{
          _id,
          title,
          "slug": slug.current
        }
      }`;

      const fetchedProduct = await client.fetch(PRODUCT_QUERY, { sku });

      if (!fetchedProduct) {
        setError("Product not found");
        setProduct(null);
      } else {
        setProduct(fetchedProduct);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err?.message || "Failed to load product");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku]);

  const goPrev = () => {
    if (!allImages.length) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    if (!allImages.length) return;
    setSelectedImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const WHATSAPP_NUMBER = data?.phone_number || "+994556746674";

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  if (loading) {
    return (
      <section className="w-full bg-[#f4f0eb]">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8 pb-16">
          <div className="animate-pulse">
            <div className="h-4 w-28 bg-black/10 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-10">
              <div>
                <div className="rounded-2xl bg-black/10 aspect-16/11 max-w-[760px]" />
                <div className="mt-4 w-full lg:w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-black/10 aspect-16/11" />
                    <div className="rounded-xl bg-black/10 aspect-16/11" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-black/10 p-8 h-fit">
                <div className="h-3 w-24 bg-white/20 mb-4" />
                <div className="h-10 w-3/4 bg-white/20 mb-4" />
                <div className="h-6 w-1/3 bg-white/20 mb-2" />
                <div className="h-3 w-40 bg-white/20 mb-8" />
                <div className="h-10 w-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="w-full bg-[#f4f0eb]">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8 pb-16">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-3">
              {i18n.notFoundTitle}
            </h1>
            <p className="text-black/60 mb-8">{error || i18n.notFoundText}</p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-black/15 hover:border-black/30 transition text-sm uppercase tracking-[0.14em]"
              >
                {i18n.back}
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-black text-white hover:bg-black/80 transition text-sm uppercase tracking-[0.14em]"
              >
                {i18n.goHome}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasAdditional = additionalImages.length > 0;
  const priceText =
    product.price != null ? Number(product.price).toLocaleString() : null;

  return (
    <section className="w-full bg-[#f4f0eb]">
      <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8 pb-16">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs uppercase tracking-[0.22em] text-black/60 hover:text-black transition"
          >
            ← {i18n.back}
          </button>

          {categoryName ? (
            <div className="text-xs uppercase tracking-[0.28em] text-black/40">
              {categoryName}
            </div>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_550px] gap-10 lg:gap-14">
          <div className="min-w-0">
            <div className="max-w-[760px]">
              <div className="relative rounded-2xl bg-white/60 border border-black/10 overflow-hidden shadow-sm">
                <div className="aspect-16/11">
                  {currentImageUrl ? (
                    <img
                      src={currentImageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-black/30">
                      No Image
                    </div>
                  )}
                </div>

                {allImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/25 hover:bg-white transition grid place-items-center shadow-sm"
                      aria-label="Previous image"
                    >
                      <HiChevronLeft className="size-5 text-black/70" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/25 hover:bg-white transition grid place-items-center shadow-sm"
                      aria-label="Next image"
                    >
                      <HiChevronRight className="size-5 text-black/70" />
                    </button>
                  </>
                ) : null}
              </div>

              {hasAdditional ? (
                <div className="mt-4 w-full lg:w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    {additionalImages.map((img, idx) => {
                      const realIndex = idx + 1;
                      const thumbUrl = urlFor(img)
                        .width(520)
                        .height(420)
                        .fit("max")
                        .url();
                      const active = realIndex === selectedImageIndex;

                      return (
                        <button
                          key={`${product._id}-add-${idx}`}
                          type="button"
                          onClick={() => setSelectedImageIndex(realIndex)}
                          className={[
                            "rounded-xl overflow-hidden bg-white/60 border shadow-sm",
                            "transition",
                            active
                              ? "border-black/40"
                              : "border-black/10 hover:border-black/25",
                          ].join(" ")}
                          aria-label={`Select image ${realIndex + 1}`}
                        >
                          <div className="aspect-16/11">
                            <img
                              src={thumbUrl}
                              alt={`${title} ${idx + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="min-w-0">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-[#121a1f] text-white border border-white/10 shadow-xl overflow-hidden">
                <div className="p-7 sm:p-8">
                  {product.sku ? (
                    <div className="mt-2 text-[12px] tracking-wide text-white/45">
                      {i18n.sku}: {product.sku}
                    </div>
                  ) : null}

                  <h1 className="mt-2 text-[34px] sm:text-[42px] leading-[1.05] tracking-wide font-semibold">
                    {title}
                  </h1>

                  {priceText ? (
                    <div className="mt-4 text-[18px] sm:text-[20px] text-white/90">
                      {priceText} <span className="text-white/55">AZN</span>
                    </div>
                  ) : null}

                  <div className="mt-10 flex justify-center">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-10 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all flex items-center gap-3"
                    >
                      {t.contact.chatOnWhatsApp}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
