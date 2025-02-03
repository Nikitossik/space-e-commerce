import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { apiKeyNova, baseUrlNova, isNumber } from "../OrderDataForm";

async function fetchDepartment(refCityDelivery, value, callback) {
  const res = await axios.post(`${baseUrlNova}`, {
    apiKey: apiKeyNova,
    modelName: "Address",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityRef: `${refCityDelivery}`,
      Page: "1",
      Limit: "50",
      Language: "UA",
      WarehouseId: `${value}`,
    },
  });

  const resData = res.data.data.map((el) => ({
    label: `${el.Description}`,
    value: `${el.Description}`,
  }));

  callback(resData);
}

export const SearchDepartmentInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [irAlert, setAlert] = useState(false);

  const handleSearch = (newValue) => {
    if (isNumber(newValue)) {
      fetchDepartment(props.refCityDelivery, newValue, setData);
      setAlert(false);
    } else {
      setAlert(true);
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    props.setState({ ...props.state, department: newValue });
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
