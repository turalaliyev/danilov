import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function AnthologySection() {
  const sliderRef = useRef(null);

  const items = [
    { title: "Santoni Easy", image: "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Eclipse", image: "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Back to Business", image: "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Double Buckle Sneaker", image: "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
    { title: "Limited Edition", image: "https://placeholder.pics/svg/300x400/DBDBDB-DBDBDB/DBDBDB-DBDBDB" },
  ];

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 300; 
    sliderRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] gap-0">
      {/* Левая часть - Текст */}
      <div className="flex flex-col justify-center px-10 md:px-16 py-12 bg-[#f4f0eb]">
        <div className="max-w-md mx-auto md:mx-0 w-full">
          <h2 className="uppercase font-bold text-2xl leading-relaxed mb-4">
            Danilov anthology
          </h2>
          <p className="font-light text-sm text-black/70 mb-8 leading-relaxed">
            Discover the world of Santoni through creative vision, artisanal savoir-faire, and contemporary style.
          </p>
        </div>
      </div>

      {/* Правая часть - Слайдер с картинками */}
      <div className="flex flex-col bg-white overflow-hidden py-12 md:py-16">
        <div
          ref={sliderRef}
          className="flex-1 flex overflow-x-auto scroll-smooth scrollbar-hide gap-5 items-center w-full mb-6"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            paddingLeft: "calc(50% - 150px)" // Центрирование: 300px / 2 = 150px
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-none w-[300px] h-[400px] bg-gray-100 relative group cursor-pointer">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Кнопки навигации под карточками (по центру) */}
        <div className="flex justify-center gap-8">
          <button 
            onClick={() => scrollSlider('prev')} 
            className="p-1 text-black/40 hover:text-black/80 transition-colors"
          >
            <MdChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scrollSlider('next')} 
            className="p-1 text-black/40 hover:text-black/80 transition-colors"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>  
  );
}
