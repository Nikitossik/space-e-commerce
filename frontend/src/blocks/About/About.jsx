import about from "./About.module.scss";

import aboutImage from "./../../assets/image/logo-colorfull.svg";

export const About = () => {
  return (
    <div className={about.wrapper}>
      <h2 className={about.title}>SHOWROOM SPACE</h2>
      <div className={about.image}>
        <img src={aboutImage} alt="about logo" />
      </div>
      <div className={about.text}>
        <p>
          Магазин "SPACE" - допоможе обрати Вам електротранспорт! Наш досвід
          дозволяє нам задовольнити максимум ваших потреб та побажань.
        </p>
        <p>
          {" "}
          Філософія магазину "SPACE" використовує нові принципи підходу до
          сервісу.
        </p>
        <p>
          Ми враховуємо всі запити наших покупців та робимо процес купівлі
          максимально комфортним.
        </p>
      </div>
    </div>
  );
};
