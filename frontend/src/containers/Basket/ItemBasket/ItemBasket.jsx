import item from "./ItemBasket.module.scss";
import { useContext } from "react";
import { BasketReducerContext } from "../../../reducers/BasketReducer";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const ItemBasket = ({
  category,
  title,
  id,
  relevantPrice,
  oldPrice,
  image,
  quantity,
  sumRelevant,
  guarantee,
}) => {
  const { decreaseQuantityProduct, increaseQuantityProduct, deleteProduct } =
    useContext(BasketReducerContext);

  const decreaseQuantity = () => {
    decreaseQuantityProduct(id);
  };
  const increaseQuantity = () => {
    increaseQuantityProduct(id);
  };

  const delProduct = () => {
    deleteProduct(id);
  };

  const url = import.meta.env.VITE_BACKEND_BASE_URL;
  return (
    <div className={item.item}>
      <div className={item.image}>
        <img src={`${url}${image}`} alt="логотип" />
      </div>
      <div className={item.info}>
        <div className={item.titleWithButton}>
          <NavLink
            to={`/product_list/${category}/${id}/${title}`}
            className={item.title}
          >
            {title}
          </NavLink>
          <Button onClick={delProduct} icon={<DeleteOutlined />}></Button>
        </div>
        <div className={item.priceRelevant}>{relevantPrice} ₴/шт.</div>
        {oldPrice !== relevantPrice && oldPrice !== "null" && (
          <div className={item.priceOld}>{oldPrice} ₴/шт.</div>
        )}
        <div className={item.bottom}>
          <div className={item.buttons}>
            <Button
              onClick={decreaseQuantity}
              icon={<MinusOutlined />}
            ></Button>
            <p>
              <span>{quantity}</span>
            </p>
            <Button onClick={increaseQuantity} icon={<PlusOutlined />}></Button>
          </div>
          <div className={item.prices}>
            <div className={item.priceRelevantSum}>{sumRelevant} ₴</div>
          </div>
        </div>
        {guarantee > 0 && (
          <p style={{ marginTop: "10px", color: "red", textAlign: "right" }}>
            * Сума вказана з урахуванням розширеної гарантії
          </p>
        )}
      </div>
    </div>
  );
};
