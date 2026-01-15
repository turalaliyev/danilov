import { useEffect, useMemo, useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { urlFor } from "../sanity/image";
import { FaPhone } from "react-icons/fa";

import { client } from "../sanity/clients";
import LanguageContext from "../context/LanguageContext";
import { translations } from "../translations";
import SEO from "../components/SEO";
import { getSeoMeta } from "../seo/metadata";
import { localBusinessSchema, organizationSchema, combineSchemas, generateBreadcrumbSchema } from "../seo/schema";

export default function Contacts() {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const t = translations[language] || translations.en;
  const seo = getSeoMeta("contacts", language);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const contactSectionRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const INFO_QUERY = `*[_type == "info"]{
          _id,
          address,
          location,
          phone_number,
          locationImage
        }`;

        const info = await client.fetch(INFO_QUERY);
        setData(info?.[0] || null);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  // Scroll to contact section if hash is present, otherwise scroll to top
  useEffect(() => {
    if (!loading) {
      if (location.hash === '#contact' && contactSectionRef.current) {
        setTimeout(() => {
          contactSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (!location.hash) {
        // Scroll to top when no hash is present
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.hash, loading]);

  const WHATSAPP_NUMBER = data?.phone_number || "+994556746674";

  const mapSrc = useMemo(() => {
    const loc = data?.location ? encodeURIComponent(data.location) : "";
    return `https://www.google.com/maps?q=${loc}&output=embed`;
  }, [data?.location]);

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Danilov", url: `https://danilov.az/${language}` },
    { name: t.footer.findUs, url: `https://danilov.az${location.pathname}` },
  ]);

  // Combine schemas
  const pageSchema = combineSchemas(organizationSchema, localBusinessSchema, breadcrumbSchema);

  // SEO-optimized alt texts
  const altTexts = {
    az: {
      store: "Danilov ayaqqabı mağazası Bakıda",
      map: "Danilov mağazasının xəritədə yeri",
    },
    ru: {
      store: "Магазин обуви Danilov в Баку",
      map: "Расположение магазина Danilov на карте",
    },
    en: {
      store: "Danilov shoe store in Baku",
      map: "Danilov store location on map",
    },
  };
  const alt = altTexts[language] || altTexts.en;

  if (loading) {
    return (
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          lang={language}
          path={location.pathname}
          schema={pageSchema}
        />
        <section className="w-full bg-white min-h-screen">
          <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
            <div className="flex items-start justify-between gap-6">
              <div className="h-8 w-32 bg-black/5 animate-pulse" />
              <div className="h-6 w-16 bg-black/5 animate-pulse" />
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-10">
              <div className="bg-black/5 aspect-4/3 animate-pulse" />
              <div className="bg-black/5 aspect-4/3 animate-pulse" />
            </div>

            <div className="h-16" />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        lang={language}
        path={location.pathname}
        schema={pageSchema}
      />
      <section className="w-full bg-white min-h-screen">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-sm tracking-[0.32em] uppercase text-black">
              {t.footer.findUs}
            </h1>

            <div className="flex items-center gap-6 text-sm whitespace-nowrap">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-black/70 hover:text-black transition"
              >
                {t.header.back}
              </button>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-10">
            <div className="order-1">
              <div className="bg-black/5 overflow-hidden">
                <div className="aspect-4/3">
                  {data?.locationImage ? (
                    <img
                      src={urlFor(data.locationImage).width(800).height(600).quality(85).url()}
                      alt={alt.store}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 order-2">
              <div className="bg-black/5 overflow-hidden">
                <div className="aspect-4/3">
                  <iframe
                    title={alt.map}
                    src={mapSrc}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>

              <div className="mt-4 text-sm text-black/70">
                <div className="tracking-wide">
                  {data?.address ? data.address : "Location"}
                </div>
                <div className="mt-2 text-black/60">Baku, Azerbaijan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div ref={contactSectionRef} className="mt-12 py-12 px-4 sm:px-6 lg:px-10 bg-[#d3d3d3]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide mb-4 text-black">
              {t.contact?.titleFindUs || "Contact Us"}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black/70 font-light mb-6">
              {t.contact?.findUsText ||
                "Have questions about our location or opening hours? Contact us via WhatsApp or phone for assistance and directions to our store."}
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
              {t.contact.chatOnWhatsApp}
            </a>
          </div>
        </div>

        <div className="h-8" />
      </section>
    </>
  );
}
