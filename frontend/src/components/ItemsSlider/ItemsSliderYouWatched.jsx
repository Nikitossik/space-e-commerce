import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useEffect, useRef, useState } from "react";

import arrow from "./../../assets/image/icons/arrow.png";

import noImage from "./../../assets/image/icons/noImage.png";

import { ItemOfSlider } from "./ItemOfSlider/ItemOfSlider";

import { useMediaQuery } from "react-responsive";

export const ItemsSliderYouWatched = ({ sliderData }) => {
  const slideList = sliderData.map((slide) => {
    return (
      <SwiperSlide>
        <ItemOfSlider
          image={slide.image ? `${slide.image}` : noImage}
          title={slide.title}
          oldPrice={slide.oldPrice}
          relevantPrice={slide.relevantPrice}
          key={slide.id}
          categoryNav={slide.category}
          id={slide.id}
        />
      </SwiperSlide>
    );
  });
  const swiperRef = useRef();

  const [isHoverSlide, setIsHoverSlide] = useState(false);
  const [isHoverPrev, setIsHoverPrev] = useState(false);
  const [isHoverNext, setIsHoverNext] = useState(false);
  const [sliderPrevValue, setSliderPrevValue] = useState(6);
  const btnPrevStyle = {
    position: "absolute",
    zIndex: "10",
    left: "0",
    top: "50%",

    transform: isHoverSlide
      ? "translate(0px, -50%) scale(1)"
      : "translate(-100%, -50%) scale(0)",
    height: "100%",
    width: "30px",
    borderRadius: "2px",
    overflow: "hidden",
    transition: "all 0.3s",

    backgroundColor: isHoverPrev ? "#fedf00" : "rgba(253, 222, 50, 0.52)",
  };
  const btnNextStyle = {
    position: "absolute",
    zIndex: "10",
    right: 0,
    top: "50%",

    transform: isHoverSlide
      ? "translate(0px, -50%) scale(1)"
      : "translate(100%, -50%) scale(0)",
    height: "100%",
    width: "30px",
    borderRadius: "2px",
    overflow: "hidden",
    transition: "all 0.3s",

    backgroundColor: isHoverNext ? "#fedf00" : "rgba(253, 222, 50, 0.52)",
  };
  const arrowPrevStyle = {
    transform: isHoverPrev
      ? "rotate(-90deg) scale(1.1)"
      : "rotate(-90deg) scale(1)",
    opacity: isHoverPrev ? "1" : "0.5",
    filter:
      !isHoverPrev &&
      "invert(82%) sepia(39%) saturate(5746%) hue-rotate(2deg) brightness(106%) contrast(98%)",
  };
  const arrowNextStyle = {
    transform: isHoverNext
      ? "rotate(90deg) scale(1.1)"
      : "rotate(90deg) scale(1)",
    opacity: isHoverNext ? "1" : "0.5",
    filter:
      !isHoverNext &&
      "invert(82%) sepia(39%) saturate(5746%) hue-rotate(2deg) brightness(106%) contrast(98%)",
  };

  const is500Px = useMediaQuery({ query: "(max-width: 500px)" });
  const is700Px = useMediaQuery({ query: "(max-width: 700px)" });
  const is1000Px = useMediaQuery({ query: "(max-width: 1000px)" });

  useEffect(() => {
    if (is500Px) {
      setSliderPrevValue(2.2);
    } else if (is700Px) {
      setSliderPrevValue(3);
    } else if (is1000Px) {
      setSliderPrevValue(4);
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        onMouseEnter={() => setIsHoverSlide(true)}
        onMouseLeave={() => setIsHoverSlide(false)}
        style={{ position: "relative" }}
      >
        <button
          onMouseEnter={() => setIsHoverPrev(true)}
          onMouseLeave={() => setIsHoverPrev(false)}
          style={btnPrevStyle}
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <img src={arrow} alt="prev" style={arrowPrevStyle} />
        </button>
        <Swiper
          style={{ overflow: "hidden" }}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          slidesPerView={sliderPrevValue}
          simulateTouch={true}
          spaceBetween={15}
          preloadImages={true}
        >
          {slideList}
        </Swiper>
        <button
          onMouseEnter={() => setIsHoverNext(true)}
          onMouseLeave={() => setIsHoverNext(false)}
          style={btnNextStyle}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <img src={arrow} alt="" style={arrowNextStyle} />
        </button>
      </div>
    </div>
  );
};
