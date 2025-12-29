// src/pages/GiftCardPage.jsx
import { useNavigate } from "react-router-dom";

// import giftForHim from "../assets/gift_for_him.jpg";
// import giftForHer from "../assets/gift_for_her.jpg";

export default function GiftCardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-sm tracking-[0.32em] uppercase text-black">
            Gift Cards
          </h1>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs tracking-[0.24em] uppercase text-black/60 hover:text-black transition"
          >
            Back
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => navigate("/gifts/him")}
            className="group text-left border border-black/10 hover:border-black/25 transition overflow-hidden"
          >
            <div className=" bg-black/5 overflow-hidden">
              <img
                src="https://i.etsystatic.com/10158652/r/il/e9267d/1320400492/il_794xN.1320400492_d0mh.jpg"
                alt="Gift cards for him"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="px-5 py-5">
              <div className="text-xs tracking-[0.32em] uppercase text-black/60">
                Danilov
              </div>
              <div className="mt-2 text-lg tracking-wide text-black">
                Gift Cards for Him
              </div>
              <div className="mt-2 text-sm text-black/60 leading-relaxed max-w-md">
                Choose a gift card tailored for him — timeless shoes.
              </div>

              <div className="mt-5 inline-flex items-center text-xs tracking-[0.28em] uppercase text-black/70 group-hover:text-black transition">
                Explore
                <span className="ml-2 translate-x-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate("/gifts/her")}
            className="group text-left border border-black/10 hover:border-black/25 transition overflow-hidden"
          >
            <div className="bg-black/5 overflow-hidden">
              <img
                src="https://i.etsystatic.com/10158652/r/il/e9267d/1320400492/il_794xN.1320400492_d0mh.jpg"
                alt="Gift cards for her"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="px-5 py-5">
              <div className="text-xs tracking-[0.32em] uppercase text-black/60">
                Danilov
              </div>
              <div className="mt-2 text-lg tracking-wide text-black">
                Gift Cards for Her
              </div>
              <div className="mt-2 text-sm text-black/60 leading-relaxed max-w-md">
                Choose a gift card tailored for her — refined classics and
                elegant styles.
              </div>

              <div className="mt-5 inline-flex items-center text-xs tracking-[0.28em] uppercase text-black/70 group-hover:text-black transition">
                Explore
                <span className="ml-2 translate-x-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
