import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import imgprueba from '../assets/img/remera_referencia.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useRef } from 'react';

const Carousel = ({ images = [] }) => {
  const swiperRefmid = useRef(null);
  const swiperRefDesktop = useRef(null);
  const swiperRefMobile = useRef(null);

  const defaultSlides = [
    { id: 1, image: imgprueba },
    { id: 2, text: 'Slide 2', color: 'bg-green-500' },
    { id: 3, text: 'Slide 3', color: 'bg-blue-500' },
    { id: 4, text: 'Slide 4', color: 'bg-yellow-500' },
    { id: 5, text: 'Slide 5', color: 'bg-violet-500' },
  ];

  const slides = (Array.isArray(images) && images.length > 0)
    ? images.slice(0, 5).map((url, idx) => ({ id: idx + 1, image: url }))
    : defaultSlides;

  const isMulti = slides.length > 1;

  const goToSlide = (index) => {
    swiperRefmid.current?.slideToLoop(index);
    swiperRefDesktop.current?.slideToLoop(index);
    swiperRefMobile.current?.slideToLoop(index);
  };

  return (
    <div>
      {/* DESKTOP */}
      <div className="w-full max-w-[750px] m-10 hidden lg:flex gap-5 p-12">

        {/* Miniaturas */}
        <div className="w-[15%] flex flex-col items-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="w-14 h-14 rounded-md overflow-hidden mb-3 hover:scale-105 transition"
            >
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white">
                  {slide.text}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Imagen grande */}
        <div className="w-[85%]">
          <Swiper
            onSwiper={(swiper) => (swiperRefDesktop.current = swiper)}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={isMulti}
            grabCursor={true}
            className="rounded-xl w-full h-[450px]"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {slide.image ? (
                  <img src={slide.image} className="w-full h-full object-contain" />
                ) : (
                  <div className="h-full flex items-center justify-center text-2xl text-white">
                    {slide.text}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* TABLET */}
      <div className="max-w-[700px] w-full m-10 hidden mid:flex">
        <Swiper
          onSwiper={(swiper) => (swiperRefmid.current = swiper)}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          loop={isMulti}
          grabCursor={true}
          className="rounded-xl w-full h-[55vh]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-contain" />
              ) : (
                <div className="h-full flex items-center justify-center text-2xl text-white">
                  {slide.text}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col lg:hidden">
        <Swiper
          onSwiper={(swiper) => (swiperRefMobile.current = swiper)}
          modules={[Pagination]}
          pagination={isMulti ? { clickable: true } : false}
          spaceBetween={16}
          slidesPerView={1}
          loop={isMulti}
          grabCursor={true}
          className="rounded-xl w-full h-[55vh]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-contain" />
              ) : (
                <div className="h-full flex items-center justify-center text-2xl text-white">
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
