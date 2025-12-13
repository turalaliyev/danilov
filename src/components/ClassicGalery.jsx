import OxfordRefined from "../assets/oxford1.webp";
import OxfordBlack from "../assets/oxford2.webp";
import Loafer from "../assets/oxford3.webp";
import MinimalLoafer from "../assets/oxford4.jpg";
import DestToDinner from "../assets/oxford5.jpg";
import WarmBrown from "../assets/oxford6.jpg";
// test
const items = [
  {
    title: "Oxford, refined",
    desc: "Clean lines, sharp toe, understated confidence.",
    img: OxfordRefined,
  },
  {
    title: "Black Oxford",
    desc: "A formal classic for evening and ceremony.",
    img: OxfordBlack,
  },
  {
    title: "Loafer, effortless",
    desc: "Slip-on elegance with a modern silhouette.",
    img: Loafer,
  },
  {
    title: "Minimal loafer",
    desc: "Pure shape. Quiet luxury.",
    img: MinimalLoafer,
  },
  {
    title: "Desk-to-dinner",
    desc: "Classic leather that works with tailoring and denim.",
    img: DestToDinner,
  },
  {
    title: "Warm brown tones",
    desc: "Rich color that gets better with time.",
    img: WarmBrown,
  },
];

export default function ClassicGallery() {
  return (
    <section id="classics" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-black/60">
              Danilov
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              The Classics
            </h2>
            <p className="mt-3 text-sm text-black/60 max-w-2xl leading-relaxed">
              A quiet, classic wardrobe built around timeless shapes—Oxford,
              Derby, and Loafer—crafted for presence, not noise.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-3xl overflow-hidden border border-black/10 bg-white/60 hover:bg-white transition"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-sand/40">
                <img
                  src={it.img}
                  alt={it.title}
                  className="h-full w-full object-cover group-hover:scale-[1.06] transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-paper">
                  <div className="font-display text-xl tracking-wide">
                    {it.title}
                  </div>
                  <div className="mt-1 text-sm text-paper/80">{it.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
