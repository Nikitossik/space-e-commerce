import category from "./Category.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { PreloaderBlock } from "../../components/Prealoder/PreloaderBlock";

export const Category = () => {
  const allParamFromNav = useParams();

  const categoryFromNav = allParamFromNav.category;

  const [currentCategory, setCategory] = useState(null);

  const getCategory = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    const res = await axios.get(`${url}/api/categories/?populate=*`);
    const findCategory = res.data.data.find(
      (el) => el.attributes.titleForNav === categoryFromNav
    );
    setCategory(findCategory.attributes);
  };

  useEffect(() => {
    getCategory();
  }, [categoryFromNav]);

  return currentCategory ? (
    <div className={category.wrapper}>
      <h1 className={category.title}>{currentCategory.title}</h1>
      <div className={category.description}>
        <Markdown>{currentCategory.description}</Markdown>
      </div>
    </div>
  ) : (
    <PreloaderBlock />
  );
};
