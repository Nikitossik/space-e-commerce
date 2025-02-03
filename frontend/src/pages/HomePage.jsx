import pages from "./Pages.module.scss";
import { MainSlider } from "../blocks/MainSlider/MainSlider";
import { ShowCase } from "../containers/ShowCase/ShowCase";
import { Recommendation } from "../containers/Recommendation/Recommendation";
import { YouWatched } from "../containers/YouWatched/YouWatched";
import { CategoriesListMore } from "../containers/CategoriesList/CategoriesListMore";
import { CategoriesList } from "../containers/CategoriesList/CategoriesList";
import { useMediaQuery } from "react-responsive";
import { ResponsesAboutUs } from "../containers/Responses/ResponsesAboutUs";

export const HomePage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div>
      <MainSlider />
      <div className={`${pages.containerHomePage} ${pages.container}`}>
        {isMobile ? <CategoriesListMore /> : <CategoriesList />}
        <ShowCase />
        <ResponsesAboutUs />

        <YouWatched />
        <Recommendation />
      </div>
    </div>
  );
};
