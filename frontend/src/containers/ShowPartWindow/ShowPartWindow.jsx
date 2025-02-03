import style from "./ShowPartWindow.module.scss";
import { Button } from "antd";
import partMono from "./../../assets/image/payImages/partMono.png";
import partPrivat from "./../../assets/image/payImages/partPrivat.png";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BasketReducerContext } from "../../reducers/BasketReducer";

export const ShowPartWindow = ({
  addProductToBasket,
  setShowPartWindow,
  product,
  guaranteeType,
  guaranteePrice,
}) => {
  const { addPaymentType } = useContext(BasketReducerContext);

  const navigate = useNavigate();

  const addProductWithPaymentType = () => {
    if (product) {
      const prod = {
        title: product.attributes.title,
        id: product.id,
        oldPrice: product.attributes.oldPrice,
        relevantPrice: product.attributes.relevantPrice,
        image: product.attributes.imagesSlider.data[0].attributes.url,
        category: product.attributes.categories.data[0].attributes.titleForNav,
        guarantee: guaranteeType,
        guaranteePrice: guaranteePrice,
      };

      addProductToBasket(prod);
    }
  };

  const addProductWithPartMono = () => {
    addProductWithPaymentType();
    addPaymentType("partMono");
    navigate(`/basket`);
  };
  const addProductWithPartPrivat = () => {
    addProductWithPaymentType();
    addPaymentType("partPrivat");
    navigate(`/basket`);
  };

  return (
    <>
      <ScrollToTop />
      <div className={style.back}>
        <div className={style.container}>
          <h3 className={style.header}>Оберіть банк</h3>
          <div className={style.list}>
            <div className={style.item}>
              <h4>Оплата частинами з Монобанк</h4>
              <div className={style.image}>
                <img src={partMono} alt="monobank part" />
              </div>
              <p>Кількість платежів: 4</p>
              <Button onClick={addProductWithPartMono} type={"primary"}>
                Обрати
              </Button>
            </div>
            <div className={style.item}>
              <h4>Оплата частинами з Приватбанк</h4>
              <div className={style.image}>
                <img src={partPrivat} alt="privatbank part" />
              </div>
              <p>Кількість платежів: 4</p>
              <Button onClick={addProductWithPartPrivat} type={"primary"}>
                Обрати
              </Button>
            </div>
          </div>
          <Button
            className={style.btnClose}
            onClick={() => setShowPartWindow(false)}
          >
            Закрити
          </Button>
        </div>
      </div>
    </>
  );
};
