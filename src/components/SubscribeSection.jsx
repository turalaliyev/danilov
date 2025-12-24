import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, gender, consent1, consent2 });
  };

  return (
    <section
      className="subscribe-section relative py-20 px-8 bg-cover bg-center"
      style={{
        backgroundImage: "url(https://placeholder.pics/svg/1200x600)",
      }}
    >
      <div className="subscribe-card max-w-[500px] mx-auto bg-white/90 p-10">
        <h2 className="text-2xl uppercase mb-5 tracking-wide">Subscribe and Get 10% Off</h2>
        <p className="text-sm text-black/60 mb-5 leading-relaxed">
          Get to know our world and be the first to shop new collections or online exclusives and enjoy 10% off your first order.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm mt-2.5">
            * Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full p-2.5 my-2.5 border border-black/20"
          />
          
          <div className="gender my-2.5">
            <label className="inline-block mr-5 text-sm">
              <input
                type="radio"
                name="gender"
                value="man"
                checked={gender === "man"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-1.5"
              />
              Man
            </label>
            <label className="inline-block mr-5 text-sm">
              <input
                type="radio"
                name="gender"
                value="woman"
                checked={gender === "woman"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-1.5"
              />
              Woman
            </label>
            <label className="inline-block text-sm">
              <input
                type="radio"
                name="gender"
                value="na"
                checked={gender === "na"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-1.5"
              />
              Prefer not to say
            </label>
          </div>
          
          <div className="consent flex items-start my-2.5 text-xs text-black/60">
            <input
              type="checkbox"
              id="policy1"
              checked={consent1}
              onChange={(e) => setConsent1(e.target.checked)}
              className="mr-1.5 mt-0.5"
            />
            <label htmlFor="policy1">
              I have read and understood the privacy policy and I give my consent for the processing of my personal data for marketing purposes.
            </label>
          </div>
          
          <div className="consent flex items-start my-2.5 text-xs text-black/60">
            <input
              type="checkbox"
              id="policy2"
              checked={consent2}
              onChange={(e) => setConsent2(e.target.checked)}
              className="mr-1.5 mt-0.5"
            />
            <label htmlFor="policy2">
              I have read and understood the privacy policy and I give my consent for the processing of my personal data to receive personalized offers and services based on my preferences and habits.
            </label>
          </div>
          
          <button
            type="submit"
            className="mt-5 px-8 py-3 text-sm bg-black text-white border-none uppercase cursor-pointer hover:bg-black/90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

