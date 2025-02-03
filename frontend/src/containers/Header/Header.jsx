import header from "./Header.module.scss";

import logo from "./../../assets/image/logo.svg";

import basket from "./../../assets/image/icons/basket.svg";

import home from "./../../assets/image/icons/home.png";

import goods from "./../../assets/image/icons/goods.png";

import delivery from "./../../assets/image/icons/delivery.png";

import returns from "./../../assets/image/icons/returns.png";

import about from "./../../assets/image/icons/about.png";

import phone from "./../../assets/image/icons/phone.png";

import review from "./../../assets/image/icons/review.png";

import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BasketReducerContext } from "../../reducers/BasketReducer";
import { useMediaQuery } from "react-responsive";

export const Header = () => {
  let { basketState } = useContext(BasketReducerContext);

  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.classList.toggle("_lock");
  };
  const closeMenu = () => {
    setMenuActive(false);
    document.body.classList.remove("_lock");
  };

  const autoCloseMenu = (e) => {
    if (e.target instanceof HTMLDivElement) {
      if (!e.target.closest(`.${header.menuList}`)) {
        // console.log(e.target)
        document.body.classList.remove("_lock");
        setMenuActive(false);
      }
    }
  };

  const is1230 = useMediaQuery({ query: "(max-width: 1230px)" });

  useEffect(() => {
    document.addEventListener("click", autoCloseMenu);
    return () => {
      document.removeEventListener("click", autoCloseMenu);
    };
  }, []);

  return (
    <div className={header.wrapper}>
      <div className={header.container}>
        <div className={header.rows}>
          <button
            onClick={toggleMenu}
            className={
              menuActive
                ? `${header.burgerPC} ${header.burgerPCActive}`
                : `${header.burgerPC}`
            }
          >
            <span></span>
          </button>
          <NavLink to={"/"} className={header.logo} onClick={closeMenu}>
            <img src={logo} alt="logo" />
          </NavLink>
          <ul
            className={
              menuActive
                ? `${header.menuList} ${header.menuListActive}`
                : `${header.menuList}`
            }
          >
            {is1230 && (
              <li className={header.menuItem}>
                <NavLink
                  to={"/"}
                  className={`${header.catalogButton} ${header.link}`}
                  onClick={closeMenu}
                >
                  {is1230 && (
                    <span>
                      <img src={home} alt="home" />
                    </span>
                  )}
                  <p>Головна</p>
                </NavLink>
              </li>
            )}
            <li className={header.menuItem}>
              <NavLink
                to={"/product_list"}
                className={`${header.link} ${header.catalogButton}`}
                onClick={closeMenu}
              >
                {is1230 && (
                  <span>
                    <img src={goods} alt="goods" />
                  </span>
                )}
                <p>Товари та послуги</p>
              </NavLink>
            </li>
            <li className={header.menuItem}>
              <NavLink
                to={"/delivery"}
                onClick={closeMenu}
                className={header.link}
              >
                {is1230 && (
                  <span>
                    <img src={delivery} alt="delivery" />{" "}
                  </span>
                )}

                <p> Доставка і оплата</p>
              </NavLink>
            </li>
            <li className={header.menuItem}>
              <NavLink
                to={"/returns"}
                onClick={closeMenu}
                className={header.link}
              >
                {is1230 && (
                  <span>
                    <img src={returns} alt="returns" />{" "}
                  </span>
                )}
                <p> Повернення та обмін</p>
              </NavLink>
            </li>
            <li className={header.menuItem}>
              <NavLink
                to={"/about"}
                onClick={closeMenu}
                className={header.link}
              >
                {is1230 && (
                  <span>
                    <img src={about} alt="about" />
                  </span>
                )}
                <p>Про нас</p>
              </NavLink>
            </li>
            <li className={header.menuItem}>
              <NavLink
                to={"/contacts"}
                onClick={closeMenu}
                className={header.link}
              >
                {is1230 && (
                  <span>
                    <img src={phone} alt="phone" />{" "}
                  </span>
                )}
                <p>Контакти</p>
              </NavLink>
            </li>
            <li className={header.menuItem}>
              <NavLink
                to={"/testimonials"}
                onClick={closeMenu}
                className={header.link}
              >
                {is1230 && (
                  <span>
                    <img src={review} alt="review" />{" "}
                  </span>
                )}
                <p>Відгуки</p>
              </NavLink>
            </li>
          </ul>
        </div>
        {is1230 && (
          <NavLink to={"/"} className={header.logoS} onClick={closeMenu}>
            <img src={logo} alt="logo" />
          </NavLink>
        )}
        <div className={header.iconsList}>
          {
            <a
              href="tel:+38 099 544 4990"
              className={`${header.iconsItem} ${header.iconsPhone}`}
            >
              <img src={phone} alt="phone" />
              <p>+38 099 544 4990</p>
            </a>
          }
          {
            // !is1090 && <NavLink to={'/contacts'} className={header.iconsItem}>
            //     <img src={hours} alt="time work"/>
            // </NavLink>
          }

          <NavLink
            to={"/basket"}
            className={`${header.iconsItem} ${header.iconsItemBasket}`}
          >
            <img src={basket} alt="basket" />
            {basketState.quantityAll && basketState.quantityAll > 0 ? (
              <span>{basketState.quantityAll}</span>
            ) : null}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
