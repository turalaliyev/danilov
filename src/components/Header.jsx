import { useEffect, useState } from "react";

const nav = [
  { label: "The Classics", href: "#classics" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Stores", href: "#stores" },
];

function IconButton({ children, label }) {
  return (
    <button
      aria-label={label}
      className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
      type="button"
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-black/10">
      <div className="px-8">
        <div className="h-24 flex items-center justify-between">
          <a href="#" className="text-center select-none">
            <div className="font-display text-2xl md:text-3xl tracking-[0.22em] uppercase">
              Danilov
            </div>
            <div className="text-[11px] tracking-[0.28em] text-black/60 uppercase">
              Shoes & Leather
            </div>
          </a>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-black/5"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-6 text-sm">
              {nav.map((i) => (
                <a
                  key={i.label}
                  href={i.href}
                  className="tracking-wide hover:opacity-70 transition"
                >
                  {i.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              {/* Instagram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M17.6 6.7h.01"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              {/* Telegram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 5 3.8 12.1c-.7.3-.66 1.31.06 1.57l4.7 1.73 1.8 5.6c.22.68 1.09.84 1.53.29l2.7-3.4 4.9 3.64c.56.41 1.35.1 1.48-.58L22 5.9c.14-.78-.63-1.38-1.28-.9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.6 15.2 19.6 7.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
            >
              {/* Facebook */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8.5V7.2c0-.9.6-1.2 1.1-1.2H17V3h-2.6C12 3 11 4.6 11 6.8v1.7H9v3h2V21h3v-9.5h2.6l.4-3H14Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        className={[
          "md:hidden border-t border-black/10 bg-paper overflow-hidden",
          "transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-105 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="px-4 py-3 flex flex-col gap-2">
          {nav.map((i) => (
            <a
              key={i.label}
              href={i.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm tracking-wide border-b border-black/10 last:border-b-0"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="pb-3 flex justify-center items-center gap-1">
          {/* socials (same as you have) */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            {/* Instagram */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M17.6 6.7h.01"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            {/* Telegram */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 5 3.8 12.1c-.7.3-.66 1.31.06 1.57l4.7 1.73 1.8 5.6c.22.68 1.09.84 1.53.29l2.7-3.4 4.9 3.64c.56.41 1.35.1 1.48-.58L22 5.9c.14-.78-.63-1.38-1.28-.9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.6 15.2 19.6 7.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-black/5 transition"
          >
            {/* Facebook */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 8.5V7.2c0-.9.6-1.2 1.1-1.2H17V3h-2.6C12 3 11 4.6 11 6.8v1.7H9v3h2V21h3v-9.5h2.6l.4-3H14Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
