import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { apiKeyNova, baseUrlNova, isUkr } from "../OrderDataForm";

async function fetchCity(value, callback) {
  const res = await axios.post(`${baseUrlNova}`, {
    apiKey: `${apiKeyNova}`,
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: `${value}`,
      Limit: "20",
      Language: "UA",
      Page: "1",
    },
  });
  console.log(res, "respon");

  const resData = res.data.data[0].Addresses.map((el) => ({
    label: `${el.Present}`,
    value: `${el.Present}`,
    DeliveryCity: `${el.DeliveryCity}`,
    Ref: `${el.Ref}`,
  }));

  callback(resData);
}

export const SearchCityInput = (props) => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState(null);
  const [isAlert, setAlert] = useState(false);

  const handleSearch = (newValue) => {
    if (isUkr(newValue)) {
      fetchCity(newValue, setData);
      setAlert(false);
    } else {
      setAlert(true);
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setCity(newValue);
    props.setState({ ...props.state, city: newValue });
    props.setValidate(false);
  };

  return (
    <Select
      status={isAlert && "error"}
      allowClear
      showSearch
      value={city}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      onSelect={(value, option) => {
        props.setRefCity(option.refCity);
        props.setRefCityDelivery(option.refCityDelivery);
        console.log(value);
      }}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        refCityDelivery: d.DeliveryCity,
        refCity: d.Ref,
        value: d.value,
        label: d.text,
      }))}
    />
  );
};
