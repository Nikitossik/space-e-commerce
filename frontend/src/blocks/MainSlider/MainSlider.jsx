import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./swiper.scss";
import mainSlider from "./mainSlider.module.scss";

import image1 from "../../assets/image/sliders/home/1.webp";

import image2 from "../../assets/image/sliders/home/2.webp";

import image3 from "../../assets/image/sliders/home/3.webp";

export const MainSlider = () => {
  const SliderOptions = {
    modules: [Autoplay],
    slidesPerGroup: 1,
    // pagination: true,
    // observer: true,
    // observeParents: true,
    speed: 1800,
    // preloadImages: true,
    // parallax: true,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      pauseOnMouseEnter: true,
      delay: 2500,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  };

  return (
    <div className={mainSlider.wrapper}>
      <Swiper {...SliderOptions}>
        <SwiperSlide>
          <div className={mainSlider.slide}>
            <img src={image1} alt="slide1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={mainSlider.slide}>
            <img src={image2} alt="slide2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={mainSlider.slide}>
            <img src={image3} alt="slide3" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
