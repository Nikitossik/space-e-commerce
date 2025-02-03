import preloaderImg from "./../../assets/image/icons/preloader.gif";
import React from "react";

const PreloaderStyle = {
  position: "relative",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const PreloaderImageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  transform: "translate(-50%, -50%)",
  objectFit: "contain",
};

export const Preloader = () => {
  return (
    <div style={PreloaderStyle}>
      <img style={PreloaderImageStyle} src={preloaderImg} />
    </div>
  );
};
