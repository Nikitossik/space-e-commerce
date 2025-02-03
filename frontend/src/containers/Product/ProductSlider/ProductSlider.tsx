// import styleSlide from './ProductSlider.scss'
import { register } from "swiper/element/bundle";
import "swiper/scss/free-mode";
import "swiper/scss/navigation";
import "swiper/scss/thumbs";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import arrow from "./../../../assets/image/icons/arrow.png";

import noImage from "./../../../assets/image/icons/noImage.png";
import { useMediaQuery } from "react-responsive";

register();

type ProductSliderPropsType = {
  imagesUrlList: string[];
};

export const ProductSlider = ({ imagesUrlList }: ProductSliderPropsType) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const swiperRef1 = useRef<SwiperType>();
  const swiperRef2 = useRef<SwiperType>();

  const [isHoverPrev, setIsHoverPrev] = useState(false);
  const [isHoverNext, setIsHoverNext] = useState(false);
  // const [isImages, setIsImages] = useState(false)

  const btnPrevStyle: React.CSSProperties = {
    minHeight: "100%",
    width: "40px",
    borderRadius: "2px",
    overflow: "hidden",
    transition: "all 0.3s",
    backgroundColor: isHoverPrev ? "#fedf00" : "rgba(253, 222, 50, 0.52)",

    display: isMobile && "none",
  };
  const btnNextStyle: React.CSSProperties = {
    minHeight: "100%",
    width: "40px",
    borderRadius: "2px",
    overflow: "hidden",
    transition: "all 0.3s",
    backgroundColor: isHoverNext ? "#fedf00" : "rgba(253, 222, 50, 0.52)",

    display: isMobile && "none",
  };
  const slideStyle: React.CSSProperties = {
    maxHeight: "400px",
    position: "relative",
    zIndex: "5",
    border: "1px solid rgb(217, 217, 217)",
    display: "flex",
    alignItems: "center",
  };
  const imageStyle: React.CSSProperties = {
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "0 auto",
    fontSize: "0",
  };
  const topStyle: React.CSSProperties = {
    marginBottom: "20px",

    backgroundColor: isMobile && "#fff",
  };
  const bottomSlider: React.CSSProperties = {
    maxHeight: "150px",

    borderLeft: imagesUrlList.length > 2 && "1px solid rgb(217, 217, 217)",

    borderRight: imagesUrlList.length > 2 && "1px solid rgb(217, 217, 217)",
    overflow: "hidden",

    display: isMobile && "none",
  };
  const arrowPrevStyle: React.CSSProperties = {
    height: "18px",
    width: "18px",
    transform: isHoverPrev
      ? "rotate(-90deg) scale(1.1)"
      : "rotate(-90deg) scale(1)",
    opacity: isHoverPrev ? "1" : "0.5",

    filter:
      !isHoverPrev &&
      "invert(82%) sepia(39%) saturate(5746%) hue-rotate(2deg) brightness(106%) contrast(98%)",
  };
  const arrowNextStyle: React.CSSProperties = {
    height: "18px",
    width: "18px",
    transform: isHoverNext
      ? "rotate(90deg) scale(1.1)"
      : "rotate(90deg) scale(1)",
    opacity: isHoverNext ? "1" : "0.5",

    filter:
      !isHoverNext &&
      "invert(82%) sepia(39%) saturate(5746%) hue-rotate(2deg) brightness(106%) contrast(98%)",
  };

  if (imagesUrlList.length === 0) {
    return (
      <SwiperSlide style={slideStyle}>
        <img src={noImage} alt="" style={imageStyle} />
      </SwiperSlide>
    );
  }

  const urlB = import.meta.env.VITE_BACKEND_BASE_URL;

  const slidesWithWrap = imagesUrlList.map((url, index) => {
    return (
      <SwiperSlide key={index} style={slideStyle}>
        <img src={`${urlB}${url}`} alt="фото продукту" style={imageStyle} />
      </SwiperSlide>
    );
  });

  return (
    <>
      <div style={topStyle}>
        <Swiper
          style={{ border: "1px solid rgb(217, 217, 217)", overflow: "hidden" }}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef1.current = swiper;
          }}
          loop={true}
          slidesPerView={1}
          simulateTouch={!isMobile && false}
        >
          {slidesWithWrap}
        </Swiper>
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onMouseEnter={() => setIsHoverPrev(true)}
          onMouseLeave={() => setIsHoverPrev(false)}
          style={btnPrevStyle}
          onClick={() => {
            swiperRef1.current?.slidePrev();
            swiperRef2.current?.slidePrev();
          }}
        >
          {/* */}
          <img src={arrow} alt="" style={arrowPrevStyle} />
        </button>
        <Swiper
          style={bottomSlider}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef2.current = swiper;
          }}
          loop={true}
          slidesPerView={3}
          simulateTouch={false}
          spaceBetween={15}
        >
          {slidesWithWrap}
        </Swiper>
        <button
          onMouseEnter={() => setIsHoverNext(true)}
          onMouseLeave={() => setIsHoverNext(false)}
          style={btnNextStyle}
          onClick={() => {
            swiperRef1.current?.slideNext();
            swiperRef2.current?.slideNext();
          }}
        >
          <img src={arrow} alt="" style={arrowNextStyle} />
        </button>
      </div>
    </>
  );
};
