import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";

const translations = {
  en: {
    greeting: "Hello! I am interested in:",
    generalInquiry: "General inquiry",
    mensCollection: "Men's Collection",
    womensCollection: "Women's Collection",
    otherInquiry: "Other Inquiry",
  },
  ru: {
    greeting: "Здравствуйте! Меня интересует:",
    generalInquiry: "Общий запрос",
    mensCollection: "Мужская коллекция",
    womensCollection: "Женская коллекция",
    otherInquiry: "Другой запрос",
  },
  az: {
    greeting: "Salam! Məni maraqlandırır:",
    generalInquiry: "Ümumi sorğu",
    mensCollection: "Kişi kolleksiyası",
    womensCollection: "Qadın kolleksiyası",
    otherInquiry: "Digər sorğu",
  },
};

export default function ContactSection() {
  const { language } = useLanguage();
  const [gender, setGender] = useState("");
  const t = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Получаем перевод выбранной опции
    let selectedOption = "";
    if (gender === "Men's Collection") {
      selectedOption = t.mensCollection;
    } else if (gender === "Women's Collection") {
      selectedOption = t.womensCollection;
    } else if (gender === "Other Inquiry") {
      selectedOption = t.otherInquiry;
    } else {
      selectedOption = t.generalInquiry;
    }
    
    // Формируем сообщение для WhatsApp на выбранном языке
    const text = `${t.greeting} ${selectedOption}`;
    const encodedText = encodeURIComponent(text);
    
    // Номер телефона 
    const phoneNumber = "+994556746674"; 
    
    // Ссылка для WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Переход в WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      className="contact-section relative py-20 px-4 md:px-8 flex items-center justify-center min-h-[500px] bg-[#d3d3d3]"
    >
      <div className="contact-card w-full max-w-[800px] bg-white p-12 md:p-16 shadow-2xl">
        <h2 className="text-2xl uppercase mb-6 tracking-widest text-center font-medium">
          Contact us on WhatsApp
        </h2>
        <p className="text-sm text-black/60 mb-10 leading-relaxed max-w-lg mx-auto">
          Get in touch with us directly for exclusive offers, new collection updates, and personalized service.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-lg mx-auto">
                    {/* Gender / Interest Selection */}
                    <div className="gender-selection mt-2">
             <div className="flex flex-row items-center gap-4 flex-wrap">
               <span className="text-sm font-normal text-black/80 whitespace-nowrap">I am interested in:</span>
               <div className="flex flex-row gap-6 items-center">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Men's Collection"
                      checked={gender === "Men's Collection"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-green-600 checked:border-green-600 transition-all"
                    />
                  </div>
                  {t.mensCollection}
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Women's Collection"
                      checked={gender === "Women's Collection"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-green-600 checked:border-green-600 transition-all"
                    />
                  </div>
                  {t.womensCollection}
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other Inquiry"
                      checked={gender === "Other Inquiry"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-green-600 checked:border-green-600 transition-all"
                    />
                  </div>
                  {t.otherInquiry}
                </label>
               </div>
             </div>
          </div>
        
          
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-10 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all flex items-center gap-3"
            >
              <FaWhatsapp size={16} />
              Chat on WhatsApp
            </button>
          </div>
          
        </form>
      </div>
    </section>
  );
}
