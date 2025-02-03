import show from "./ShowCase.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useMediaQuery } from "react-responsive";

export const ShowCase = () => {
  const quantityProduct = 8;

  const [isLoad, setLoad] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [lengthList, setLengthList] = useState(4);

  const [productList, setProductList] = useState(null);

  const getProduct = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;
    const res = await axios.get(
      `${url}/api/products?pagination[page]=1&pagination[pageSize]=${quantityProduct}&populate=*`
    );
    const productListData = res.data.data;

    const productCardList = productListData.map((card, index) => {
      return <ProductCard product={card} key={index} />;
    });
    setProductList(productCardList);
    setLoad(true);
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      console.log(window.innerWidth);
    });
    getProduct();
  }, []);

  console.log(isMobile);

  return (
    isLoad && (
      <div className={show.wrapper}>
        <div className={show.header}>
          <h3 className={show.title}>Вітрина</h3>
          {!isMobile && (
            <NavLink to={"/product_list"} className={show.button}>
              Усі товари та послуги
            </NavLink>
          )}
        </div>
        <div className={show.list}>
          {isMobile ? (
            <>{productList.slice([0], [lengthList])}</>
          ) : (
            <>{productList}</>
          )}
        </div>
        {isMobile ? (
          lengthList >= quantityProduct ? (
            <NavLink className={show.buttonAll} to={"/product_list"}>
              <span>Дивитись усе</span>
            </NavLink>
          ) : (
            <button
              onClick={() => setLengthList(lengthList + 2)}
              className={show.buttonMore}
            >
              <span>Показати ще</span>
            </button>
          )
        ) : null}
      </div>
    )
  );
};
