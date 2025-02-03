//@ts-ignore
import okIcon from "../../assets/image/icons/ok.png";
import success from "./SuccessOrder.module.scss";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useEffect, useState } from "react";

export const SuccessOrder = () => {
  const navigate = useNavigate();

  const navHome = () => {
    navigate(`/`);
    localStorage.removeItem("orderNumber");
  };

  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const getOrderNumber = async () => {
    //@ts-ignore
    const number = JSON.parse(localStorage.getItem("orderNumber"));
    setOrderNumber(number);
  };
  useEffect(() => {
    getOrderNumber();
  }, []);
  return (
    <div className={success.successWrap}>
      <div className={success.successContent}>
        <div className={success.successImage}>
          <img src={okIcon} alt="success" />
        </div>
        <p>Дякуємо за замовлення!</p>
        <p>
          Номер замовлення: <span>№{orderNumber}</span>
        </p>
        <p>Ми зв'яжемося з Вами найближчим часом!</p>
        <Button className={success.button} onClick={navHome}>
          Ок
        </Button>
      </div>
    </div>
  );
};
