import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./CategoriesList.module.scss";
import { PreloaderBlock } from "../../components/Prealoder/PreloaderBlock";

export const CategoriesListMore = () => {
  const [isLoad, setLoad] = useState(false);
  const [category, setCategory] = useState(null);
  const [isMobile, setMobile] = useState(true);

  const getCategories = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;
    const res = await axios.get(`${url}/api/categories?populate[0]=logo`);

    const listCategories = res.data.data.map((cat, index) => {
      return (
        <li className={style.item} key={index}>
          <NavLink
            to={`/product_list/${cat.attributes.titleForNav}`}
            className={style.link}
          >
            <div className={style.image}>
              <img
                src={`${url}${cat.attributes.logo.data.attributes.url}`}
                alt={cat.attributes.title}
              />
            </div>
            <div className={style.name}>{cat.attributes.title}</div>
          </NavLink>
        </li>
      );
    });

    setCategory(listCategories);
    setLoad(true);
  };

  useEffect(() => {
    window.addEventListener("change", () => {
      window.innerWidth < 767 && setMobile(true);
    });
    getCategories();
  }, []);

  return (
    <>
      {isLoad ? (
        <div className={style.wrapper}>
          {isMobile ? (
            <h3 className={style.title}>Групи товарів та послуг</h3>
          ) : (
            <h3 className={style.title}>Популярні групи</h3>
          )}
          {isMobile ? (
            <ul className={style.list}>
              {isMobile && category && category.slice([0], [6])}
            </ul>
          ) : (
            <ul className={style.list}>{category}</ul>
          )}
          {isMobile && (
            <NavLink className={style.buttonAll} to={"/product_list"}>
              <span>Дивитися всі групи</span>
            </NavLink>
          )}
        </div>
      ) : (
        <PreloaderBlock />
      )}
    </>
  );
};
