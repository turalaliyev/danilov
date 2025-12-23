export default function PromoGrid() {
  const promos = [
    { title: "Boots For Him", link: "#", image: "https://placeholder.pics/svg/600x500" },
    { title: "Boots Edit", link: "#", image: "https://placeholder.pics/svg/600x500" },
    { title: "Women's Accessories", link: "#", image: "https://placeholder.pics/svg/600x500" },
    { title: "Men's Accessories", link: "#", image: "https://placeholder.pics/svg/600x500", linkText: "View All" },
  ];

  return (
    <section className="promo-grid flex flex-wrap gap-0">
      {promos.map((promo, index) => (
        <div key={index} className="promo-item relative flex-1 basis-1/2 min-w-[50%] h-[500px]">
          <img
            src={promo.image}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          <div className="promo-overlay absolute inset-0 flex flex-col items-center justify-center text-white uppercase bg-black/30 text-center">
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

