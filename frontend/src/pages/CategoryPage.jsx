import pages from "./Pages.module.scss";
import { Category } from "../containers/Category/Category";
import { ProductList } from "../containers/ProductList/ProductList";

export const CategoriesPage = () => {
  return (
    <div className={`${pages.containerCategoryPage} ${pages.container}`}>
      <Category />
      <ProductList />
    </div>
  );
};
