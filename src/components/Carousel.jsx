import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import imgprueba from '../assets/img/remera_referencia.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';

const Carousel = ({ images = [] }) => {
  const swiperRefmid = useRef(null);
  const swiperRefDesktop = useRef(null);
  const swiperRefMobile = useRef(null);
  const [current, setCurrent] = useState(0);
  const mobileTrackRef = useRef(null);

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
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrent(clamped);
    try { swiperRefmid.current?.slideTo(clamped, 300); } catch {}
    try {
      if (swiperRefDesktop.current?.slideToLoop) {
        swiperRefDesktop.current.slideToLoop(clamped, 300);
      } else {
        swiperRefDesktop.current?.slideTo(clamped, 300);
      }
    } catch {}
    try { swiperRefMobile.current?.slideTo(clamped, 300); } catch {}
  };

  // Cuando cambia el slide desde swipe, reflejar en estado
  const handleSlideChange = (swiper) => {
    const idx = typeof swiper?.realIndex === 'number' ? swiper.realIndex : swiper?.activeIndex || 0;
    setCurrent(idx);
  };

  // Propagar cambios de estado a todos los swipers (por seguridad)
  useEffect(() => {
    try { swiperRefDesktop.current && swiperRefDesktop.current.slideTo(current, 0); } catch {}
    try { swiperRefmid.current && swiperRefmid.current.slideTo(current, 0); } catch {}
    try { swiperRefMobile.current && swiperRefMobile.current.slideTo(current, 0); } catch {}
  }, [current]);

  // Scroll nativo en mobile
  const goToSlideMobileNative = (index) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrent(clamped);
    const track = mobileTrackRef.current;
    if (!track) return;
    const slideEl = track.children[clamped];
    if (!slideEl) return;
    track.scrollTo({ left: slideEl.offsetLeft, behavior: 'smooth' });
  };

  // Mantener current sincronizado al hacer swipe nativo en mobile
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const onScroll = () => {
      const w = track.clientWidth || 1;
      const idx = Math.round(track.scrollLeft / w);
      const clamped = Math.max(0, Math.min(slides.length - 1, idx));
      if (clamped !== current) setCurrent(clamped);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [current, slides.length]);

  return (
    <div className="justify-center items-center flex">
      {/* DESKTOP (>= xl) */}
      <div className="w-full max-w-[750px] m-10 hidden xl:flex gap-5 p-12">

        {/* Miniaturas */}
        <div className="w-[15%] flex flex-col items-center justify-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`w-14 h-14 rounded-md overflow-hidden mb-3 hover:scale-105 transition pointer-events-auto ${current === index ? 'ring-2 ring-AzulCeleste' : ''}`}
            >
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-cover rounded-xl border-2 border-AzulCeleste" />
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
            loop={false}
            grabCursor={true}
            initialSlide={current}
            className="rounded-xl w-full h-[450px]"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {slide.image ? (
                  <img src={slide.image} draggable={false} className="w-full h-full object-contain rounded-xl border-4 border-AzulCeleste select-none pointer-events-none" />
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

      {/* TABLET (md to < xl) */}
      <div className="max-w-[580px] w-full m-4 hidden md:flex xl:hidden flex-col">
        <Swiper
          onSwiper={(swiper) => (swiperRefmid.current = swiper)}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          loop={isMulti}
          grabCursor={true}
          allowTouchMove={true}
          simulateTouch={true}
          threshold={5}
          resistanceRatio={0.85}
          touchStartPreventDefault={false}
          nested={true}
          touchRatio={1.2}
          longSwipes={true}
          longSwipesRatio={0.2}
          preventClicks={true}
          preventClicksPropagation={true}
          touchMoveStopPropagation={true}
          noSwiping={false}
          observer={true}
          observeParents={true}
          updateOnWindowResize={true}
          initialSlide={current}
          className="rounded-xl w-full h-[55vh] max-w-[570px]"
          style={{ touchAction: 'pan-y' }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="cursor-grab active:cursor-grabbing">
              {slide.image ? (
                <img src={slide.image} draggable={false} className="w-full h-full object-contain rounded-xl border-4 border-AzulCeleste select-none pointer-events-none" />
              ) : (
                <div className="h-full flex items-center justify-center text-2xl text-white">
                  {slide.text}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Miniaturas debajo en tablet */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-14 h-14 rounded-md overflow-hidden hover:scale-105 transition ${current === index ? 'border-4 border-AzulCeleste' : 'border-2 border-AzulCeleste'}`}
            >
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white">
                  {slide.text}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE (< md) - Galería nativa con scroll-snap */}
      <div className="flex flex-col md:hidden">
        <div
          ref={mobileTrackRef}
          className="w-full h-[55vh] rounded-xl overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth snap-x snap-mandatory bg-transparent border-4 border-AzulCeleste"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x', scrollbarWidth: 'none' }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="inline-block align-top w-full h-full snap-center select-none">
              {slide.image ? (
                <img src={slide.image} draggable={false} className="w-full h-[55vh] object-contain select-none" />
              ) : (
                <div className="w-full h-[55vh] flex items-center justify-center text-2xl text-white">
                  {slide.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paginación simple */}
        {isMulti && (
          <div className="flex items-center justify-center gap-2 mt-2">
            {slides.map((_, i) => (
              <span key={i} className={`w-2.5 h-2.5 rounded-full ${i === current ? 'bg-Azul' : 'bg-gray-400'}`}></span>
            ))}
          </div>
        )}

        {/* Miniaturas debajo en mobile */}
        <div className="mt-4 mb-2 flex flex-wrap justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlideMobileNative(index)}
              className={`w-12 h-12 rounded-md overflow-hidden hover:scale-105 transition ${current === index ? 'ring-2 ring-AzulCeleste' : ''}`}
            >
              {slide.image ? (
                <img src={slide.image} className="w-full h-full object-cover rounded-lg border-2 border-AzulCeleste" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-white">
                  {slide.text}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
