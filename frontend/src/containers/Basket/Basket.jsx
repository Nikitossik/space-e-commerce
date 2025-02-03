import bas from "./Basket.module.scss";
import { ItemBasket } from "./ItemBasket/ItemBasket";
import { useContext, useEffect, useState } from "react";
import { BasketReducerContext } from "../../reducers/BasketReducer";
import { PaymentCard } from "../OrderDataForm/PaymentCard/PaymentCard";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Basket = ({
  contactData,
  deliveryData,
  setContactData,
  setDeliveryData,
}) => {
  const myUrlAddress = import.meta.env.VITE_BASE_URL;

  const url = import.meta.env.VITE_BACKEND_BASE_URL;

  const { basketState, setResetBasket } = useContext(BasketReducerContext);
  const [orderNumber, setOrderNumber] = useState(0);
  console.log(basketState);

  const today = new Date();

  const orderDate = String(today.toLocaleDateString("en-US")).replaceAll(
    "/",
    ""
  );

  const orderReference = String(orderNumber);

  const navigate = useNavigate();

  const resetBasketAndForms = () => {
    setResetBasket();
    setContactData(null);
    setDeliveryData(null);
  };

  async function sendEmailTelegram(orderNumber) {
    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

    const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const dataProducts = basketState.basket.map((el) => {
      return `\nНазва товару: "${
        el.title
      }"\nПосилання на товар: "${myUrlAddress}product_list/${el.category}/${
        el.id
      }"\nКод товару: ${el.id}\nРозширена гарантія: ${
        el.guarantee?.length > 0 ? el.guarantee : "Відсутня"
      }\nКіл-ть: ${el.quantity} шт.\nВартість: ${
        el.relevantPrice
      } грн.\nВартість гарантії: ${el.guaranteePrice} грн.\n`;
    });

    const data = {
      phone: contactData?.phone,

      name: contactData?.name,

      lastName: contactData?.lastName,
      paymentType: basketState.paymentType,

      deliveryType: deliveryData?.deliveryType,
      quantityAll: basketState.quantityAll,
      resultSumOld: basketState.resultSumOld,
      resultSumRelevant: basketState.resultSumRelevant,
    };
    const getDeliveryData = () => {
      if (deliveryData?.deliveryType === "Доставка новою поштою") {
        return `\n${deliveryData?.deliveryType}\n${deliveryData.deliveryData.city}\n${deliveryData.deliveryData.department}`;
      }
      if (deliveryData?.deliveryType === "Доставка нова пошта кур`єром") {
        return `\n${deliveryData?.deliveryType}\n${deliveryData.deliveryData.city}\n${deliveryData.deliveryData.street}: ${deliveryData.deliveryData.house}, кв: ${deliveryData.deliveryData.flat}`;
      }
      if (deliveryData?.deliveryType === "Доставка кур`єром") {
        return `\n${deliveryData?.deliveryType}\n${deliveryData.deliveryData.city}\n${deliveryData.deliveryData.street}: ${deliveryData.deliveryData.house}, кв: ${deliveryData.deliveryData.flat}`;
      }
      if (deliveryData?.deliveryType === "Самовивіз") {
        return `Самовивіз`;
      }
    };

    const getPaymentType = () => {
      if (basketState.paymentType === "uponReceipt") {
        return "Оплата при отриманні";
      }
      if (basketState.paymentType === "card") {
        return "Оплата картою - WayFofPay";
      }
      if (basketState.paymentType === "partMono") {
        return "Оплата частинами з Монобанк - WayFofPay";
      }
      if (basketState.paymentType === "partPrivat") {
        return "Оплата частинами з Приватбанк - WayFofPay";
      }
    };

    const { phone, name, lastName, quantityAll, resultSumRelevant } = data;

    const text = `Покупець: ${name} ${lastName}\nТелефон: ${phone}\nНомер замовлення: ${orderNumber}
                    \nТип оплати: ${getPaymentType()}
                    \nТип доставки: ${getDeliveryData()}
                    \nТовари у кошику:${dataProducts}\nКількість товарів у кошику: ${quantityAll}шт.\nСума замовлення: ${resultSumRelevant}грн.`;
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      });
      if (response.ok) {
        // setSendOrderSuccess(true)
        resetBasketAndForms();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      // formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
    } finally {
      // formBtn.textContent = 'Отправить';
    }
  }

  const getOrderNumber = async () => {
    const dataGet = await axios
      .get(`${url}/api/order-numbers?sort[1]=id:desc`)
      .then((res) => res.data.data);
    const lastOrderNumber = dataGet[0].attributes.number;
    const currentOrderNumber = Number(lastOrderNumber) + 1;
    setOrderNumber(currentOrderNumber);
    return currentOrderNumber;
  };

  useEffect(() => {
    getOrderNumber();
  }, [basketState.paymentType]);

  const makeOrder = async (autoNav = true) => {
    const dataReq = { number: orderNumber };

    await axios
      .post(`${url}/api/order-numbers`, { data: dataReq })
      .then((res) => {
        if (res.status === 200) {
          sendEmailTelegram(orderNumber);
          localStorage.setItem("orderNumber", JSON.stringify(orderNumber));
          autoNav && navigate("/order_success");
        }
      });
  };

  const itemsBasket = basketState.basket.map((el) => {
    return (
      <ItemBasket
        key={el.id}
        title={el.title}
        id={el.id}
        relevantPrice={String(el.relevantPrice)}
        oldPrice={String(el.oldPrice)}
        image={el.image}
        quantity={el.quantity}
        sumOld={String(el.sumOld)}
        sumRelevant={String(el.sumRelevant)}
        category={el.category}
        guarantee={el.guaranteePrice}
      />
    );
  });

  return (
    <div className={bas.wrapper} style={{ flex: "0 0 40%" }}>
      <div className={bas.title}>
        <span>Ваше замовлення:</span>
      </div>
      <div className={bas.products}>{itemsBasket}</div>
      <div className={bas.sumList}>
        {basketState.resultSumOld > 0 ? (
          <>
            <div className={bas.sumOrder}>
              <div className={bas.sumTitle}>Вартість замовлення:</div>
              <div
                className={bas.sumPrice}
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                {basketState.resultSumOld} ₴
              </div>
            </div>
            <div className={bas.sumOrder}>
              <div className={bas.sumTitle}>Знижка:</div>
              <div className={bas.sumPrice}>
                {basketState.resultSumOld - basketState.resultSumRelevant} ₴
              </div>
            </div>
          </>
        ) : (
          <div className={bas.basketEmpty}>
            <span>Кошик порожній</span>
          </div>
        )}
        <div className={bas.sumOrder}>
          <div
            className={bas.sumTitle}
            style={{ fontSize: "16px", fontWeight: "500" }}
          >
            До оплати без доставки:
          </div>
          {basketState.paymentType === "" && (
            <div
              className={bas.sumPrice}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {basketState.resultSumRelevant} ₴
            </div>
          )}
          {basketState.paymentType === "uponReceipt" && (
            <div
              className={bas.sumPrice}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {basketState.resultSumRelevant} ₴
            </div>
          )}
          {basketState.paymentType === "card" && (
            <div
              className={bas.sumPrice}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {basketState.resultSumRelevant} ₴
            </div>
          )}
          {basketState.paymentType === "partMono" && (
            <div
              className={bas.sumPrice}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {basketState.resultSumOld} ₴
            </div>
          )}
          {basketState.paymentType === "partPrivat" && (
            <div
              className={bas.sumPrice}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {basketState.resultSumOld} ₴
            </div>
          )}
        </div>
      </div>
      {contactData && deliveryData && basketState.paymentType ? (
        // contactData && basketState.paymentType
        <>
          {basketState.paymentType === "uponReceipt" && (
            <button
              disabled={!basketState.quantityAll && true}
              className={bas.btnOrder}
              onClick={makeOrder}
            >
              <span>Оформити замовлення</span>
            </button>
          )}
          {basketState.paymentType === "card" && (
            <PaymentCard
              makeOrder={makeOrder}
              orderReference={orderReference}
              orderDate={orderDate}
              amount={String(basketState.resultSumRelevant)}
              product={basketState.basket}
              basketQuantityAll={basketState.quantityAll}
              paymentSystems={"card;privat24;applePay;googlePay"}
              defaultPaymentSystem={"card"}
              buttonPlaceholder={"Оформити та оплатити"}
            />
          )}
          {basketState.paymentType === "partMono" && (
            <PaymentCard
              makeOrder={makeOrder}
              orderReference={orderReference}
              orderDate={orderDate}
              amount={String(basketState.resultSumOld)}
              product={basketState.basket}
              basketQuantityAll={basketState.quantityAll}
              // paymentSystems={'card;privat24;applePay;googlePay'}
              defaultPaymentSystem={"payPartsMono:4"}
              buttonPlaceholder={"Оформити та оплатити частинами з Моно"}
            />
          )}
          {basketState.paymentType === "partPrivat" && (
            <PaymentCard
              makeOrder={makeOrder}
              orderReference={orderReference}
              orderDate={orderDate}
              amount={String(basketState.resultSumOld)}
              product={basketState.basket}
              basketQuantityAll={basketState.quantityAll}
              // paymentSystems={'card;privat24;applePay;googlePay'}
              defaultPaymentSystem={"payPartsPrivat :4"}
              buttonPlaceholder={"Оформити та оплатити частинами з Приват"}
            />
          )}
        </>
      ) : (
        <button disabled={true} className={bas.btnOrder}>
          <span>Заповніть форму замовлення</span>
        </button>
      )}
      <div style={{ marginTop: "10px", color: "red" }}>
        * При оплаті частинами акції та знижки не діють, до сплати йде сума без
        знижок
      </div>
    </div>
  );
};
