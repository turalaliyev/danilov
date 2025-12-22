import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-xs tracking-[0.4em] uppercase text-black/60">
        Danilov
      </div>

      <h1 className="mt-3 font-display text-4xl md:text-5xl">
        404 — Page not found
      </h1>

      <p className="mt-4 text-sm md:text-base text-black/60 max-w-xl leading-relaxed">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center h-11 px-6 rounded-full bg-ink text-paper text-sm tracking-wide hover:opacity-90 transition"
        >
          Go home
        </Link>

        <Link
          to="/category/man"
          className="inline-flex items-center h-11 px-6 rounded-full border border-black/15 text-sm tracking-wide hover:bg-black/5 transition"
        >
          Browse categories
        </Link>
      </div>
    </main>
  );
}
