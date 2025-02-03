import React from "react";
import { Drawer, Radio, Space } from "antd";
import sort from "./ProductSort.module.scss";

const ProductSortDrawer = ({ onClose, open, sortType, setSortType }) => {
  return (
    <Drawer title="Сортування" onClose={onClose} open={open}>
      <Radio.Group
        onChange={(e) => {
          setSortType(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
        value={sortType}
        defaultValue={sortType}
        className={sort.fullWidth}
      >
        <Space direction="vertical" className={sort.fullWidth}>
          <Radio.Button className={sort.sortButton} value="id:asc">
            За порядком
          </Radio.Button>
          <Radio.Button className={sort.sortButton} value="relevantPrice:asc">
            За зростанням ціни
          </Radio.Button>
          <Radio.Button className={sort.sortButton} value="relevantPrice:desc">
            За зниженням ціни
          </Radio.Button>
          <Radio.Button className={sort.sortButton} value="id:desc">
            За новизною
          </Radio.Button>
        </Space>
      </Radio.Group>
    </Drawer>
  );
};

export default ProductSortDrawer;
