import contacts from "./Contacts.module.scss";
import mapImg from "./../../assets/image/map.jpg";

export const Contacts = () => {
  return (
    <div className={contacts.wrapper}>
      <h2 className={contacts.title}>Контакти</h2>
      <ul className={contacts.list}>
        <li className={contacts.row}>
          <div className={contacts.columnTitle}>Назва:</div>
          <div className={contacts.columnDicscrip}>SPACE</div>
        </li>
        <li className={contacts.row}>
          <div className={contacts.columnTitle}>Контактна особа:</div>
          <div className={contacts.columnDicscrip}>Менеджер</div>
        </li>
        <li className={contacts.row}>
          <div className={contacts.columnTitle}>Сайт компанії:</div>
          <a
            target={"_blank"}
            className={contacts.columnDicscrip}
            href={"https://space.in.ua/"}
          >
            space.in.ua
          </a>
        </li>
        <li className={contacts.row}>
          <div className={contacts.columnTitle}>Адреса:</div>
          <a
            href={
              "https://www.google.com/maps/place/%D0%9D%D0%BE%D0%B2%D0%B8%D0%B9+%D0%BA%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82/@48.4291288,35.0627632,17z/data=!3m1!4b1!4m6!3m5!1s0x40dbfcc71e1af1a5:0xa839beddb4fdaf6!8m2!3d48.4291288!4d35.0653381!16s%2Fg%2F11hys_tkr_?entry=ttu"
            }
            className={contacts.columnDicscrip}
          >
            вулиця Набережна Перемоги, 86-а, Дніпро, Дніпропетровська область
          </a>
        </li>
        <li className={contacts.row}>
          <div className={contacts.columnTitle}>Телефон:</div>
          <a href="tel:+38 099 544 4990" className={contacts.columnDicscrip}>
            +38 099 544 4990
          </a>
        </li>
      </ul>
      <div className={contacts.button}>Графік роботи:</div>
      <div className={contacts.gravel}>
        <div className={contacts.gravelRowHeader}>
          <div className={contacts.gravelDay}>День</div>
          <div className={contacts.gravelTime}>Години роботи</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Понеділок</div>
          <div className={contacts.gravelTime}>09:00 - 19:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Вівторок</div>
          <div className={contacts.gravelTime}>09:00 - 19:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Середа</div>
          <div className={contacts.gravelTime}>09:00 - 19:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Четвер</div>
          <div className={contacts.gravelTime}>09:00 - 19:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>П'ятниця</div>
          <div className={contacts.gravelTime}>09:00 - 19:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Субота</div>
          <div className={contacts.gravelTime}>10:00 - 18:00</div>
        </div>
        <div className={contacts.gravelRow}>
          <div className={contacts.gravelDay}>Неділя</div>
          <div className={contacts.gravelTime}>11:00 - 16:00</div>
        </div>
      </div>
      <p className={contacts.p}>в ТЦ "Новий Континент"</p>
      <a
        href={
          "https://www.google.com/maps/place/%D0%9D%D0%BE%D0%B2%D0%B8%D0%B9+%D0%BA%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82/@48.4291288,35.0627632,17z/data=!3m1!4b1!4m6!3m5!1s0x40dbfcc71e1af1a5:0xa839beddb4fdaf6!8m2!3d48.4291288!4d35.0653381!16s%2Fg%2F11hys_tkr_?entry=ttu"
        }
        className={contacts.map}
      >
        <img src={mapImg} alt="" />
        {/*<Map/>*/}
      </a>
    </div>
  );
};
