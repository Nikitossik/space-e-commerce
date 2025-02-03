import delivery from "../DeliveryForm.module.scss";
import { Button } from "antd";
import { useEffect, useState } from "react";

export const DeliverySelf = ({ setDeliveryData }) => {
  const [validateSuccess, setValidate] = useState(false);

  const sendForm = () => {
    const sentData = {
      deliveryType: "Самовивіз",
    };
    setDeliveryData(sentData);
    setValidate(true);
  };
  useEffect(() => {
    return () => {
      setDeliveryData(null);
      setValidate(false);
    };
  }, []);

  return (
    <div className={delivery.selfWrapper}>
      <div>Адреси пунктів самовивозу:</div>
      <p>Днепр</p>
      <ul>
        <li>
          ул. Набережная Победы 62в, ТЦ Набережный Днепропетровская область
        </li>
        <li>ул. Маршала Малиновского 2, ТЦ Вавилон</li>
      </ul>
      {validateSuccess ? null : (
        <Button
          type="primary"
          className={delivery.confirmButton}
          onClick={sendForm}
        >
          Підтвердити
        </Button>
      )}
    </div>
  );
};
