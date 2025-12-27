import { useMemo } from "react";
import Hero from "../components/Hero.jsx";
import CollectionSection from "../components/CollectionSection.jsx";
import PromoGrid from "../components/PromoGrid.jsx";
import AboutSection from "../components/AboutSection.jsx";
import AnthologySection from "../components/AnthologySection.jsx";
import SubscribeSection from "../components/SubscribeSection.jsx";

import Img1 from "../assets/test_images/IMG-20221227-WA0004.jpg";
import Img2 from "../assets/test_images/IMG-20230917-WA0003.jpg";
import Img3 from "../assets/test_images/IMG-20231007-WA0009.jpg";
import Img4 from "../assets/test_images/IMG-20231007-WA0015.jpg";
import Img5 from "../assets/test_images/IMG-20231007-WA0016.jpg";
import Img6 from "../assets/test_images/IMG-20240125-WA0031.jpg";
import Img7 from "../assets/test_images/IMG-20240904-WA0014.jpg";
import Img8 from "../assets/test_images/IMG-20240910-WA0009.jpg";
import Img9 from "../assets/test_images/IMG-20241031-WA0020.jpg";
import Img10 from "../assets/test_images/IMG-20241031-WA0031.jpg";
import Img11 from "../assets/test_images/Screenshot_20220922-000815_Instagram.jpg";
import Img12 from "../assets/test_images/Screenshot_20220922-000838_Instagram.jpg";
import Img13 from "../assets/test_images/Screenshot_20220922-000909_Instagram.jpg";
import Img14 from "../assets/test_images/Screenshot_20220922-001024_Instagram.jpg";
import Img15 from "../assets/test_images/Screenshot_20220922-001040_Instagram.jpg";
import Img16 from "../assets/test_images/Screenshot_20220922-001137_Instagram.jpg";
import Img17 from "../assets/test_images/Screenshot_20220922-001146_Instagram.jpg";
import Img18 from "../assets/test_images/Screenshot_20220922-001203_Instagram.jpg";
import Img19 from "../assets/test_images/Screenshot_20220922-001602_Instagram.jpg";
import Img20 from "../assets/test_images/Screenshot_20220922-002132_Instagram.jpg";
import Img21 from "../assets/test_images/Screenshot_20220922-005341_Instagram.jpg";
import Img22 from "../assets/test_images/Screenshot_20220922-005612_Instagram.jpg";
import Img23 from "../assets/test_images/Screenshot_20220922-005757_Instagram.jpg";
import Img24 from "../assets/test_images/Screenshot_20220922-005904_Instagram.jpg";
import Img25 from "../assets/test_images/Screenshot_20220922-005907_Instagram.jpg";

export default function HomePage() {
  const testImages = useMemo(
    () => [
      Img1,
      Img2,
      Img3,
      Img4,
      Img5,
      Img6,
      Img7,
      Img8,
      Img9,
      Img10,
      Img11,
      Img12,
      Img13,
      Img14,
      Img15,
      Img16,
      Img17,
      Img18,
      Img19,
      Img20,
      Img21,
      Img22,
      Img23,
      Img24,
      Img25,
    ],
    []
  );

  const pick = (seed) => {
    // stable random within one page load; changes after reload
    const idx = Math.floor(Math.random() * 1_000_000 + seed) % testImages.length;
    return testImages[idx];
  };

  const mensProducts = [
    {
      name: "Men's blue suede hiking boot",
      price: "US$ 1.250",
      image: pick(10),
    },
    {
      name: "Blue cashmere beanie",
      price: "US$ 490",
      image: pick(11),
    },
    {
      name: "Men's black leather boot with fur",
      price: "US$ 1.300",
      image: pick(12),
    },
    {
      name: "Blue tumbled leather bag",
      price: "US$ 3.680",
      image: pick(13),
    },
    {
      name: "Men's grey suede desert boot",
      price: "US$ 1.060",
      image: pick(14),
    },
    {
      name: "Brown suede adjustable belt",
      price: "US$ 460",
      image: pick(15),
    },
  ];

  const womensProducts = [
    {
      name: "Women's brown leather lace‑up with fur",
      price: "US$ 1.060",
      image: pick(100),
    },
    {
      name: "Beige fur bucket hat",
      price: "US$ 1.240",
      image: pick(101),
    },
    {
      name: "Women's beige suede ankle boot",
      price: "US$ 1.100",
      image: pick(102),
    },
    {
      name: "Black leather gloves",
      price: "US$ 660",
      image: pick(103),
    },
    {
      name: "Women's black suede desert boot",
      price: "US$ 1.040",
      image: pick(104),
    },
    {
      name: "Black tumbled leather shoulder bag",
      price: "US$ 3.020",
      image: pick(105),
    },
  ];

  return (
    <main>
      <Hero />
      
      <CollectionSection
        title="Shop the Men's Collection"
        description="Ruggedly refined hiking‑inspired boots crafted in handsome leathers and soft shearling along with masterful leather weekend bags balance modernity and artisanal depth."
        products={mensProducts}
        image={pick(1)}
      />

      <CollectionSection
        title="Shop the Women's Collection"
        description="Stacked heel shearling knee‑high boots and polished lace‑up trekking styles deliver sporty sophistication. Accessories convey warmth and beauty."
        products={womensProducts}
        image={pick(2)}
        reverse={true}
      />
      <PromoGrid />

      <AboutSection />

      <AnthologySection />

      <SubscribeSection />
    </main>
  );
}




