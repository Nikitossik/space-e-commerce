import { Preloader } from "./Preloader";

const PreloaderBlockStyle = {
  display: "Flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
};

export const PreloaderBlock = () => {
  return (
    <div style={PreloaderBlockStyle}>
      <Preloader />
    </div>
  );
};
