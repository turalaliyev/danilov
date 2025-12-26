import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function SubscribeSection() {
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Формируем сообщение для WhatsApp
    const text = `Hello! I am interested in: ${gender || "General inquiry"}`;
    const encodedText = encodeURIComponent(text);
    
    // Ваш номер телефона (замените на нужный)
    const phoneNumber = "YOUR_PHONE_NUMBER"; 
    
    // Ссылка для WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Переход в WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      className="subscribe-section relative py-20 px-4 md:px-8 flex items-center justify-center min-h-[500px] bg-[#d3d3d3]"
    >
      <div className="subscribe-card w-full max-w-[800px] bg-white p-12 md:p-16 shadow-2xl">
        <h2 className="text-2xl uppercase mb-6 tracking-widest text-center font-medium">
          Contact us on WhatsApp
        </h2>
        <p className="text-sm text-black/60 mb-10 leading-relaxed text-center max-w-lg mx-auto">
          Get in touch with us directly for exclusive offers, new collection updates, and personalized service.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-lg mx-auto">
          
          {/* Gender / Interest Selection */}
          <div className="gender-selection mt-2">
             <span className="block text-sm mb-4 font-normal text-black/80 text-center">I am interested in:</span>
             <div className="flex flex-col gap-3 items-center">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Men's Collection"
                      checked={gender === "Men's Collection"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-black checked:border-black transition-all"
                    />
                  </div>
                  Men's Collection
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Women's Collection"
                      checked={gender === "Women's Collection"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-black checked:border-black transition-all"
                    />
                  </div>
                  Women's Collection
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-light hover:opacity-70 transition-opacity">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other Inquiry"
                      checked={gender === "Other Inquiry"}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer appearance-none w-4 h-4 border border-black rounded-full checked:bg-black checked:border-black transition-all"
                    />
                  </div>
                  Other Inquiry
                </label>
             </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-10 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-black/80 transition-all flex items-center gap-3"
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
