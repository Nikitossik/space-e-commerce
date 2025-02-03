import delivery from "../DeliveryForm.module.scss";
import { SearchDepartmentInput } from "../../SearchForms/SearchDepartmentInput";
import { useEffect, useState } from "react";
import { SearchCityInput } from "../../SearchForms/SearchCityInput";
import { Button, Form } from "antd";

export const DeliveryFormNovaDepartment = ({ setDeliveryData }) => {
  const [refCity, setRefCity] = useState("");
  const [refCityDelivery, setRefCityDelivery] = useState("");
  console.log(refCity);

  const initialValues = {
    deliveryType: "Доставка новою поштою",
    city: "",
    department: "",
  };

  const [validateSuccess, setValidate] = useState(false);
  const [state, setState] = useState(initialValues);

  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const delivery = {
          deliveryType: "Доставка новою поштою",
          deliveryData: {
            city: state.city,
            department: state.department,
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
            setValidate={setValidate}
            state={state}
            setState={setState}
            setRefCity={setRefCity}
            setRefCityDelivery={setRefCityDelivery}
          />
        </div>
      </Form.Item>
      <Form.Item
        valuePropName={state.department}
        style={{ marginBottom: validateSuccess && "0px" }}
        name="department"
        rules={[
          { required: true, message: "Вкажіть номер відділення або поштомату" },
        ]}
      >
        <div className={delivery.inputItem}>
          <label htmlFor="department">
            Відділення/поштомат <span>*</span>
          </label>
          <SearchDepartmentInput
            // name='department' id='department'
            placeholder={"Вкажіть номер відділення або поштомату"}
            style={{ maxWidth: "100%", textOverflow: "ellipsis" }}
            setValidate={setValidate}
            state={state}
            setState={setState}
            refCityDelivery={refCityDelivery}
            // setDepartmentData={setDepartmentData}
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
