// src/pages/GiftCardPage.jsx
import { useContext, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

import GiftVideo from "../assets/gift_video.mp4";
import GiftImage from "../assets/gift.jpeg";

export default function GiftCardPage() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const WHATSAPP_NUMBER = "+994556746674";

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const sections = [
    {
      id: "perfect-gift",
      subheading: t.giftsPage?.subheading || "DANILOV GIFTS",
      title: t.giftsPage?.perfectGift?.title || "THE PERFECT GIFT",
      text:
        t.giftsPage?.perfectGift?.text ||
        "Give the gift of timeless elegance and exceptional craftsmanship. A Danilov gift card is more than just a present — it's an invitation to experience luxury, quality, and personal style. Whether for a special occasion or just because, let your loved ones choose from our exclusive collection of handcrafted shoes and accessories.",
      media: GiftVideo,
      mediaType: "video",
      imagePosition: "left",
    },
    {
      id: "unforgettable-experience",
      subheading: t.giftsPage?.subheading || "DANILOV GIFTS",
      title: t.giftsPage?.experience?.title || "AN UNFORGETTABLE EXPERIENCE",
      text:
        t.giftsPage?.experience?.text ||
        "With a Danilov gift card, you're giving more than beautiful shoes — you're offering a personalized journey of discovery. From classic elegance to contemporary designs, every piece in our collection tells a story of artisanal excellence. Let them find their perfect match and create memories that last a lifetime.",
      media: GiftImage,
      mediaType: "image",
      imagePosition: "right",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-10 py-6 flex items-center justify-between border-b border-black/10">
        <h1 className="text-xs tracking-[0.32em] uppercase text-black">
          {t.nav?.gifts || "Gifts"}
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs tracking-[0.24em] uppercase text-black/60 hover:text-black transition"
        >
          {t.header?.back || "Back"}
        </button>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <section
          key={section.id}
          className="flex flex-col lg:flex-row min-h-[80vh]"
        >
          {section.imagePosition === "left" ? (
            <>
              {/* Media Left */}
              <div className="lg:w-1/2 h-[50vh] lg:h-[120vh] relative">
                {section.mediaType === "video" ? (
                  <>
                    <video
                      ref={videoRef}
                      src={section.media}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={toggleMute}
                      className="absolute top-6 left-6 w-16 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <HiVolumeOff className="text-2xl" />
                      ) : (
                        <HiVolumeUp className="text-2xl" />
                      )}
                    </button>
                  </>
                ) : (
                  <img
                    src={section.media}
                    alt={section.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              {/* Text Right */}
              <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 xl:p-24">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.24em] text-black/50 uppercase mb-4">
                    {section.subheading}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide mb-8">
                    {section.title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-black/70 font-light">
                    {section.text}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Text Left */}
              <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.24em] text-black/50 uppercase mb-4">
                    {section.subheading}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide mb-8">
                    {section.title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-black/70 font-light">
                    {section.text}
                  </p>
                </div>
              </div>
              {/* Media Right */}
              <div className="lg:w-1/2 h-[50vh] lg:h-auto order-1 lg:order-2 relative">
                {section.mediaType === "video" ? (
                  <>
                    <video
                      ref={videoRef}
                      src={section.media}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-6 right-6 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <HiVolumeOff className="text-2xl" />
                      ) : (
                        <HiVolumeUp className="text-2xl" />
                      )}
                    </button>
                  </>
                ) : (
                  <img
                    src={section.media}
                    alt={section.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </>
          )}
        </section>
      ))}

      {/* Contact Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-10 bg-white border-t border-black/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl uppercase tracking-wide mb-4">
            {t.contact?.titleGifts || "Contact Us"}
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-black/70 font-light mb-6">
            {t.giftsPage?.contactText ||
              "Have questions about gift cards? Contact us via WhatsApp or phone for assistance with your gift purchase."}
          </p>
          
          {/* Phone */}
          <div className="mb-6 flex justify-center">
            <a
              href="tel:+994556746674"
              className="flex items-center gap-2 text-black/70 hover:text-black transition-colors text-base"
            >
              <FaPhone className="text-base" />
              <span>Tel: +994 55 674 66 74</span>
            </a>
          </div>

          {/* WhatsApp Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-10 py-4 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all"
          >
            {t.contact?.chatOnWhatsApp || "Chat on WhatsApp"}
          </a>
        </div>
      </div>
    </div>
  );
}
