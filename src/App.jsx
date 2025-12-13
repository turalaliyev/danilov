import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import ClassicGallery from "./components/ClassicGalery.jsx";
import Craftsmanship from "./components/Craftsmenship.jsx";
import Lookbook from "./components/Lookbook.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ClassicGallery />
        <Craftsmanship />
        <Lookbook />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
