export default function Newsletter() {
  return (
    <section className="border-t border-black/10">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-black/10 bg-white/60 p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-black/60">
                Subscribe
              </div>
              <h3 className="mt-2 font-display text-3xl">
                Private drops & early access
              </h3>
              <p className="mt-3 text-sm text-black/60 leading-relaxed">
                Get notified about limited releases, seasonal lookbooks, and
                store events.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Email address"
                className="h-12 w-full rounded-full border border-black/15 bg-paper px-5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                className="h-12 px-7 rounded-full bg-ink text-paper text-sm tracking-wide hover:opacity-90 transition"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
