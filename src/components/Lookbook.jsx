const looks = [
  {
    title: "The city uniform",
    desc: "Oxford + dark tailoring. Simple, sharp, dependable.",
    img: "https://source.unsplash.com/ush_7RsBAGM/1600x1200",
  },
  {
    title: "Weekend polish",
    desc: "Loafer + light trousers. Relaxed, still refined.",
    img: "https://source.unsplash.com/QHOp95V_zqQ/1600x1200",
  },
];

export default function Lookbook() {
  return (
    <section id="lookbook" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-black/60">
            Lookbook
          </div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Styling, made effortless
          </h2>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {looks.map((l) => (
            <div
              key={l.title}
              className="relative rounded-3xl overflow-hidden border border-black/10 bg-white/60"
            >
              <img
                src={l.img}
                alt={l.title}
                className="w-full h-115 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-paper">
                <div className="font-display text-2xl tracking-wide">
                  {l.title}
                </div>
                <div className="mt-1 text-sm text-paper/80">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          id="stores"
          className="mt-12 rounded-3xl border border-black/10 bg-white/60 p-8"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-black/60">
            Stores
          </div>
          <div className="mt-2 font-display text-2xl">
            Danilov Atelier • Baku
          </div>
          <p className="mt-3 text-sm text-black/60">
            Book a fitting, discover materials, and find your timeless pair.
          </p>
        </div>
      </div>
    </section>
  );
}
