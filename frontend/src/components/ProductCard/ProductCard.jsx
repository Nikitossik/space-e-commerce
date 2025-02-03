import item from "./ProductCard.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

import noImage from "./../../assets/image/icons/noImage.png";
import { Preloader } from "../Prealoder/Preloader";
import { useContext } from "react";
import { BasketReducerContext } from "../../reducers/BasketReducer";

export const ProductCard = ({ product }) => {
  const url = import.meta.env.VITE_BACKEND_BASE_URL;

  const { addProductToBasket } = useContext(BasketReducerContext);

  const navigate = useNavigate();

  const addProduct = () => {
    const prod = {
      title: product.attributes.title,
      id: product.id,
      oldPrice: product.attributes.oldPrice,
      relevantPrice: product.attributes.relevantPrice,
      image: product.attributes.imagesSlider.data[0].attributes.url,
      //ts-ignore
      category: product.attributes.categoryName,
      // category: product.attributes.categories.data[0].attributes.titleForNav,
      guarantee: "",
      guaranteePrice: 0,
    };

    addProductToBasket(prod);
    navigate(`/basket`);
  };

  const addProductToLocalStorage = () => {
    if (product) {
      const prod = {
        title: product.attributes.title,
        id: product.id,
        oldPrice: product.attributes.oldPrice,
        relevantPrice: product.attributes.relevantPrice,
        image: `${url}${product.attributes.imagesSlider.data[0].attributes.url}`,
        category: product.attributes.categoryName,

        // category: product.attributes.categories.data[0].attributes.titleForNav
      };
      // localStorage.clear()

      if (JSON.parse(localStorage.getItem("arr")) === null) {
        localStorage.setItem("arr", JSON.stringify([]));
      }

      if (JSON.parse(localStorage.getItem("arr"))) {
        const arr = JSON.parse(localStorage.getItem("arr"));

        const filteredArr = arr.filter((el) => el.id !== prod.id).slice(0, 12);
        const newArr = [prod, ...filteredArr];

        localStorage.setItem(`arr`, JSON.stringify(newArr));
      }

      // console.log(JSON.parse(localStorage.getItem('arr')))
    }
  };

  return (
    <div className={item.item}>
      {product ? (
        <>
          <NavLink
            to={`/product_list/${product.attributes.categoryName}/${product.id}/${product.attributes.title}`}
            // to={`/product_list/${product.attributes.categories.data[0].attributes.titleForNav}/${product.id}/${product.attributes.title}`}
            className={item.top}
            onClick={addProductToLocalStorage}
          >
            <div className={item.image}>
              <img
                src={
                  product.attributes.imagesSlider.data
                    ? `${url}${product.attributes.imagesSlider.data[0].attributes.url}`
                    : noImage
                }
                alt="product"
              />
            </div>
            <h4 className={item.title}>{product.attributes.title}</h4>
          </NavLink>
          <div className={item.statusBlock}>
            <span style={{ color: "rgb(66, 168, 82)" }}>
              {product.attributes.inStock ? "В наявності" : null}
            </span>
            <span style={{ color: "#e85c41" }}>
              {product.attributes.outOfStock ? "Не в наявності" : null}
            </span>
            <span style={{ color: "#42a852" }}>
              {product.attributes.readyToShip ? "Готовий до відправки" : null}
            </span>
          </div>
          <div className={item.bottom}>
            <div className={item.prices}>
              {product.attributes.oldPrice ? (
                <>
                  <div style={{ color: "#c13", fontSize: "16px" }}>
                    {product.attributes.relevantPrice} ₴
                  </div>
                  <div
                    style={{
                      opacity: "0.85",
                      textDecoration: "line-through",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {!!product.attributes.oldPrice &&
                      `${product.attributes.oldPrice} ₴`}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    color: "#333333",
                    fontSize: "16px",
                  }}
                >
                  {product.attributes.relevantPrice} ₴
                </div>
              )}
            </div>
            {product.attributes.outOfStock ? (
              <a
                href="tel:+38 099 544 4990"
                className={item.button}
                style={{
                  fontSize: "13px",
                  padding: "3px",
                  lineHeight: "14px",
                  textAlign: "center",
                }}
              >
                Зв'язатися з нами
              </a>
            ) : (
              <button className={item.button} onClick={addProduct}>
                <span>Купити</span>
              </button>
            )}
          </div>
          <div className={item.labels}>
            {product.attributes.labelNewProduct ? <span>Новинка</span> : null}
            {product.attributes.labelTopSeller ? <span>Топ продаж</span> : null}
            {product.attributes.oldPrice ? (
              <span>{`${Math.round(
                100 -
                  (Number(product.attributes.oldPrice) /
                    Number(product.attributes.relevantPrice)) *
                    100
              )}%`}</span>
            ) : null}
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
