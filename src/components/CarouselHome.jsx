import Carousel from "react-bootstrap/Carousel";
import EjeploCarouselImagen from "../components/EjeploCarouselImagen";
import banner1 from "../assets/img/banner1.jpeg";
import banner2 from "../assets/img/banner2.jpeg";
import banner3 from "../assets/img/banner3.jpeg";

function CarouselHome() {
  return (
    <div className="max-w-[1800px] mx-auto">
      <Carousel fade interval={3000} pause="hover">

        {/* Slide 1 */}
        <Carousel.Item className="relative">
          <EjeploCarouselImagen src={banner1} text="Primera imagen" />
          <Carousel.Caption className="!absolute !bottom-0 !left-0 !right-0 !w-full bg-black/50 flex flex-col items-center justify-center py-8">
            <h3 className="text-white text-2xl font-semibold text-center">
              Primera imagen
            </h3>
            <p className="text-gray-200 text-center max-w-[90%] md:max-w-[70%]">
              Moda urbana con actitud — conoce lo nuevo de Freedom.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item className="relative">
          <EjeploCarouselImagen src={banner2} text="Segunda imagen" />
          <Carousel.Caption className="!absolute !bottom-0 !left-0 !right-0 !w-full bg-black/50 flex flex-col items-center justify-center py-8">
            <h3 className="text-white text-2xl font-semibold text-center">
              Segunda imagen
            </h3>
            <p className="text-gray-200 text-center max-w-[90%] md:max-w-[70%]">
              Estilo y libertad, combinados en cada prenda.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item className="relative">
          <EjeploCarouselImagen src={banner3} text="Tercera imagen" />
          <Carousel.Caption className="!absolute !bottom-0 !left-0 !right-0 !w-full bg-black/50 flex flex-col items-center justify-center py-8">
            <h3 className="text-white text-2xl font-semibold text-center">
              Tercera imagen
            </h3>
            <p className="text-gray-200 text-center max-w-[90%] md:max-w-[70%]">
              Inspirate con nuestras nuevas colecciones.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
}

export default CarouselHome;
