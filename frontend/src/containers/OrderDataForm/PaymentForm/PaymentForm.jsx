import { Radio, Space } from "antd";
import pay from "./PaymentForm.module.scss";
import { useContext } from "react";
import { BasketReducerContext } from "../../../reducers/BasketReducer";

export const PaymentForm = () => {
  const { basketState, addPaymentType } = useContext(BasketReducerContext);

  const onChange = (e) => {
    addPaymentType(e.target.value);
  };
  return (
    <>
      <div className={pay.formTitle}>
        <span></span>Оплата
      </div>
      <div className={pay.paymentForm}>
        <div className={pay.paymentList}>
          <Radio.Group
            onChange={onChange}
            defaultValue={basketState.paymentType}
          >
            <Space direction="vertical">
              <Radio value="uponReceipt">
                Оплата при отриманні / Після оплата "Нова пошта"
              </Radio>
              <Radio value="card">
                Оплата картою Visa, Mastercard - WayFofPay
              </Radio>
              <Radio value="partMono">
                Оплата частинами з Монобанк (4 платежі)
              </Radio>
              <Radio value="partPrivat">
                Оплата частинами з ПриватБанк (4 платежі)
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};
