import list from "./ProductList.module.scss";
import show from "../ShowCase/ShowCase.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductsMenu } from "../../components/ProductSort/ProductsMenu.jsx";

import { PaginationBlock } from "../../components/Pagination/Pagination.jsx";
import { PreloaderBlock } from "../../components/Prealoder/PreloaderBlock.jsx";

import ProductSortDrawer from "../../components/ProductSort/ProductSortDrawer.jsx";

import ProductFilterDrawer from "../../components/ProductSort/ProductFilterDrawer.jsx";
import * as util from "./productFilterUtils.js";

export const ProductList = () => {
  const allParamFromNav = useParams();
  const { category: categoryFromNav } = allParamFromNav;

  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState();
  const [pageSize, setPageSize] = useState("24");
  const [pageNumber, setPageNumber] = useState("1");

  const [sortType, setSortType] = useState("id:asc");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState("sort");

  const [filters, setFilters] = useState(util.defaultFilters);

  const [availableBrands, setAvailableBrands] = useState([]);

  console.log("filters", filters);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const getProduct = async () => {
    setIsLoaded(false);

    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    const productFilterByCategory = categoryFromNav
      ? `[filters][categoryName][$eq]=${categoryFromNav}`
      : "";

    const brandFilterByCategory = categoryFromNav
      ? `filters[categories][titleForNav]=${categoryFromNav}`
      : "";

    const filterString = util.getFilterString(filters);
    console.log("filterString ", filterString);

    const res = await axios.get(
      `${url}/api/products/?pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&sort[1]=${sortType}&populate[1]=imagesSlider&${productFilterByCategory}&${filterString}`
    );

    const brandsRes = await axios.get(
      `${url}/api/brands?populate[0]=categories&&sort[0]=name:asc&${brandFilterByCategory}`
    );
    const availableBrands = brandsRes.data.data;
    const products = res.data.data;

    console.log("availableBrands: ", availableBrands);
    console.log("products: ", products);

    setQuantity(res.data.meta.pagination.total);
    setProducts(products);
    setAvailableBrands(availableBrands);
    setIsLoaded(true);
  };

  useEffect(() => {
    getProduct();
    return () => {
      setIsLoaded(false);
    };
  }, [pageNumber, pageSize, sortType, filters]);

  const filterCount = util.countFilters(filters);

  return (
    <>
      <ProductsMenu
        setDrawerType={setDrawerType}
        showDrawer={showDrawer}
        filterCount={filterCount}
        setSortType={setSortType}
      />
      {drawerType === "sort" ? (
        <ProductSortDrawer
          onClose={closeDrawer}
          open={isDrawerOpen}
          sortType={sortType}
          setSortType={setSortType}
        />
      ) : (
        <ProductFilterDrawer
          filterCount={filterCount}
          onClose={closeDrawer}
          open={isDrawerOpen}
          filters={filters}
          setFilters={setFilters}
          availableBrands={availableBrands}
          quantity={quantity}
        />
      )}
      {isLoaded && !products && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "50px",
            paddingBottom: "150px",
            fontSize: "30px",
          }}
        >
          Товарів немає
        </div>
      )}
      {isLoaded ? (
        <>
          <ul className={list.wrapper}>
            {products &&
              products.map((product) => (
                <ProductCard
                  className={show.itemList}
                  key={product.id}
                  product={product}
                />
              ))}
          </ul>
          <PaginationBlock
            pageNumber={pageNumber}
            pageSize={pageSize}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            total={quantity}
          />
        </>
      ) : (
        <PreloaderBlock />
      )}
    </>
  );
};
