import Hero from "../components/Hero.jsx";
import CollectionSection from "../components/CollectionSection.jsx";
import PromoGrid from "../components/PromoGrid.jsx";
import AboutSection from "../components/AboutSection.jsx";
import AnthologySection from "../components/AnthologySection.jsx";
import SubscribeSection from "../components/SubscribeSection.jsx";

export default function HomePage() {
  const mensProducts = [
    {
      name: "Men's blue suede hiking boot",
      price: "US$ 1.250",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Blue cashmere beanie",
      price: "US$ 490",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Men's black leather boot with fur",
      price: "US$ 1.300",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Blue tumbled leather bag",
      price: "US$ 3.680",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Men's grey suede desert boot",
      price: "US$ 1.060",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Brown suede adjustable belt",
      price: "US$ 460",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
  ];

  const womensProducts = [
    {
      name: "Women's brown leather lace‑up with fur",
      price: "US$ 1.060",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Beige fur bucket hat",
      price: "US$ 1.240",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Women's beige suede ankle boot",
      price: "US$ 1.100",
      image: "https://placeholder.pics/svg/300x340/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Black leather gloves",
      price: "US$ 660",
      image: "https://placeholder.pics/svg/400x495/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Women's black suede desert boot",
      price: "US$ 1.040",
      image: "https://placeholder.pics/svg/300x340/DEDEDE/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
    {
      name: "Black tumbled leather shoulder bag",
      price: "US$ 3.020",
      image: "https://placeholder.pics/svg/300x340/DEDEDE/DBDBDB-DBDBDB/DBDBDB-DBDBDB",
    },
  ];

  return (
    <main>
      <Hero />
      
      <CollectionSection
        title="Shop the Men's Collection"
        description="Ruggedly refined hiking‑inspired boots crafted in handsome leathers and soft shearling along with masterful leather weekend bags balance modernity and artisanal depth."
        products={mensProducts}
        image="https://placeholder.pics/svg/500x800/DBDBDB-DBDBDB/DBDBDB-DBDBDB"
      />

      <CollectionSection
        title="Shop the Women's Collection"
        description="Stacked heel shearling knee‑high boots and polished lace‑up trekking styles deliver sporty sophistication. Accessories convey warmth and beauty."
        products={womensProducts}
        image="https://placeholder.pics/svg/500x800/DBDBDB-DBDBDB/DBDBDB-DBDBDB"
        reverse={true}
      />
      <PromoGrid />

      <AboutSection />

      <AnthologySection />

      <SubscribeSection />
    </main>
  );
}




