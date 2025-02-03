import footer from "./Footer.module.scss";
import phone from "./../../assets/image/icons/phone.png";
import viber from "./../../assets/image/icons/viber.png";
import telegram from "./../../assets/image/icons/telegram.png";
import logo from "./../../assets/image/logo.svg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  isMobile.any();

  return (
    <div className={footer.wrapper}>
      <div className={footer.head}>
        <NavLink to={"/"} className={footer.logo}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div>
        <div className={footer.text}>
          <p>
            Привіт! Ми знаємо все про електросамокати . Закуповуємо оригінальні
            електросамокати та запчастини гуртом, напряму у виробника в Китаї,
            тому пропонуємо максимально вигідні ціни. На всі самокати діє
            гарантія від 12 місяців. А ще в нас є власний сервіс з ремонту, тому
            купуючи самокат, ти ніколи не матимеш проблем
          </p>
        </div>
      </div>
      <div className={footer.links}>
        <a className={footer.link} target={"_blank"} href="tel:+380631116163">
          <img src={phone} alt="phone" />
        </a>
        {isMobile.any() ? (
          <a
            className={footer.link}
            target={"_blank"}
            href="viber://add?number=380631116163"
          >
            <img src={viber} alt="viber" />
          </a>
        ) : (
          <a
            className={footer.link}
            target={"_blank"}
            href="viber://chat?number=+380631116163"
          >
            <img src={viber} alt="viber" />
          </a>
        )}
        <a className={footer.link} href="tg://resolve?domain=Space_Showroom">
          <img src={telegram} alt="telegram" />
        </a>
      </div>
    </div>
  );
};
