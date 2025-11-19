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

  // Scroll al elemento correspondiente al hashtag
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    };
    
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Asegurar que al abrir la home sin hash comience arriba de todo
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-AzulClaro">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="w-full">
          <CarouselHome />
        </div>
      </main>

      {/* ======= Sección: Sobre Nosotros ======= */}
<section
  id="nosotros"  // este es el id
  className="sobrenosotros min-h-screen flex flex-col items-center justify-center bg-transparent text-gray-900"
  data-aos="fade-up"
>
  <h1 className="text-7xl font-extrabold text-center mb-12">Sobre Nosotros</h1>
  <p className="text-center text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed tracking-wide px-6">
    Esta marca empezó con una idea de poder hacer que aquellas personas que quieran
expresar el amor de Jesús, lo pueden hacer a través de nuestra ropa.
Somos un grupo de 3 jóvenes buscando cambiar al mundo junto a las buenas noticias que trajo Jesús,
un mensaje que trae libertad, amor, perdón y pasión por él, por eso mismo buscamos lograr la misión
que nos encomendó nuestro señor, el cual es llevar y proclamar estas noticias y su palabra
a los confines de la tierra.
  </p>
</section>

{/* ======= Sección: Acerca ======= */}
<section
  id="acerca"  // id propio para evitar conflicto con el footer
  className="contacto min-h-screen flex flex-col items-center justify-center bg-transparent text-gray-900"
  data-aos="fade-up"
  data-aos-delay="400"
>
  <h1 className="text-7xl font-extrabold text-center mb-12">Acerca De</h1>
  <p className="text-center text-2xl md:text-3xl max-w-4xl leading-relaxed tracking-wide">
 Nuestra indumentaria contiene diseños que están hechos por nosotros mismos,
nuestra ropa busca bridar la mejor calidad posible hacia el cliente,
por eso elaboramos cada una de nuestras prendas con la mejor calidad de tela posible,
junto al mejor estampado para poder conseguir una mejor duración y calidad del mismo.
Pero para poder lograr esto conseguimos proveedores de la zona de Neuquén y del país, el cual
trabajan en nuestras prendas por pedido mayor, ellos también hacen que todo esto sea posible.
  </p>
</section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;
