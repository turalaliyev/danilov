import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CollectionCard from "./CollectionCard";

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
    <section
      className={`grid grid-cols-1 md:grid-cols-2 md:min-h-[120vh] md:max-h-[120vh] overflow-hidden ${reverse ? "bg-paper/50" : ""}`}
    >
      {/* Big picture */}
      <div className={`collection-image w-full h-[50vh] md:h-full md:max-h-[120vh] ${reverse ? "md:order-2" : ""}`}>
        <img
          src={image || "https://placeholder.pics/svg/600x900/DBDBDB-DBDBDB/DBDBDB-DBDBDB"}
          alt={`${title} collection`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Other part - Flex Column Layout */}
      <div
        className={`collection-details flex flex-col w-full h-auto md:h-full md:max-h-[120vh] bg-[#f4f0eb] py-12 md:py-16 ${
          reverse ? "md:order-1" : ""
        }`}
      >

        {/* 1. Header (Title & Description) */}
        <div className="flex-none flex justify-center items-center mb-10">
          <div className="w-full">
            <h2 className="text-2xl font-extrabold md:text-3xl uppercase mb-5 tracking-[0.08em] text-center max-w-[400px] mx-auto">
              {title}
            </h2>
            <p className="text-sm font-light text-black/70 leading-relaxed w-[90%] md:max-w-[60%] mx-auto text-center">
              {description}
            </p>
          </div>
        </div>

        {/* 2. Slider (Takes available space) */}
        <div
          ref={sliderRef}
          className="product-slider flex-1 flex overflow-x-auto scroll-smooth scrollbar-hide items-center min-h-[450px] md:min-h-0"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            paddingLeft: "calc(50% - 175px)" // 350px / 2 = 175px
          }}
        >
          {products.map((product, index) => (
            <div key={index} className="flex-none">
              <CollectionCard product={product} />
            </div>
          ))}
        </div>
        
        {/* 3. Navigation Arrows (Bottom) */}
        <div className="flex-none flex justify-center gap-8 mt-10">
          <button 
            onClick={() => scrollSlider('prev')} 
            className="p-1 text-black/40 hover:text-black/80 transition-colors"
            aria-label="Previous products"
          >
            <MdChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scrollSlider('next')} 
            className="p-1 text-black/40 hover:text-black/80 transition-colors"
            aria-label="Next products"
          >
            <MdChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
