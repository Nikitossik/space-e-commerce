import order from "./OrderDataForm.module.scss";
import { ContactForm } from "./ContactForm/ContactForm";
import { DeliveryForm } from "./DeliveryForm/DeliveryForm";
import { PaymentForm } from "./PaymentForm/PaymentForm";
import { useState } from "react";
import { Basket } from "../Basket/Basket";

export const apiKeyNova = import.meta.env.VITE_NOVA_API_KEY;

export const baseUrlNova = import.meta.env.VITE_NOVA_BASE_URL;

export function isNumber(value) {
  const reg = /[0-9]/g;
  return reg.test(value);
}

export function isUkr(value) {
  const reg = /[аА-їЇ]/g;
  return reg.test(value);
}

export function handleChangeInputValidateLastSymbol(
  validateReg,
  callbackSet,
  dataState,
  value
) {
  validateReg(value.currentTarget.value.slice(-1))
    ? callbackSet(value.currentTarget.value)
    : callbackSet(dataState);

  value.currentTarget.value.length === 0 && callbackSet(null);
}

export const OrderDataForm = () => {
  const [contactData, setContactData] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);

  return (
    <div className={order.wrapper}>
      <div className={order.forms}>
        <ContactForm setContactData={setContactData} />
        <DeliveryForm setDeliveryData={setDeliveryData} />
        <PaymentForm />
      </div>
      <Basket
        contactData={contactData}
        deliveryData={deliveryData}
        setContactData={setContactData}
        setDeliveryData={setDeliveryData}
      />
    </div>
  );
};
