import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./CategoriesList.module.scss";
import { PreloaderBlock } from "../../components/Prealoder/PreloaderBlock";

export const CategoriesList = () => {
  const [isLoad, setLoad] = useState(false);
  const [category, setCategory] = useState(null);

  const getCategories = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;
    const res = await axios.get(`${url}/api/categories?populate[0]=logo`);

    const listCategories = res.data.data.reverse().map((cat, index) => {
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
    getCategories();
  }, []);

  return (
    <>
      {isLoad ? (
        <div className={style.wrapper}>
          <h3 className={style.title}>Групи товарів та послуг</h3>
          <ul className={style.list}>{category}</ul>
        </div>
      ) : (
        <PreloaderBlock />
      )}
    </>
  );
};
