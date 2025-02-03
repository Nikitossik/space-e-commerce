import pages from "./Pages.module.scss";
import { CategoriesList } from "../containers/CategoriesList/CategoriesList";
import { ProductList } from "../containers/ProductList/ProductList";

export const ProductListPage = () => {
  return (
    <div className={`${pages.containerProductListPage} ${pages.container}`}>
      <CategoriesList />
      <ProductList />
    </div>
  );
};
