import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop.jsx";
import { ConfigProvider } from "antd";
import ukUA from "antd/locale/uk_UA";

console.log(ukUA);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider
        locale={ukUA}
        theme={{
          token: {
            colorPrimary: "#fcb503",
            colorPrimaryBorder: "#fcb503",
            colorPrimaryHover: "#fedf00",
            colorText: "#333333",
            borderRadius: 4,
            fontFamily: " Roboto",
          },
          components: {
            Drawer: {
              footerPaddingBlock: 16,
            },
          },
        }}
      >
        <ScrollToTop />
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>
);
