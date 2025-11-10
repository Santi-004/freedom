import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselHome from "../components/CarouselHome";
import AOS from "aos";
import "aos/dist/aos.css";

function Index() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-AzulClaro">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="w-full p-4">
          <CarouselHome />
        </div>
      </main>

      {/* ======= Sección: Sobre Nosotros ======= */}
<section
  id="nosotros"  // 👈 este es el id
  className="sobrenosotros min-h-screen flex flex-col items-center justify-center bg-transparent text-gray-900"
  data-aos="fade-up"
>
  <h1 className="text-7xl font-extrabold text-center mb-12">Sobre Nosotros</h1>
  <p className="text-center text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed tracking-wide px-6">
    Somos una empresa dedicada a ofrecer los mejores servicios...
  </p>
</section>

{/* ======= Sección: Contactos ======= */}
<section
  id="contacto"  // 👈 este es el id
  className="contacto min-h-screen flex flex-col items-center justify-center bg-transparent text-gray-900"
  data-aos="fade-up"
  data-aos-delay="400"
>
  <h1 className="text-7xl font-extrabold text-center mb-12">Contactos</h1>
  <p className="text-center text-2xl md:text-3xl max-w-4xl leading-relaxed tracking-wide">
    📧 ejemplo@correo.com <br />
    ☎️ 123-456-789
  </p>
</section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;
