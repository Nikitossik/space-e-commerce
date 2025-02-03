import returns from "./Returns.module.scss";

export const Returns = () => {
  return (
    <div className={returns.wrapper}>
      <h2 className={returns.title}>Повернення та обмін</h2>
      {/* <p>
        Компанія здійснює повернення та обмін товарів належної якості згідно
        Закону
        <a
          target="_blank"
          href="https://zakon.rada.gov.ua/laws/show/1023-12#Text"
        >
          «Про захист прав споживачів».
        </a>
      </p> */}
      <h3 className={returns.subTitle}>Строки повернення і обміну</h3>
      <p>
        Повернення та обмін товарів можливий протягом <b>14 днів</b> після
        отримання товару покупцем.
      </p>
      <p>Зворотня доставка товарівздійснюється за рахунок покупця.</p>
      <h3 className={returns.subTitle}>
        Умови повернення для товарів належної якості
      </h3>
      <p>
        Обмін та повернення товару, купленого в інтернет-магазині "TESLA",
        здійснюється відповідно до Закону України "Про захист прав споживачів".
      </p>
      <p>
        Покупець може обміняти або повернути товар протягом 14 днів з моменту
        покупки, якщо він відповідає встановленим умовам.
      </p>

      <h3 className={returns.subTitle}>Відповідно закону</h3>
      <p>
        Закон{" "}
        <a
          target="_blank"
          href="https://zakon.rada.gov.ua/laws/show/1023-12#Text"
        >
          «Про захист прав споживачів»
        </a>{" "}
        надає право компанії відмовити в обміні або поверненні товарів належної
        якості за певних умов, зазначених у чинному{" "}
        <a
          target="_blank"
          href="https://zakon.rada.gov.ua/laws/show/172-94-%D0%BF#Text"
        >
          Переліку.
        </a>
      </p>
    </div>
  );
};
