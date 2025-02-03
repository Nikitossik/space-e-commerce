import { useEffect, useState } from "react";
import { ItemsSliderYouWatched } from "../../components/ItemsSlider/ItemsSliderYouWatched";

export const YouWatched = () => {
  const titleStyle = {
    fontSize: "28px",
    fontWeight: "500",
    letterSpacing: "1px",
    marginBottom: "20px",
  };
  const [sliderDataList, setSliderData] = useState(null);

  useEffect(() => {
    setSliderData(JSON.parse(localStorage.getItem("arr")));
  }, []);

  return (
    <>
      {sliderDataList && (
        <div style={{ paddingBottom: "50px" }}>
          <h2 style={titleStyle}>Ви переглянули</h2>
          <ItemsSliderYouWatched sliderData={sliderDataList} />
        </div>
      )}
    </>
  );
};
