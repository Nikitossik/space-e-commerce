import dev from "./Delivery.module.scss";

export const Delivery = () => {
  return (
    <div className={dev.wrapper}>
      <h4 className={dev.title}>Умови доставки та оплати</h4>
      <div className={dev.delivery}>
        <h5 className={dev.subTitle}>Способи доставки</h5>
        <ul className={dev.list}>
          <li className={dev.itemList}>Доставка кур'єром</li>
          <li className={dev.itemList}>
            <p>Самовивіз</p>
            <p>
              При самостійному отриманні товару з пункту видачі можлива зміна
              ціни порівняно з ціною інтернет-замовлення.
            </p>
          </li>
          <li className={dev.itemList}>
            <p>Нова Пошта</p>
            <p>Доставка доступна лише з передоплатою від 100 гривень.</p>
          </li>
        </ul>
      </div>
      <div className={dev.pay}>
        <h5 className={dev.subTitle}>Способи оплати</h5>
        <ul className={dev.list}>
          <li className={dev.itemList}>
            <p>Пром-оплата</p>
          </li>
          <li className={dev.itemList}>
            <p>Післяплата</p>
          </li>
          <li className={dev.itemList}>
            <p>
              Оплата при отриманні (2% + 20 гривень) — покупець оплачує цю
              послугу.
            </p>
          </li>
          <li className={dev.itemList}>
            <p>Оплата картою Visa, Mastercard - WayForPay</p>
          </li>
          <li className={dev.itemList}>
            <p>Оплата на картку / Розстрочка / Кредит</p>
          </li>
          <li className={dev.itemList}>
            <p>Готівка</p>
            <p>Оплата готівкою в магазині.</p>
          </li>
          <li className={dev.itemList}>
            <p>Оплата за реквізитами</p>
          </li>
          <li className={dev.itemList}>
            <p>Післяплата через "Нову Пошту"</p>
            <p>
              Оплата при отриманні (2% + 20 гривень) — покупець оплачує цю
              послугу.
            </p>
          </li>
        </ul>
      </div>
      <div className={dev.guarantee}>
        <h5 className={dev.subTitle}>Гарантія:</h5>

        <h6>Сервіс і гарантії</h6>
        <p>
          - Ми приділяємо особливу увагу якості наших товарів і уникненню
          необхідності у ремонті гіроскутерів, сигвеїв та іншого
          електротранспорту, тому в нашому асортименті ви не знайдете
          низькоякісних продуктів. Ретельний відбір брендів і фабрик, на яких
          виробляються товари, а також додаткове тестування дозволяють нам
          зменшити кількість браку.
        </p>
        <h6>Гарантійний термін</h6>
        <p>- Ми надаємо гарантію на всі товари від 6 місяців до 2 років.</p>
        <h6>Післягарантійний сервіс</h6>
        <p>
          - Навіть після закінчення гарантійного терміну ми готові допомогти
          вам. Ремонт оплачується покупцем.
        </p>
        <h6>Зворотна доставка</h6>
        <p>- Вартість зворотної доставки товару оплачує покупець.</p>
      </div>
    </div>
  );
};
