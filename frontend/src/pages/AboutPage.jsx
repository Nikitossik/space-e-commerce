import pages from "./Pages.module.scss";
import { About } from "../blocks/About/About";

export const AboutPage = () => {
  return (
    <div className={`${pages.containerAboutPage} ${pages.container}`}>
      <About />
    </div>
  );
};
