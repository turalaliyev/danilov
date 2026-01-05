import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import LanguageContext from "../context/LanguageContext";
import { client } from "../sanity/clients";
import { urlFor } from "../sanity/image";

function getLocalizedTitle(item, lang) {
  if (!item) return "";
  if (lang === "az")
    return item.title_az || item.title_en || item.title_ru || "";
  if (lang === "ru")
    return item.title_ru || item.title_en || item.title_az || "";
  return item.title_en || item.title_az || item.title_ru || "";
}

export default function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const inputRef = useRef(null);
  const reqIdRef = useRef(0);

  const close = () => {
    // reset here (event handler), NOT inside useEffect
    setQuery("");
    setItems([]);
    setErr("");
    setLoading(false);
    onClose?.();
  };

  // focus input on mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1 second debounce search
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
            price,
            "slug": slug.current,
            mainImage
          } | order(_createdAt desc)[0...24]`;

          const shoes = await client.fetch(SHOES_QUERY, { q: `*${q}*` });

          // ignore late responses
          if (myReqId !== reqIdRef.current) return;

          setItems(Array.isArray(shoes) ? shoes : []);
        } catch (e) {
          console.log(e);
          if (myReqId !== reqIdRef.current) return;
          setErr("Search failed. Please try again.");
        } finally {
          if (myReqId === reqIdRef.current) setLoading(false);
        }
      };

      run();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  const hintText = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return "Type at least 2 letters";
    if (loading) return "Searching...";
    return `${items.length} results`;
  }, [query, loading, items.length]);

  const onItemClick = (slug) => {
    close();
    // change route if you don’t have /product/:slug
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-999">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        onClick={close}
        className="absolute inset-0 bg-black/35"
      />

      {/* Panel */}
      <div
        className="relative mx-auto w-full max-w-350 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="border-b border-black/10">
          <div className="px-6 lg:px-10 pt-6 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs tracking-[0.35em] uppercase text-black/60">
                Search
              </div>

              <button
                type="button"
                onClick={close}
                className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
                aria-label="Close"
              >
                <HiXMark className="size-6 text-black/60" />
              </button>
            </div>

            <div className="mt-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shoes..."
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
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-6 lg:px-10 py-6 max-h-[75vh] overflow-auto">
          {err ? <div className="text-sm text-red-600">{err}</div> : null}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="aspect-4/3 bg-black/5" />
                  <div className="h-4 bg-black/5 mt-5 w-3/4" />
                  <div className="h-4 bg-black/5 mt-2 w-1/3" />
                </div>
              ))}
            </div>
          ) : query.trim().length < 2 ? (
            <div className="text-sm text-black/60">
              Start typing to search by title.
            </div>
          ) : items.length === 0 ? (
            <div className="text-sm text-black/60">No results found.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
              {items.map((p) => {
                const title = getLocalizedTitle(p, language);
                const img = p.mainImage
                  ? urlFor(p.mainImage).width(900).height(700).url()
                  : null;

                return (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() => onItemClick(p.slug)}
                    className="text-left group"
                  >
                    <div className="aspect-4/3 bg-black/5 overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={title || "Product"}
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition"
                          loading="lazy"
                        />
                      ) : null}
                    </div>

                    <div className="mt-2 text-[14px] text-black/90 flex justify-between gap-3">
                      <div className="min-w-0 truncate">{title}</div>
                      {p.price != null && (
                        <div className="text-[14px] text-black/80 whitespace-nowrap">
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
      </div>
    </div>
  );
}
