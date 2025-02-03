import { Affix, Button, Select, Flex } from "antd";
import sort from "./ProductSort.module.scss";
import { useMediaQuery } from "react-responsive";

export const ProductsMenu = ({
  setDrawerType,
  showDrawer,
  filterCount,
  setSortType,
}) => {
  const handleSetSortType = (value) => {
    setSortType(value);
  };

  const IsTablet = useMediaQuery({ query: "(max-width: 992px)" });
  return IsTablet ? (
    <Affix>
      <Flex justify="center" align="center" className={sort.wrapper}>
        <Button
          className={sort.menuButton}
          value="sort"
          onClick={(e) => {
            setDrawerType(e.target.value);
            showDrawer();
          }}
        >
          Сортування
        </Button>
        <Button
          className={sort.menuButton}
          value="filter"
          onClick={(e) => {
            setDrawerType(e.target.value);
            showDrawer();
          }}
        >
          Фільтри
          <span className={sort.filterCount}>{filterCount}</span>
        </Button>
      </Flex>
    </Affix>
  ) : (
    <Flex justify="flex-end" gap={"0.5rem"} className={sort.wrapperDesktop}>
      <div className={sort.item}>
        <h4>Сортування</h4>
        <Select
          defaultValue="id:asc"
          style={{ width: 200 }}
          onChange={handleSetSortType}
          options={[
            { value: "id:asc", label: "за порядком" },
            { value: "relevantPrice:asc", label: "за зростанням ціни" },
            { value: "relevantPrice:desc", label: "за зниженням ціни" },
            { value: "id:desc", label: "за новизною" },
          ]}
        />
      </div>
      <Button
        className={sort.menuButton}
        value="filter"
        onClick={(e) => {
          setDrawerType(e.target.value);
          showDrawer();
        }}
      >
        Фільтри
        <span className={sort.filterCount}>{filterCount}</span>
      </Button>
    </Flex>
  );
};
