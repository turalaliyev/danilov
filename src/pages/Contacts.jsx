import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../sanity/image";

import { client } from "../sanity/clients";

export default function Contacts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const navigate = useNavigate();

  const WHATSAPP_NUMBER = data?.phone_number || "+994556746674";

  const mapSrc = useMemo(() => {
    const loc = data?.location ? encodeURIComponent(data.location) : "";
    return `https://www.google.com/maps?q=${loc}&output=embed`;
  }, [data?.location]);

  const waLink = useMemo(() => {
    const onlyDigits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    return `https://wa.me/${onlyDigits}`;
  }, [WHATSAPP_NUMBER]);

  if (loading) {
    return (
      <section className="w-full">
        <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
          <div className="flex items-start justify-between gap-6">
            <div className="h-8 w-32 bg-black/5 animate-pulse" />
            <div className="h-6 w-16 bg-black/5 animate-pulse" />
          </div>

          <div className="mt-10 grid lg:grid-cols-[1fr_520px] gap-10">
            <div className="bg-black/5 aspect-16/11 animate-pulse" />
            <div className="bg-black/5 aspect-16/11 animate-pulse" />
          </div>

          <div className="h-16" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="max-w-350 mx-auto px-6 lg:px-10 pt-8">
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-[28px] leading-none tracking-wide font-semibold">
            Find Us
          </h1>

          <div className="flex items-center gap-6 text-sm whitespace-nowrap">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-black/70 hover:text-black transition"
            >
              Back
            </button>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_520px] gap-10">
          <div>
            <div className="bg-black/5 overflow-hidden">
              <div className="aspect-16/11">
                {data?.locationImage ? (
                  <img
                    src={urlFor(data.locationImage).url()}
                    alt="Shop"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="px-10 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-green-700 transition-all flex items-center gap-3"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="bg-black/5 overflow-hidden">
              <div className="aspect-16/11">
                <iframe
                  title="Map"
                  src={mapSrc}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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

        <div className="h-16" />
      </div>
    </section>
  );
}
