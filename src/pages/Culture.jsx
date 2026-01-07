// src/pages/Culture.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";

// Test images - replace with your own images
import FamilyImg from "../assets/family.mp4";
import TerritoryImg from "../assets/territory.jpg";
import BeautyImg from "../assets/beauty.jpg";
import HumanismImg from "../assets/humanizm.jpg";

export default function Culture() {
    const { language } = useContext(LanguageContext);
    const t = translations[language] || translations.en;
    const navigate = useNavigate();

    const sections = [
        {
            id: "family",
            subheading: t.culturePage?.subheading || "DANILOV IS",
            title: t.culturePage?.family?.title || "A FAMILY",
            text: t.culturePage?.family?.text || "Business, art and family are one. Danilov is a virtuous example of this approach. It is a family business, rooted in the territory, which feeds on the genius loci to restore value, in turn, creating beauty.",
            image: FamilyImg,
            imagePosition: "left",
        },
        {
            id: "territory",
            subheading: t.culturePage?.subheading || "DANILOV IS",
            title: t.culturePage?.territory?.title || "A PATRON OF TERRITORY",
            text: t.culturePage?.territory?.text || "The territory is important for Danilov: it is the place where everything starts, exactly as evolution is rooted in tradition. What has been is a stimulus to do better and better, rooting manual skills and knowledge in the current time. Thanks to this philosophy, Danilov artisans are able to create valuable objects, combining tradition and innovation and conveying to each product an unmistakable identity.",
            image: TerritoryImg,
            imagePosition: "right",
        },
        {
            id: "beauty",
            subheading: t.culturePage?.subheading || "DANILOV IS",
            title: t.culturePage?.beauty?.title || "A MAKER OF BEAUTY",
            text: t.culturePage?.beauty?.text || "Danilov creates beauty through the hands, relying on the unique knowledge, handed down for generations, of artisans who are artists at the same time. In Danilov, the hand is everything: it shapes, moulds, colors and finally gives an unrepeatable identity to every object. The hand is the reason why Danilov is a manufacturer. The hand creates objects that are real, designed to last over time while capturing the spirit of the time. Beauty is the result but also the process: a unique way of making things.",
            image: BeautyImg,
            imagePosition: "left",
        },
        {
            id: "humanism",
            subheading: t.culturePage?.subheading || "DANILOV IS",
            title: t.culturePage?.humanism?.title || "A CHAMPION OF HUMANISM",
            text: t.culturePage?.humanism?.text || "Danilov is distinguished by an authentic humanism that is also the profoundly essence of the brand. The importance of the single individual is at the center of the company's philosophy. Danilov is a family. Enlarged, but united: a family, linked by human and true relationships. It is precisely the family structure that creates authenticity, and in this spirit Danilov strives for Beauty and invite customers to enjoy it, arousing positive feelings, raising the quality of everyday life, naturally.",
            image: HumanismImg,
            imagePosition: "right",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="px-4 sm:px-6 lg:px-10 py-6 flex items-center justify-between border-b border-black/10">
                <h1 className="text-xs tracking-[0.32em] uppercase text-black">
                    {t.nav?.culture || "Culture"} 
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
                <section key={section.id} className="flex flex-col lg:flex-row min-h-[80vh]">
                    {section.imagePosition === "left" ? (
                        <>
                            {/* Image Left */}
                            <div className="lg:w-1/2 h-[50vh] lg:h-auto">
                                {section.id === "family" ? (
                                    <video
                                        src={section.image}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={section.image}
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
                            {/* Image Right */}
                            <div className="lg:w-1/2 h-[50vh] lg:h-auto order-1 lg:order-2">
                                {section.id === "family" ? (
                                    <video
                                        src={section.image}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={section.image}
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
        </div>
    );
}
