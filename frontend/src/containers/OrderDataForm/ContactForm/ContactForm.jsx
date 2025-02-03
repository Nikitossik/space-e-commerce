import order from "./ContactForm.module.scss";
import { Button, Form } from "antd";
import { useState } from "react";
import {
  handleChangeInputValidateLastSymbol,
  isNumber,
  isUkr,
} from "../OrderDataForm";
import { InputWithWrapper } from "../DeliveryForm/DeliveryForm";

export const ContactForm = ({ setContactData }) => {
  const [validateSuccess, setValidate] = useState(false);
  const [phoneData, setPhoneData] = useState("");
  const [lastNameData, setLastNameData] = useState("");
  const [nameData, setNameData] = useState("");

  const handleChangePhoneData = (value) => {
    phoneData !== undefined &&
      handleChangeInputValidateLastSymbol(
        isNumber,
        setPhoneData,
        phoneData,
        value
      );
    setValidate(false);
  };
  const handleChangeLastNameData = (value) => {
    lastNameData !== undefined &&
      handleChangeInputValidateLastSymbol(
        isUkr,
        setLastNameData,
        lastNameData,
        value
      );
    setValidate(false);
  };
  const handleChangeNameData = (value) => {
    nameData !== undefined &&
      handleChangeInputValidateLastSymbol(isUkr, setNameData, nameData, value);
    setValidate(false);
  };

  const [form] = Form.useForm();

  // Case: Submit button out of Form
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          phone: values.phone.target.value,
          lastName: values.lastName.target.value,
          name: values.name.target.value,
        };
        setContactData(data);
        setValidate(true);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <>
      <div className={order.formTitle}>
        <span></span>Контактні дані
      </div>
      <div className={order.contactForm}>
        <div className={order.contactFormList} style={{}}>
          <Form form={form}>
            <Form.Item
              name="phone"
              // label="Телефон"
              valuePropName={phoneData}
              style={{ marginBottom: "0px" }}
              rules={[
                {
                  required: true,
                  message: "Вкажіть номер телефону",
                },
              ]}
            >
              <div className={order.contactFormItem}>
                <label htmlFor="phone">
                  Телефон <span>*</span>
                </label>
                <InputWithWrapper
                  value={phoneData}
                  placeholder="XXX-XXX-XX-XX"
                  onChange={handleChangePhoneData}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="lastName"
              // label="Прізвище"
              valuePropName={lastNameData}
              style={{ marginBottom: "0px" }}
              rules={[
                {
                  required: true,
                  message: "Вкажіть прізвище",
                },
              ]}
            >
              <div className={order.contactFormItem}>
                <label htmlFor="lastName">
                  Прізвище <span>*</span>
                </label>
                <InputWithWrapper
                  value={lastNameData}
                  placeholder="Введіть прізвище кирилицею"
                  onChange={handleChangeLastNameData}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="name"
              valuePropName={nameData}
              style={{ marginBottom: validateSuccess && "0px" }}
              rules={[
                {
                  required: true,
                  message: "Вкажіть ім'я",
                },
              ]}
            >
              <div className={order.contactFormItem}>
                <label htmlFor="name">
                  Ім'я <span>*</span>
                </label>
                <InputWithWrapper
                  value={nameData}
                  placeholder="Введіть ім'я кирилицею"
                  onChange={handleChangeNameData}
                />
              </div>
            </Form.Item>
          </Form>
          {validateSuccess ? null : (
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={handleFormSubmit}
            >
              Підтвердити
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
