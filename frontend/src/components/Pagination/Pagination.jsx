import { Pagination } from "antd";
import React from "react";

export const PaginationBlock = ({
  total,
  pageSize,
  setPageNumber,
  setPageSize,
  pageNumber,
}) => {
  const onChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };

  return (
    <Pagination
      defaultCurrent={pageNumber}
      defaultPageSize={pageSize}
      current={pageNumber}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger
      hideOnSinglePage={true}
    />
  );
};
