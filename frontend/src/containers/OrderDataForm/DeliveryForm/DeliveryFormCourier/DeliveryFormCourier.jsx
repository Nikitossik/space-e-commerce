import delivery from "../DeliveryForm.module.scss";
import React, { useEffect, useState } from "react";
import { SearchCityInput } from "../../SearchForms/SearchCityInput";
import { SearchStreetInput } from "../../SearchForms/SearchStreetInput";
import { Button, Form, Input } from "antd";

export const DeliveryFromCourier = ({ setDeliveryData }) => {
  const [refCity, setRefCity] = useState("");

  const [refCityDelivery, setRefCityDelivery] = useState("");
  console.log(refCityDelivery);

  const initialValues = {
    deliveryType: "Доставка кур`єром",
    city: "",
    street: "",
    house: "",
    flat: "",
  };

  const [validateSuccess, setValidate] = useState(false);

  const [state, setState] = useState(initialValues);

  const handleChangeHouse = (value) => {
    setState({ ...state, house: value.currentTarget.value });
    setValidate(false);
  };

  const handleChangeFlat = (value) => {
    setState({ ...state, flat: value.currentTarget.value });
    setValidate(false);
  };

  const [form] = Form.useForm();

  // Case: Submit button out of Form
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const delivery = {
          deliveryType: "Доставка кур`єром",
          deliveryData: {
            city: state.city,
            street: state.street,
            house: values.house.target.value,
            flat: values.flat.target.value,
          },
        };
        setDeliveryData(delivery);
        setValidate(true);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  useEffect(() => {
    return () => {
      setState(initialValues);
      setDeliveryData(null);
      setValidate(false);
    };
  }, []);

  return (
    <Form form={form}>
      <Form.Item
        valuePropName={state.city}
        name="city"
        style={{ marginBottom: "0px" }}
        rules={[{ required: true, message: "Вкажіть місто" }]}
      >
        <div className={delivery.inputItem}>
          <label htmlFor="city">
            Місто <span>*</span>
          </label>
          <SearchCityInput
            placeholder={"Вкажіть місто"}
            style={{ width: "100%" }}
            state={state}
            setValidate={setValidate}
            setState={setState}
            setRefCity={setRefCity}
            setRefCityDelivery={setRefCityDelivery}
          />
        </div>
      </Form.Item>
      <Form.Item
        valuePropName={state.street}
        name="street"
        style={{ marginBottom: "0px" }}
        rules={[{ required: true, message: "Вкажіть назву вулиці" }]}
      >
        <div className={delivery.inputItem}>
          <label htmlFor="streetCourier">
            Вулиця<span>*</span>
          </label>
          <SearchStreetInput
            setValidate={setValidate}
            placeholder={"Вкажіть назву вулиці"}
            style={{ width: "100%" }}
            refCity={refCity}
            state={state}
            setState={setState}
          />
        </div>
      </Form.Item>
      <Form.Item
        valuePropName={state.house}
        name="house"
        style={{ marginBottom: "0px" }}
        rules={[{ required: true, message: "Вкажіть номер будиноку" }]}
      >
        <div className={delivery.inputItem}>
          <label htmlFor="houseCourier">
            Будинок <span>*</span>
          </label>
          <Input
            value={state.house}
            onChange={handleChangeHouse}
            // status="error"
            placeholder="Вкажіть номер будиноку"
          />
        </div>
      </Form.Item>
      <Form.Item
        style={{ marginBottom: validateSuccess && "0px" }}
        valuePropName={state.flat}
        name="flat"
        rules={[{ required: true, message: "Вкажіть номер квартири" }]}
      >
        <div className={delivery.inputItem}>
          <label htmlFor="apartmentCourier">
            Квартира <span>*</span>
          </label>
          <Input
            value={state.flat}
            onChange={handleChangeFlat}
            // status="error"
            placeholder="Вкажіть номер квартири"
          />
        </div>
      </Form.Item>
      {validateSuccess ? null : (
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={handleFormSubmit}
        >
          Підтвердити
        </Button>
      )}
      {/*<Button style={{width: '100%'}} onClick={handleFormSubmit}>Підтвердити</Button>*/}
    </Form>
  );
};
