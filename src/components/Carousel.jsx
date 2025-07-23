import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import imgprueba from '../assets/img/remera_referencia.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useRef } from 'react';

const Carousel = () => {
  const swiperRef = useRef(null);

  // Array con los slides del carousel.
  const slides = [
    { id: 1, image: imgprueba },
    { id: 2, text: 'Slide 2', color: 'bg-green-500' },
    { id: 3, text: 'Slide 3', color: 'bg-blue-500' },
    { id: 4, text: 'Slide 4', color: 'bg-yellow-500' },
    { id: 5, text: 'Slide 5', color: 'bg-violet-500' },
    { id: 6, text: 'Slide 6', color: 'bg-orange-500' },
    { id: 7, text: 'Slide 7', color: 'bg-gray-500' },
    { id: 8, text: 'Slide 8', color: 'bg-pink-500' },
  ];

  // Función para cambiar los slides desde el menu.
  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current?.slideToLoop(index);
    }
  };

  return (
    <div className=" max-w-3xl flex m-10">
      {/* Panel de navegación */}
      <div className="grid grid-flow-col grid-rows-4 mr-10"> 
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-16 h-16 rounded-md overflow-hidden m-2 hover:scale-105 transition ${
              slide.image ? '' : `${slide.color} text-white flex items-center justify-center text-xs`
            }`}
          >
            {slide.image ? (
              <img
                src={slide.image}
                alt={`Thumb ${slide.id}`}
                className="w-full h-full object-cover"
              />
            ) : (
              slide.text
            )}
          </button>

        ))}
      </div>

      <div className='max-w-xl flex'>
        {/* Swiper principal con flechas y paginación */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-xl"
        loop={true}
      >
        {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
        {slide.image ? (
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className={`h-full flex items-center justify-center text-2xl text-white ${slide.color}`}>
              {slide.text}
          </div>
        )}
      </SwiperSlide>

          
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
