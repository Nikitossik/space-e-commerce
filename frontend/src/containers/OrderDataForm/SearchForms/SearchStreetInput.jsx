import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { apiKeyNova, baseUrlNova, isUkr } from "../OrderDataForm";

async function fetchStreet(refCity, value, callback) {
  const res = await axios.post(`${baseUrlNova}`, {
    apiKey: apiKeyNova,
    modelName: "Address",
    calledMethod: "searchSettlementStreets",
    methodProperties: {
      StreetName: `${value}`,
      SettlementRef: `${refCity}`,
      Page: "1",
      Limit: "50",
      Language: "UA",
    },
  });
  console.log(res);

  const resData = res.data.data[0].Addresses.map((el) => ({
    label: `${el.Present}`,
    value: `${el.Present}`,
  }));

  callback(resData);
}

export const SearchStreetInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [irAlert, setAlert] = useState(false);

  const handleSearch = (newValue) => {
    if (isUkr(newValue)) {
      fetchStreet(props.refCity, newValue, setData);
      setAlert(false);
    } else {
      setAlert(true);
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    props.setState({ ...props.state, street: newValue });
    props.setValidate(false);
  };

  return (
    <Select
      status={irAlert && "error"}
      allowClear
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};
