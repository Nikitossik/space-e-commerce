import pages from "./Pages.module.scss";
import { Product } from "../containers/Product/Product";
// import {Navigate} from "../components/Navigate/Navigate";
import { Recommendation } from "../containers/Recommendation/Recommendation";

export const ProductPage = () => {
  return (
    <div style={{ paddingTop: "25px" }}>
      <div className={`${pages.containerProductPage} ${pages.container}`}>
        <Product />
        <Recommendation />
      </div>
    </div>
  );
};
