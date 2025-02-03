import { ItemsSlider } from "../../components/ItemsSlider/ItemsSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import { PreloaderBlock } from "../../components/Prealoder/PreloaderBlock";

export const Recommendation = () => {
  const titleStyle = {
    fontSize: "28px",
    fontWeight: "500",
    letterSpacing: "1px",
    marginBottom: "20px",
  };

  const [isLoad, setLoad] = useState(false);
  const [sliderDataList, setSliderData] = useState(null);

  const getProduct = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    const res = await axios.get(`${url}/api/products/?populate=*`);

    const productListData = res.data.data;

    const filterWeRecommend = productListData.filter(function (el) {
      return el.attributes.weRecommend === true;
    });

    setSliderData(filterWeRecommend);
    setLoad(true);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {isLoad ? (
        <div style={{ paddingBottom: "50px" }}>
          <h2 style={titleStyle}>Ми рекомендуємо</h2>
          <ItemsSlider sliderData={sliderDataList} />
        </div>
      ) : (
        <PreloaderBlock />
      )}
    </>
  );
};
