import { useRef } from "react";

export default function CollectionSection({ title, description, products, image, reverse = false }) {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector(".product-card");
    if (!card) return;
    const gap = 20;
    const cardWidth = card.offsetWidth + gap;
    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 gap-10 py-16 px-8 ${reverse ? "bg-paper/50" : ""}`}>
      <div className={`collection-image ${reverse ? "md:order-2" : ""}`}>
        <img
          src={image || "https://placeholder.pics/svg/600x500"}
          alt={`${title} collection`}
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>
      <div className={`collection-details flex flex-col justify-center ${reverse ? "md:order-1" : ""}`}>
        <h2 className="text-2xl md:text-3xl uppercase mb-4 tracking-wide">{title}</h2>
        <p className="text-sm text-black/60 max-w-[550px] mb-8 leading-relaxed">{description}</p>
        
        <div className="relative mt-8">
          <button
            className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 border-none bg-black/40 text-white flex items-center justify-center cursor-pointer text-lg z-10 hover:bg-black/60 transition"
            onClick={() => scrollSlider("prev")}
            aria-label="Previous"
          >
            ❮
          </button>
          
          <div
            ref={sliderRef}
            className="product-slider flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div key={index} className="product-card flex-shrink-0 min-w-[220px] bg-white border border-black/10 p-4 text-center">
                <img
                  src={product.image || "https://placeholder.pics/svg/300x200"}
                  alt={product.name}
                  className="w-full h-auto mb-2.5"
                />
                <h4 className="text-sm mb-1">{product.name}</h4>
                <span className="text-black/60 text-xs">{product.price}</span>
              </div>
            ))}
          </div>
          
          <button
            className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 border-none bg-black/40 text-white flex items-center justify-center cursor-pointer text-lg z-10 hover:bg-black/60 transition"
            onClick={() => scrollSlider("next")}
            aria-label="Next"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}

