import Hero from "../components/Hero.jsx";
import ClassicGallery from "../components/ClassicGalery.jsx";
import Craftsmanship from "../components/Craftsmenship.jsx";
import Lookbook from "../components/Lookbook.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClassicGallery />
      <Craftsmanship />
      <Lookbook />
      <Newsletter />
    </main>
  );
}
