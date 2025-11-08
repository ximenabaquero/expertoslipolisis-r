import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../redux/slices/imageSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImagesCard from "./ImageCard";
import "./CardCarousel.css";

const CardCarousel = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.list);
  const loading = useSelector((state) => state.images.loading);

  useEffect(() => {
    if (!images || images.length === 0) {
      dispatch(fetchImages());
    }
  }, [dispatch]);

  if (loading) return <div>Cargando...</div>;
  if (!images || images.length === 0)
    return <div>No hay imágenes para mostrar</div>;

  return (
    <div className="carousel-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          type: "bullets",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {images.map((card) => (
          <SwiperSlide key={card.id}>
            <ImagesCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="carousel-navigation-bottom">
        <button className="custom-prev">‹</button>
        <div className="custom-pagination"></div>
        <button className="custom-next">›</button>
      </div>
    </div>
  );
};

export default CardCarousel;
