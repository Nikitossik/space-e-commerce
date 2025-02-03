import style from "./Product.module.scss";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";

import payVisa from "./../../assets/image/payImages/visa.png";

import payWay from "./../../assets/image/payImages/way.png";

import payPrivat from "./../../assets/image/payImages/privat.png";
import { ProductSlider } from "./ProductSlider/ProductSlider";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { BasketReducerContext } from "../../reducers/BasketReducer";

import noImage from "../../assets/image/icons/noImage.png";

import guaranteed from "./../../assets/image/icons/guaranteed.png";
import { ShowPartWindow } from "../ShowPartWindow/ShowPartWindow";
import { Button } from "antd";

export const Product = () => {
  const allParamFromNav = useParams();
  const productIdFromNav = allParamFromNav.productId;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [product, setProduct] = useState(null);
  const [relatedProductsResponse, setRelatedProductsResponse] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [images, setImages] = useState([]);
  const [showPartWindow, setShowPartWindow] = useState(false);

  const [guaranteeType, setGuaranteeType] = useState("");
  const [guaranteePrice, setGuaranteePrice] = useState(0);

  const { addProductToBasket } = useContext(BasketReducerContext);

  const url = import.meta.env.VITE_BACKEND_BASE_URL;

  const addGuarantee12Months = () => {
    if (guaranteeType === "12 місяців") {
      setGuaranteeType("");
      setGuaranteePrice(0);
    } else {
      setGuaranteeType("12 місяців");
      setGuaranteePrice(499);
    }
  };
  const addGuarantee18Months = () => {
    if (guaranteeType === "18 місяців") {
      setGuaranteeType("");
      setGuaranteePrice(0);
    } else {
      setGuaranteeType("18 місяців");
      setGuaranteePrice(999);
    }
  };

  const getProduct = async (id) => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    const res = await axios.get(`${url}/api/products/${id}?populate=*`);
    if (res.status == 200) {
      const productData = res.data.data;
      if (productData.attributes.imagesSlider.data) {
        const imagesSliderUrl = productData.attributes.imagesSlider.data.map(
          (el) => el.attributes.url
        );
        setImages(imagesSliderUrl);
      }

      const listRelatedProducts = res.data.data.attributes.inversedBy.data;
      const listRelatedId = listRelatedProducts.map((el) => el.id);

      await getRelatedProducts(listRelatedId).then((res) =>
        setRelatedProductsResponse(res)
      );

      setProduct(productData);
      // setLoad(true)
    }
  };

  async function getRelatedProducts(ids) {
    const prod = await Promise.all(
      ids.map((id) => axios.get(`${url}/api/products/${id}?populate=*`))
    );
    // axios.get(`${baseUrl}/api/products/${id}?populate=*`)));
    return prod;
  }

  const navigate = useNavigate();

  const addProduct = () => {
    if (product) {
      const prod = {
        title: product.attributes.title,
        id: product.id,
        oldPrice:
          product.attributes.oldPrice || product.attributes.relevantPrice,
        relevantPrice: product.attributes.relevantPrice,
        image: product.attributes.imagesSlider.data[0].attributes.url,
        category: product.attributes.categoryName,
        // category: product.attributes.categories.data[0].attributes.titleForNav,
        guarantee: guaranteeType,
        guaranteePrice: guaranteePrice,
      };

      addProductToBasket(prod);
      navigate(`/basket`);
    }
  };

  useEffect(() => {
    showPartWindow
      ? document.body.classList.add("_lock")
      : document.body.classList.remove("_lock");
    return () => document.body.classList.remove("_lock");
  }, [showPartWindow]);

  useEffect(() => {
    getProduct(productIdFromNav);

    return () => {
      setProduct(null);
      setImages([]);
    };
  }, [productIdFromNav]);

  return (
    product && (
      <>
        <div className={style.wrapper}>
          <div className={style.row}>
            <div className={style.columnImages}>
              <div className={style.labels}>
                {product.attributes.labelNewProduct ? (
                  <span>Новинка</span>
                ) : null}
                {product.attributes.labelTopSeller ? (
                  <span>Топ продаж</span>
                ) : null}
                {product.attributes.oldPrice ? (
                  <span>{`${Math.round(
                    100 -
                      (Number(product.attributes.oldPrice) /
                        Number(product.attributes.relevantPrice)) *
                        100
                  )}%`}</span>
                ) : null}
              </div>
              <ProductSlider imagesUrlList={images} />
            </div>
            <div className={style.columnInfo}>
              <h2 className={style.title}>{product.attributes.title}</h2>
              <h5 className={style.status}>
                <span
                  style={{
                    color: "rgb(66, 168, 82)",
                  }}
                >
                  {product.attributes.inStock ? "В наявності" : null}
                </span>
                <span
                  style={{
                    color: "#e85c41",
                  }}
                >
                  {product.attributes.outOfStock ? "Не в наявності" : null}
                </span>
                <span style={{ color: "#42a852" }}>
                  {product.attributes.readyToShip
                    ? "Готовий до відправки"
                    : null}
                </span>
              </h5>
              <div className={style.prices}>
                {product.attributes.oldPrice ? (
                  <>
                    <div style={{ color: "#c13", fontSize: "30px" }}>
                      {product.attributes.relevantPrice} ₴
                    </div>
                    <div
                      style={{
                        opacity: "0.85",
                        textDecoration: "line-through",
                        fontSize: "18px",
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
                      fontSize: "30px",
                    }}
                  >
                    {product.attributes.relevantPrice} ₴
                  </div>
                )}
              </div>
              {isMobile ? (
                product.attributes.oldPrice ? (
                  <div className={style.saleInfoMobile}>
                    <span>Економія:</span>
                    <b>
                      {Number(product.attributes.oldPrice) -
                        Number(product.attributes.relevantPrice)}{" "}
                      ₴
                    </b>
                  </div>
                ) : null
              ) : product.attributes.oldPrice ? (
                <div className={style.saleInfo}>
                  <span>{`${Math.round(
                    100 -
                      (Number(product.attributes.oldPrice) /
                        Number(product.attributes.relevantPrice)) *
                        100
                  )}%`}</span>
                </div>
              ) : null}
              {relatedProductsResponse &&
                relatedProductsResponse?.length > 0 && (
                  <>
                    <div style={{ marginBottom: "10px" }}>
                      Інші різновиди товару:
                    </div>
                    <div className={style.relatedProductList}>
                      {relatedProductsResponse &&
                        relatedProductsResponse.map((res) => {
                          const product = res.data.data;

                          switch (
                            product.attributes.categories.data[0].attributes
                              .titleForNav
                          ) {
                            case "giroskuteri":
                              return (
                                <NavLink
                                  className={style.relatedProductItem}
                                  to={`/product_list/${product.attributes.categories.data[0].attributes.titleForNav}/${product.id}/${product.attributes.title}`}
                                >
                                  <img
                                    src={
                                      product.attributes.imagesSlider.data
                                        ? `${url}${product.attributes.imagesSlider.data[0].attributes.url}`
                                        : noImage
                                    }
                                    alt="product"
                                  />
                                  {/*<p>{`Колір: ${product.attributes.color}`}</p>*/}
                                  <p>{`${product.attributes.typeBattery}V Samsung`}</p>
                                </NavLink>
                              );
                            case "girobordi":
                              return (
                                <NavLink
                                  className={style.relatedProductItem}
                                  to={`/product_list/${product.attributes.categories.data[0].attributes.titleForNav}/${product.id}/${product.attributes.title}`}
                                >
                                  <img
                                    src={
                                      product.attributes.imagesSlider.data
                                        ? `${url}${product.attributes.imagesSlider.data[0].attributes.url}`
                                        : noImage
                                    }
                                    alt="product"
                                  />
                                  <p>
                                    {product.attributes.withTaoTao
                                      ? "З ТаоТао"
                                      : "Без ТаоТао"}
                                  </p>
                                </NavLink>
                              );
                          }
                        })}
                    </div>
                  </>
                )}
              <div>
                <ul className={style.guaranteedWrapp}>
                  <li className={style.guaranteedItem}>
                    <div className={style.guaranteedTop}>
                      <div className={style.guaranteedImage}>
                        <img src={guaranteed} alt="guaranteed 12" />
                      </div>
                      <div className={style.guaranteedInfo}>
                        <p>Гарантія (розширений сервіс) 12 міс.</p>
                        <b>499 ₴</b>
                      </div>
                    </div>
                    {guaranteeType === "12 місяців" ? (
                      <Button
                        style={{ width: "100%" }}
                        onClick={addGuarantee12Months}
                      >
                        Обрано
                      </Button>
                    ) : (
                      <Button
                        style={{ width: "100%" }}
                        onClick={addGuarantee12Months}
                      >
                        Вибрати
                      </Button>
                    )}
                  </li>
                  <li className={style.guaranteedItem}>
                    <div className={style.guaranteedTop}>
                      <div className={style.guaranteedImage}>
                        <img src={guaranteed} alt="guaranteed 18" />
                      </div>
                      <div className={style.guaranteedInfo}>
                        <p>Гарантія (розширений сервіс) 18 міс.</p>
                        <b>999 ₴</b>
                      </div>
                    </div>
                    {guaranteeType === "18 місяців" ? (
                      <Button
                        style={{ width: "100%" }}
                        onClick={addGuarantee18Months}
                      >
                        Обрано
                      </Button>
                    ) : (
                      <Button
                        style={{ width: "100%" }}
                        onClick={addGuarantee18Months}
                      >
                        Вибрати
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
              <div className={style.buyButtons}>
                {!product.attributes.outOfStock && (
                  <button className={style.btnBuy} onClick={addProduct}>
                    <span>Купити</span>
                  </button>
                )}
                {!product.attributes.outOfStock && (
                  <button
                    className={style.btnBuy}
                    onClick={() => setShowPartWindow(true)}
                  >
                    <span>Оплата частинами</span>
                  </button>
                )}
              </div>
              <div className={style.infoBlock}>
                <div className={style.infoButtons}>
                  <NavLink
                    to={"/delivery"}
                    className={`${style.infoBtn} ${style.btnDelivery}`}
                  >
                    <span>Умови оплати та доставки</span>
                  </NavLink>
                  <NavLink
                    to={"/contacts"}
                    className={`${style.infoBtn} ${style.btnWork}`}
                  >
                    <span>Графік роботи</span>
                  </NavLink>
                  <NavLink
                    to={"/contacts"}
                    className={`${style.infoBtn} ${style.btnContacts}`}
                  >
                    <span>Адреса та контакти</span>
                  </NavLink>
                </div>
                <div className={style.return}>
                  <div>Умови повернення товару:</div>
                  <p>
                    Повернення товару протягом 14 днів <b>за рахунок покупця</b>
                  </p>
                  <NavLink to={"/returns"}>Детальніше</NavLink>
                </div>
              </div>
              <div className={style.payList}>
                <p>Можлива електронна оплата:</p>
                <div>
                  <img src={payVisa} alt="payVisa" />
                  <img src={payWay} alt="payWay" />
                  <img src={payPrivat} alt="payPrivat" />
                </div>
              </div>
            </div>
          </div>
          <div className={style.bottom}>
            <div className={style.buttons}>
              <button
                className={
                  toggle ? `${style.btn} ${style.btnActive}` : `${style.btn}`
                }
                onClick={() => setToggle(true)}
              >
                <span>Опис</span>
              </button>
              <button
                className={
                  !toggle ? `${style.btn} ${style.btnActive}` : `${style.btn}`
                }
                onClick={() => setToggle(false)}
              >
                <span>Характеристики</span>
              </button>
            </div>
            <div className={style.bottomList}>
              {toggle ? (
                <div className={style.descriptors}>
                  <Markdown>{product.attributes.description}</Markdown>
                </div>
              ) : (
                <div className={style.characteristic}>
                  <Markdown>{product.attributes.characteristic}</Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
        {showPartWindow && (
          <ShowPartWindow
            setShowPartWindow={setShowPartWindow}
            addProductToBasket={addProductToBasket}
            product={product}
            guaranteeType={guaranteeType}
            guaranteePrice={guaranteePrice}
          />
        )}
      </>
    )
  );
};
