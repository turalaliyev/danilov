export default function PromoGrid() {
  const promos = [
    { title: "Boots For Him", link: "/category/man-boots", image: "https://placeholder.pics/svg/600x500/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Boots For Her", link: "/category/woman-boots", image: "https://placeholder.pics/svg/600x500/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Men's Outwear", link: "/category/man-clothes", image: "https://placeholder.pics/svg/600x500/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Men's Accessories", link: "/category/man-accessories", image: "https://placeholder.pics/svg/600x500/DBDBDB-DBDBDB/DBDBDB-DBDBDB", linkText: "View All" },
  ];

  return (
    <section className="promo-grid flex flex-wrap gap-0">
      {promos.map((promo, index) => (
        <div 
          key={index} 
          className={`promo-item relative w-full md:w-1/2 h-[120vh] ${index % 2 === 0 ? 'md:pr-0.5' : 'md:pl-0.5'}`}
        >
          <img
            src={promo.image}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          <div className="promo-overlay absolute inset-0 flex flex-col items-center justify-center text-white uppercase text-center">
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

