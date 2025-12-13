import CraftDetail from "../assets/craft.jpg";

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="border-t border-black/10">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden border border-black/10 bg-white/60">
            <img
              src={CraftDetail}
              alt="Craft detail"
              className="w-full h-105 object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-black/60">
              Craftsmanship
            </div>
            <h3 className="mt-2 font-display text-3xl md:text-4xl">
              Built to age beautifully
            </h3>
            <p className="mt-4 text-sm md:text-base text-black/60 leading-relaxed">
              Each pair is designed around balance: clean proportions, rich
              leather, and a finish that looks even better after months of wear.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-white/60 p-5">
                <div className="font-display text-xl">Leather</div>
                <div className="mt-1 text-sm text-black/60">
                  Selected for depth, texture, and longevity.
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/60 p-5">
                <div className="font-display text-xl">Finish</div>
                <div className="mt-1 text-sm text-black/60">
                  Polished by detail, never overstated.
                </div>
              </div>
            </div>

            <a
              href="#lookbook"
              className="mt-7 inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink text-paper text-sm tracking-wide hover:opacity-90 transition"
            >
              Explore the lookbook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
