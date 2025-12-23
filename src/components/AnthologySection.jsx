export default function AnthologySection() {
  const items = [
    { title: "Santoni Easy", image: "https://placeholder.pics/svg/400x300" },
    { title: "Eclipse", image: "https://placeholder.pics/svg/400x300" },
    { title: "Back to Business", image: "https://placeholder.pics/svg/400x300" },
    { title: "Double Buckle Sneaker", image: "https://placeholder.pics/svg/400x300" },
  ];

  return (
    <section className="anthology-section py-16 px-8">
      <h2 className="text-2xl uppercase mb-2.5 tracking-wide">Santoni Anthology</h2>
      <p className="text-sm text-black/60 mb-8 leading-relaxed">
        Discover the world of Santoni through creative vision, artisanal savoir‑faire, and contemporary style.
      </p>
      <div className="anthology-cards flex flex-wrap gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="anthology-card relative flex-1 basis-[calc(25%-20px)] min-w-[250px] h-[300px] bg-black/10 overflow-hidden uppercase"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2.5 left-2.5 text-white text-sm bg-black/40 px-2 py-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

