import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import imgprueba from '../assets/img/remera_referencia.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useRef } from 'react';

const Carousel = () => {
  const swiperRefmid = useRef(null);
  const swiperRefDesktop = useRef(null);
  const swiperRefMobile = useRef(null);

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
      swiperRefmid.current?.slideToLoop(index);
      swiperRefDesktop.current?.slideToLoop(index);
      swiperRefMobile.current?.slideToLoop(index);
  };

  return (
    <div>
      {/* Carousel para pantallas grandes */}
      <div className="max-w-[800px] w-full m-10 flex hidden DropDownMenu:flex mid:hidden">
        {/* Panel de navegación */}
        <div className="h-[60vh] w-[10%] mr-1 pr-4 flex flex-col items-center justify-center"> 
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

        <div className='w-[90%] flex'>
          {/* Swiper principal con flechas y paginación */}
        <Swiper
          onSwiper={(swiper) => (swiperRefDesktop.current = swiper)}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-xl "
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
            <div className={`h-full w-full flex items-center justify-center text-2xl text-white ${slide.color}`}>
                {slide.text}
            </div>
          )}
        </SwiperSlide>

            
          ))}
        </Swiper>
        </div>
      </div>

      {/* Carousel para pantallas medias */}
      <div className="max-w-[600px] w-full m-10 flex flex-col hidden mid:flex DropDownMenu:hidden">

        <div className='w-[100%] flex'>
          {/* Swiper principal con flechas y paginación */}
        <Swiper
          onSwiper={(swiper) => (swiperRefmid.current = swiper)}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-xl "
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
            <div className={`h-full w-full flex items-center justify-center text-2xl text-white ${slide.color}`}>
                {slide.text}
            </div>
          )}
        </SwiperSlide>
          ))}
        </Swiper>
        </div>

        {/* Panel de navegación */}
        <div className="flex flex-wrap items-center justify-center m-5 ml-28 mr-28"> 
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
      </div>

      {/* Carousel para pantallas pequeñas */}
      <div className='flex DropDownMenu:hidden flex-col'>
        <div className='w-screen max-w-full p-5 flex'>
          {/* Swiper principal con flechas y paginación */}
          <Swiper
            onSwiper={(swiper) => (swiperRefMobile.current = swiper)} 
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

        {/* Panel de navegación */}
        <div className="flex flex-wrap items-center justify-center m-5 mt-0"> 
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
      </div>
    </div>
  );
};

export default Carousel;