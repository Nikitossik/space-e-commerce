import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Space,
  Checkbox,
  Form,
  Divider,
  InputNumber,
  Flex,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import sort from "./ProductSort.module.scss";
import { useParams } from "react-router-dom";
import arrowRight from "../../assets/image/icons/arrow-right.svg";
import arrowLeft from "../../assets/image/icons/arrow-left.svg";

import filterStructure from "./filterStructure.js";
import axios from "axios";
import * as util from "../../containers/ProductList/productFilterUtils.js";

const ProductFileterOption = ({
  filterName,
  filterLabel,
  filterValue,
  hasFilterOption,
  handleFilterCheck,
  allFiltersString,
}) => {
  const [entries, setEntries] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("allFiltersString", allFiltersString);

  const getFilterUrl = () => {
    return filterName == "forAge"
      ? `filters[${filterValue}][$eq]=true`
      : filterName == "brands"
      ? `filters[brand][$eq]=${filterValue}`
      : `filters[${filterName}][$eq]=${filterValue}`;
  };

  const getEntriesCount = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    console.log("getFilterUrl", getFilterUrl());

    const res = await axios.get(
      `${url}/api/products?${allFiltersString}&${getFilterUrl()}`
    );

    console.log(
      "full url",
      `${url}/api/products?${allFiltersString}&${getFilterUrl()}`
    );

    setEntries(res.data.meta.pagination.total);
  };

  useEffect(() => {
    setIsLoaded(false);
    getEntriesCount();

    return () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <Flex justify="space-between" align="center" gap="10px">
      <Checkbox
        name={filterLabel}
        key={`group-${filterLabel}-${filterValue}`}
        style={{ flex: "1 1 auto" }}
        checked={hasFilterOption}
        onChange={handleFilterCheck}
        disabled={entries == 0}
      >
        {filterLabel}
      </Checkbox>
      <span>{entries}</span>
    </Flex>
  );
};

const ProductCategoryDrawer = ({
  filterName,
  drawerName,
  setFilters,
  filters,
  availableBrands,
  open,
  onClose,
}) => {
  const filterOptions =
    filterName == "brands"
      ? availableBrands.reduce((acc, brand) => {
          return {
            ...acc,
            [brand.attributes.name]: brand.attributes.name,
          };
        }, {})
      : filterStructure[filterName];

  const filterOptionsArr = Object.entries(filterOptions);

  const handleFilterCheck = (e) => {
    const { name } = e.target;
    const value = filterOptions[name];

    if (e.target.checked) {
      setFilters({
        ...filters,
        [filterName]: [
          ...filters[filterName],
          {
            name,
            value,
          },
        ],
      });
    } else {
      setFilters({
        ...filters,
        [filterName]: filters[filterName].filter((f) => f.name != name),
      });
    }
  };

  const resetFilters = () => {
    setFilters({ ...filters, [filterName]: [] });
  };

  const filterOptionsJSX = filterOptionsArr.map((pair) => {
    const hasFilterOption = filters[filterName].find((f) => f.name == pair[0]);

    return (
      <ProductFileterOption
        key={`group-${filterName}-${pair[0]}`}
        filterName={filterName}
        filterLabel={pair[0]}
        filterValue={pair[1]}
        hasFilterOption={hasFilterOption}
        handleFilterCheck={handleFilterCheck}
        allFiltersString={util.getFilterString(filters)}
      />
    );
  });

  return (
    <Drawer
      title={drawerName}
      open={open}
      onClose={onClose}
      closeIcon={<img src={arrowLeft} alt="arrow left" />}
    >
      {filters[filterName].length != 0 && (
        <Button
          type="text"
          danger={true}
          onClick={resetFilters}
          icon={<CloseOutlined />}
          className={sort.resetFilterBtn}
        >
          Скинути всі фільтри
        </Button>
      )}
      <Flex vertical={true} gap="middle">
        {filterOptionsJSX}
      </Flex>
    </Drawer>
  );
};

