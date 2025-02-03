import React, { useEffect, useState } from "react";
import res from "./Responses.module.scss";
import { InputWithWrapper } from "../OrderDataForm/DeliveryForm/DeliveryForm";
import { Button, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  handleChangeInputValidateLastSymbol,
  isUkr,
} from "../OrderDataForm/OrderDataForm";
import axios from "axios";

const TextAreaWithWrapper = ({ value, placeholder, onChange }) => {
  return (
    <TextArea
      value={value}
      showCount
      maxLength={100}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        height: 120,
        resize: "none",
      }}
    />
  );
};

export const ResponsesForm = ({ setActiveForm }) => {
  const [validateSuccess, setValidate] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [nameData, setNameData] = useState("");
  const [textData, setTextData] = useState("");
  const [ratingData, setRatingData] = useState(5);

  const handleChangeEmail = (value) => {
    setEmailData(value.currentTarget.value);
    setValidate(false);
  };
  const handleChangeName = (value) => {
    nameData !== undefined &&
      handleChangeInputValidateLastSymbol(isUkr, setNameData, nameData, value);
    setValidate(false);
  };

  const handleChangeText = (value) => {
    setTextData(value.currentTarget.value);
    setValidate(false);
  };
  console.log(emailData, "- emailData");
  console.log(nameData, "- nameData");
  console.log(textData, "- textData");
  console.log(validateSuccess);

  const desc = ["погано", "так собі", "нормално", "добре", "відмінно"];

  const [form] = Form.useForm();

  const url = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleFormSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          email: values.email,
          name: values.name,
          text: values.text,
          rating: ratingData,
        };
        setValidate(true);
        console.log(data);
        axios.post(`${url}/api/responses`, { data }).then((res) => {
          if (res.status === 200) {
            setEmailData("");
            setNameData("");
            setTextData("");
            setActiveForm(false);
            // setCalled(true)
          }
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  useEffect(() => {
    // return(()=>setCalled(true))
  }, []);

  return (
    <div className={res.formContainer}>
      <Form form={form}>
        <Form.Item
          name="email"
          // valuePropName={emailData}
          style={{ marginBottom: "0px" }}
          rules={[
            {
              type: "email",
              required: true,
              message: "Вкажіть вашу поштову адресу",
            },
          ]}
        >
          <div className={res.responsesFormItem}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <InputWithWrapper
              value={emailData}
              placeholder="Вкажіть вашу поштову адресу"
              onChange={handleChangeEmail}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="name"
          // valuePropName={nameData}
          style={{ marginBottom: "0px" }}
          rules={[
            {
              required: true,
              message: "Вкажіть ім'я",
            },
          ]}
        >
          <div className={res.responsesFormItem}>
            <label htmlFor="name">
              Ім'я <span>*</span>
            </label>
            <InputWithWrapper
              value={nameData}
              placeholder="Введіть ім'я кирилицею"
              onChange={handleChangeName}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="rating"
          // valuePropName={nameData}
          style={{ marginBottom: "0px" }}
        >
          <div className={res.responsesFormItem}>
            <label htmlFor="name">
              Оцініть нас <span>*</span>
            </label>
            <Rate tooltips={desc} onChange={setRatingData} value={ratingData} />
          </div>
        </Form.Item>
        <Form.Item
          name="text"
          // valuePropName={textData}

          // style={{marginBottom: '100px'}}
          rules={[
            {
              required: true,
              message: "Вкажіть ваш відгук",
            },
          ]}
        >
          <div className={res.responsesFormItem}>
            <label htmlFor="text">
              Відгук <span>*</span>
            </label>
            <TextAreaWithWrapper
              value={textData}
              placeholder={"Додайте ваш відгук"}
              onChange={handleChangeText}
            />
          </div>
        </Form.Item>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={handleFormSubmit}
        >
          Додати відгук
        </Button>
      </Form>
    </div>
  );
};
