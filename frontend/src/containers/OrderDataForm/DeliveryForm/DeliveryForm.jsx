import { useState } from "react";
import delivery from "./DeliveryForm.module.scss";
import { Button, Input } from "antd";
import { DeliveryFromCourier } from "./DeliveryFormCourier/DeliveryFormCourier";
import { DeliverySelf } from "./DeliverySelf/DeliverySelf";

export const InputWithWrapper = ({ value, placeholder, onChange }) => {
  return <Input value={value} placeholder={placeholder} onChange={onChange} />;
};

export const DeliveryForm = ({ setDeliveryData }) => {
  const [deliveryType, setDeliveryType] = useState("nova");
  const [switchNova, setSwitchNova] = useState(true);

  return (
    <>
      <div className={delivery.formTitle}>
        <span></span>Доставка
      </div>
      <div className={delivery.wrapper}>
        <div className={delivery.titleDelivery}>Виберіть спосіб доставки</div>
        <div className={delivery.buttonTypeDelivery}>
          {deliveryType === "nova" ? (
            <Button type="primary" onClick={() => setDeliveryType("nova")}>
              Нова пошта
            </Button>
          ) : (
            <Button onClick={() => setDeliveryType("nova")}>Нова пошта</Button>
          )}
          {deliveryType === "self" ? (
            <Button type="primary" onClick={() => setDeliveryType("self")}>
              Самовивіз
            </Button>
          ) : (
            <Button onClick={() => setDeliveryType("self")}>Самовивіз</Button>
          )}
          {deliveryType === "courier" ? (
            <Button type="primary" onClick={() => setDeliveryType("courier")}>
              Доставка кур'єром
            </Button>
          ) : (
            <Button onClick={() => setDeliveryType("courier")}>
              Доставка кур'єром
            </Button>
          )}
        </div>
        <div>
          {deliveryType === "nova" && (
            <div>
              <div className={delivery.titleDelivery}>
                Виберіть вид доставки
              </div>
              <div className={delivery.buttonsNovaPost}>
                {switchNova ? (
                  <Button type="primary" onClick={() => setSwitchNova(true)}>
                    У відділення/поштомат
                  </Button>
                ) : (
                  <Button onClick={() => setSwitchNova(true)}>
                    У відділення/поштомат
                  </Button>
                )}
                {switchNova ? (
                  <Button onClick={() => setSwitchNova(false)}>Кур'єром</Button>
                ) : (
                  <Button type="primary" onClick={() => setSwitchNova(false)}>
                    Кур'єром
                  </Button>
                )}
              </div>
              <div className={delivery.novaWrapper}>
                <div className={delivery.typeNovaWrapper}>
                  {switchNova ? (
                    <DeliveryFormNovaDepartment
                      setDeliveryData={setDeliveryData}
                    />
                  ) : (
                    <DeliveryFromNovaCourier
                      setDeliveryData={setDeliveryData}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {deliveryType === "self" && (
            <DeliverySelf setDeliveryData={setDeliveryData} />
          )}
          {deliveryType === "courier" && (
            <DeliveryFromCourier setDeliveryData={setDeliveryData} />
          )}
        </div>
      </div>
    </>
  );
};

import "./../antd.scss";
import { DeliveryFormNovaDepartment } from "./DeliveryFormNova/DeliveryFormNovaDepartment";
import { DeliveryFromNovaCourier } from "./DeliveryFormNova/DeliveryFromNovaCourier";
