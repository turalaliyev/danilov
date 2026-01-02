import { useRef, useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import videoSrc from "../assets/v.mp4";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

export default function AnthologySection() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const tEn = translations.en; // Always use English for card titles
  const sliderRef = useRef(null);

  // Use local test images (no external placeholders) so AnthologySection always renders.
  const testImages = Object.values(
    import.meta.glob("../assets/test_images/*.jpg", { eager: true, import: "default" })
  );

  const pick = (seed) => {
    if (!testImages.length) return undefined;
    const idx = Math.floor(Math.random() * 1_000_000 + seed) % testImages.length;
    return testImages[idx];
  };

  const items = [
    { title: tEn.anthology.classic, video: videoSrc },
    { title: tEn.anthology.eclipse, image: pick(11) },
    { title: tEn.anthology.backToBusiness, image: pick(12) },
    { title: tEn.anthology.doubleBuckleSneaker, image: pick(13) },
    { title: tEn.anthology.limitedEdition, image: pick(14) },
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
            {t.anthology.title}
          </h2>
          <p className="font-light text-sm text-black/70 mb-8 leading-relaxed">
            {t.anthology.description}
          </p>
        </div>
      </div>

      {/* Правая часть - Слайдер с картинками */}
      <div className="flex flex-col bg-white overflow-hidden py-12 md:py-16">
        <div
          ref={sliderRef}
          className="flex-1 flex overflow-x-auto scroll-smooth scrollbar-hide gap-2 items-center w-full mb-6"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            paddingLeft: "calc(50% - 200px)" // Центрирование: 300px / 2 = 150px
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-none w-[300px] h-[400px] bg-gray-100 relative group cursor-pointer overflow-hidden">
              {item.video ? (
                <video 
                  src={item.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : item.image ? (
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-black/10" />
              )}
              {/* Overlay with title - centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white uppercase font-semibold text-lg md:text-lg tracking-wide text-center underline underline-offset-12">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки навигации под карточками (строго по центру под первой карточкой) */}
        <div 
          className="flex justify-center gap-8 relative"
          style={{ 
            width: "300px",
            left: "50%",
            transform: "translateX(calc(-150px - 50px))"
          }}
        >
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
