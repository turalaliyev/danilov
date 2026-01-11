import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import LanguageContext from "../context/LanguageContext";
import { client } from "../sanity/clients";
import ProductCard from "../components/ProductCard";

export default function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  // ✅ Local i18n fallback (AZ / RU / EN) — no need to edit translations.js
  const i18n = useMemo(() => {
    const dict = {
      en: {
        title: "Search",
        placeholder: "Search shoes...",
        clear: "Clear",
        close: "Close",
        minChars: "Type at least 2 letters",
        searching: "Searching...",
        results: (count) => `${count} results`,
        startTyping: "Start typing to search by title.",
        noResults: "No results found.",
        error: "Search failed. Please try again.",
      },
      ru: {
        title: "Искать",
        placeholder: "Поиск обуви...",
        clear: "Очистить",
        close: "Закрыть",
        minChars: "Введите минимум 2 буквы",
        searching: "Поиск...",
        results: (count) => `Результатов: ${count}`,
        startTyping: "Начните вводить, чтобы искать по названию.",
        noResults: "Ничего не найдено.",
        error: "Ошибка поиска. Попробуйте ещё раз.",
      },
      az: {
        title: "Axtar",
        placeholder: "Ayaqqabı axtarın...",
        clear: "Təmizlə",
        close: "Bağla",
        minChars: "Ən az 2 hərf yazın",
        searching: "Axtarılır...",
        results: (count) => `${count} nəticə`,
        startTyping: "Başlığa görə axtarmaq üçün yazmağa başlayın.",
        noResults: "Nəticə tapılmadı.",
        error: "Axtarış xətası. Yenidən cəhd edin.",
      },
    };

    return dict[language] || dict.en;
  }, [language]);

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const inputRef = useRef(null);
  const reqIdRef = useRef(0);

  const close = () => {
    setQuery("");
    setItems([]);
    setErr("");
    setLoading(false);
    onClose?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const q = query.trim();

    if (q.length < 2) {
      setItems([]);
      setErr("");
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      const run = async () => {
        const myReqId = ++reqIdRef.current;
        setLoading(true);
        setErr("");

        try {
          const SHOES_QUERY = `*[_type == "shoes" && (
            title_en match $q ||
            title_az match $q ||
            title_ru match $q
          )]{
            _id,
            title_en, title_az, title_ru,
            description_en, description_az, description_ru,
            price,
            "slug": slug.current, sku,
            mainImage,
            additionalImage,
            categories
          } | order(_createdAt desc)[0...24]`;

          const shoes = await client.fetch(SHOES_QUERY, { q: `*${q}*` });

          if (myReqId !== reqIdRef.current) return;
          setItems(Array.isArray(shoes) ? shoes : []);
        } catch (e) {
          console.log(e);
          if (myReqId !== reqIdRef.current) return;
          setErr(i18n.error);
        } finally {
          if (myReqId === reqIdRef.current) setLoading(false);
        }
      };

      run();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, i18n.error]);

  const hintText = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return i18n.minChars;
    if (loading) return i18n.searching;
    return i18n.results(items.length);
  }, [query, loading, items.length, i18n]);

  const onItemClick = (sku) => {
    close();
    navigate(`/product/${sku}`);
  };

  return (
    <div className="fixed inset-0 z-999">
      <button
        type="button"
        aria-label={i18n.close}
        onClick={close}
        className="absolute inset-0 bg-black/35"
      />

      <div
        className="relative mx-auto w-full max-w-350 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-black/10">
          <div className="px-6 lg:px-10 pt-6 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs tracking-[0.35em] uppercase text-black/60">
                {i18n.title}
              </div>

              <button
                type="button"
                onClick={close}
                className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
                aria-label={i18n.close}
              >
                <HiXMark className="size-6 text-black/60" />
              </button>
            </div>

            <div className="mt-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={i18n.placeholder}
                className={[
                  "w-full bg-transparent outline-none",
                  "text-[22px] tracking-wide",
                  "placeholder:text-black/25",
                  "border-b border-black/20 focus:border-black/50",
                  "py-3",
                ].join(" ")}
              />

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-black/50">{hintText}</span>

                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-black/50 hover:text-black transition tracking-[0.18em] uppercase"
                  >
                    {i18n.clear}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-10 py-6 max-h-[75vh] overflow-auto">
          {err ? <div className="text-sm text-red-600">{err}</div> : null}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductCard key={idx} loading />
              ))}
            </div>
          ) : query.trim().length < 2 ? (
            <div className="text-sm text-black/60">{i18n.startTyping}</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-black/60">{i18n.noResults}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {items.map((p) => (
                <button
                  key={p._id}
                  type="button"
                  onClick={() => onItemClick(p.sku)}
                  className="text-left"
                >
                  <ProductCard product={p} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