const ProductFilterDrawer = ({
  onClose,
  open,
  filters,
  setFilters,
  availableBrands,
  quantity,
  filterCount,
}) => {
  const allParamFromNav = useParams();
  const categoryFromNav = allParamFromNav.category;

  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);
  const [subDrawerInfo, setSubDrawerInfo] = useState({
    filterName: "",
    drawerName: "",
  });

  const handleFilterSelect = (e) => {
    setSubDrawerInfo({
      filterName: e.currentTarget.name,
      drawerName: e.currentTarget.dataset.drawerName,
    });
    setIsSubDrawerOpen(true);
  };

  const [priceForm] = Form.useForm();

  const handlePriceInput = (values) => {
    const { fromPrice, toPrice } = values;
    setFilters({
      ...filters,
      fromPrice: fromPrice || null,
      toPrice: toPrice || null,
    });
  };

  const handleSetIsStock = (e) => {
    setFilters({ ...filters, onlyInStock: e.target.checked });
  };

  const handleSetIsDiscount = (e) => {
    setFilters({ ...filters, onlyhasDiscount: e.target.checked });
  };

  const handleSetHasTaoTao = (e) => {
    setFilters({ ...filters, hasTaoTao: e.target.checked });
  };

  const handleSetHasSeat = (e) => {
    setFilters({ ...filters, hasSeat: e.target.checked });
  };

  const getChosenFilters = (filterName) => {
    // console.log(filters[filterName]?.length);
    return filters[filterName]?.length != 0
      ? filters[filterName]?.map((f) => f.name).join(", ")
      : "не вибрано";
  };

  const resetFilters = () => {
    setFilters(util.defaultFilters);
  };

  return (
    <>
      <Drawer
        title="Фільтрування"
        onClose={onClose}
        open={open}
        footer={
          <Space
            direction="vertical"
            size="middle"
            align="center"
            style={{ display: "flex" }}
          >
            <p>{quantity} товарів</p>
            <Space.Compact>
              <Button onClick={onClose}>Назад</Button>
            </Space.Compact>
          </Space>
        }
      >
        {filterCount != 0 && (
          <Button
            type="text"
            danger={true}
            onClick={resetFilters}
            icon={<CloseOutlined />}
            className={sort.resetFilterBtn}
          >
            Скинути всі фільтри
          </Button>
        )}
        <Space
          direction="vertical"
          size="small"
          style={{ display: "flex", overflowY: "auto" }}
          split={<Divider className={sort.divider} />}
        >
          <Space.Compact direction="vertical" block>
            <h4 className={sort.drawerSubtitle}>Ціна</h4>
            <Form
              name="price"
              layout="inline"
              form={priceForm}
              onFinish={handlePriceInput}
            >
              <Form.Item name="fromPrice">
                <InputNumber
                  min={100}
                  max={100000}
                  value={filters.fromPrice}
                  placeholder="100"
                />
              </Form.Item>
              <Form.Item name="toPrice">
                <InputNumber
                  min={100}
                  max={100000}
                  value={filters.toPrice}
                  placeholder="1000"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Ok
                </Button>
              </Form.Item>
            </Form>
          </Space.Compact>
          <Space.Compact direction="vertical" block>
            <h4 className={sort.drawerSubtitle}>Наявність</h4>
            <Checkbox
              onChange={handleSetIsStock}
              name="onlyInStock"
              checked={filters.onlyInStock}
            >
              В наявності
            </Checkbox>
          </Space.Compact>
          <Space.Compact direction="vertical" block>
            <h4 className={sort.drawerSubtitle}>Акції</h4>
            <Checkbox
              onChange={handleSetIsDiscount}
              name="onlyhasDiscount"
              checked={filters.onlyhasDiscount}
            >
              По акції
            </Checkbox>
          </Space.Compact>
          {categoryFromNav === "elektrosamokati" && (
            <Space.Compact direction="vertical" block>
              <h4 className={sort.drawerSubtitle}>Наявність сидіння</h4>
              <Checkbox
                onChange={handleSetHasSeat}
                name="hasSeat"
                checked={filters.hasSeat}
              >
                Є
              </Checkbox>
            </Space.Compact>
          )}
          {categoryFromNav === "girobordi" && (
            <Space.Compact direction="vertical" block>
              <h4 className={sort.drawerSubtitle}>Наявність ТаоТао</h4>
              <Checkbox
                onChange={handleSetHasTaoTao}
                name="hasTaoTao"
                checked={filters.hasTaoTao}
              >
                Є
              </Checkbox>
            </Space.Compact>
          )}
          <Button
            className={sort.filterButton}
            type="text"
            name="brands"
            data-drawer-name="Виробник"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Виробник</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("brands")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="forAge"
            data-drawer-name="Призначення"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Призначення</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("forAge")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="maxLoad"
            data-drawer-name="Максимальне навантаження"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Максимальне навантаження</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("maxLoad")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="maxMileage"
            data-drawer-name="Запас ходу"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Запас ходу</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("maxMileage")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="maxSpeed"
            data-drawer-name="Максимальна швидкість"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Максимальна швидкість</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("maxSpeed")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="enginePower"
            data-drawer-name="Потужність, Вт"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Потужність, Вт</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("enginePower")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          <Button
            className={sort.filterButton}
            type="text"
            name="wheelSize"
            data-drawer-name="Діаметр коліс, Дюйми"
            onClick={handleFilterSelect}
          >
            <span className={sort.filterButtonText}>
              <span>Діаметр коліс, Дюйми</span>
              <span className={`${sort.filterButtonStatus}`}>
                {getChosenFilters("wheelSize")}
              </span>
            </span>
            <img src={arrowRight} alt="arrow right" />
          </Button>
          {categoryFromNav === "giroskuteri" && (
            <Button
              className={sort.filterButton}
              type="text"
              name="batteryType"
              data-drawer-name="Акумуляторна батарея"
              onClick={handleFilterSelect}
            >
              <span className={sort.filterButtonText}>
                <span>Акумуляторна батарея</span>
                <span className={`${sort.filterButtonStatus}`}>
                  {getChosenFilters("batteryType")}
                </span>
              </span>
              <img src={arrowRight} alt="arrow right" />
            </Button>
          )}
        </Space>
      </Drawer>
      {subDrawerInfo.filterName && (
        <ProductCategoryDrawer
          open={isSubDrawerOpen}
          filters={filters}
          setFilters={setFilters}
          availableBrands={availableBrands}
          {...subDrawerInfo}
          onClose={() => {
            setIsSubDrawerOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ProductFilterDrawer;
