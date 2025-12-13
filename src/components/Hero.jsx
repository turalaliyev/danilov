import HeroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative text-white">
      <div className="relative overflow-hidden">
        {/* background image */}
        <div
          className="h-[70vh] min-h-130 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroImage})`,
          }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/20 to-black/35" />

        {/* content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-10 md:pb-14">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-xl text-paper">
                <div className="text-xs tracking-[0.4em] uppercase text-paper/80">
                  Winter Collection 2026
                </div>
                <h1 className="mt-3 font-display text-4xl md:text-6xl leading-[1.05]">
                  Crafted to feel timeless.
                </h1>
                <p className="mt-4 text-paper/80 text-sm md:text-base leading-relaxed">
                  Minimal silhouettes, rich materials, and comfort built into
                  every step. Explore Danilov’s signature shoes and essentials.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#new"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-paper text-ink text-sm tracking-wide hover:bg-white transition"
                  >
                    Shop New Arrivals
                  </a>
                  <a
                    href="#collections"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-paper/60 text-paper text-sm tracking-wide hover:bg-paper/10 transition"
                  >
                    View Collections
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      </div>
    </section>
  );
}
