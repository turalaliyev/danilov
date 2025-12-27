export default function PromoGrid() {
  // Use local test images (no external placeholders) so PromoGrid always renders.
  const testImages = Object.values(
    import.meta.glob("../assets/test_images/*.jpg", { eager: true, import: "default" })
  );

  const pick = (seed) => {
    if (!testImages.length) return undefined;
    const idx = Math.floor(Math.random() * 1_000_000 + seed) % testImages.length;
    return testImages[idx];
  };

  const promos = [
    { title: "Boots For Him", link: "/category/man-boots", image: pick(1) },
    { title: "Boots For Her", link: "/category/woman-boots", image: pick(2) },
    { title: "Men's Outwear", link: "/category/man-clothes", image: pick(3) },
    { title: "Men's Accessories", link: "/category/man-accessories", image: pick(4), linkText: "View All" },
  ];

  return (
    <section className="promo-grid flex flex-wrap gap-0">
      {promos.map((promo, index) => (
        <div 
          key={index} 
          className={`promo-item relative w-full md:w-1/2 h-[120vh] ${index % 2 === 0 ? 'md:pr-0.5' : 'md:pl-0.5'}`}
        >
          {promo.image ? (
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black/10" />
          )}
          <div className="promo-overlay absolute inset-0 flex flex-col items-center justify-center text-white uppercase text-center bg-black/30">
            <h3 className="text-2xl mb-2.5">{promo.title}</h3>
            <a href={promo.link} className="border-b border-white text-sm pb-1 hover:opacity-80 transition">
              {promo.linkText || "Shop Now"}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

