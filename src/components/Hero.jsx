import HeroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative text-white">
      <div className="relative overflow-hidden">
        {/* background image */}
        <div
          className="h-[85vh] min-h-130 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroImage})`,
          }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

        {/* content */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
          <div className="text-white/90 relative z-10">
            <h1 className="text-4xl sm:text-3xl tracking-[2px] mb-2.5 uppercase font-bold drop-shadow-lg">
              One step higher
            </h1>
            <a
              href="#collections"
              className="inline-block px-8 py-3 border-2 border-black/90 uppercase text-sm hover:bg-black hover:text-white transition font-medium"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* subtle bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      </div>
    </section>
  );
}
