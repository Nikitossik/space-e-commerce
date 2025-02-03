import hmac_md5 from "crypto-js/hmac-md5";
import bas from "../../Basket/Basket.module.scss";

// const merchantAccount = 'test_merch_n1'
// const secret = 'flk3409refn54t54t*FNJRET';
// const merchantDomain = 'www.market.ua'

export const PaymentCard = ({
  orderReference,
  orderDate,
  amount,
  product,
  basketQuantityAll,
  makeOrder,
  defaultPaymentSystem = null,
  paymentSystems = null,
  buttonPlaceholder,
}) => {
  // const merchantAccount = 'inspace_in_ua'
  // const secret = '593b9727939b63af9b150da562013c0cb0b8b910';
  // const merchantDomain = 'http://space.in.ua'

  const merchantAccount = import.meta.env.SECRET_MERCHANT_ACCOUNT;

  const secret = import.meta.env.VITE_SECRET_MERCHANT_ACCOUNT;

  const merchantDomain = import.meta.env.VITE_SECRET_MERCHANT_DOMAIN;

  const productNameArray = product
    .map((product) => `${product.title}`)
    .join(";");
  const productCountArray = product
    .map((product) => `${product.quantity}`)
    .join(";");
  const productPriceArray = product
    .map((product) => `${product.relevantPrice}`)
    .join(";");

  const productNameInputArray = product.map((product) => (
    <input name="productName[]" value={product.title} />
  ));
  const productCountInputArray = product.map((product) => (
    <input name="productCount[]" value={product.quantity} />
  ));
  const productPriceInputArray = product.map((product) => (
    <input name="productPrice[]" value={product.relevantPrice} />
  ));

  const data = `${merchantAccount};${merchantDomain};${orderReference};${orderDate};${amount};UAH;${productNameArray};${productCountArray};${productPriceArray}`;

  const hmacDigest = hmac_md5(data, secret).toString();

  const baseUrlSuccessPage = `${import.meta.env.VITE_BASE_URL}/order_success`;

  return (
    <div>
      <form
        method="post"
        action="https://secure.wayforpay.com/pay"
        accept-charset="utf-8"
      >
        <div style={{ display: "none" }}>
          <input name="merchantAccount" value={merchantAccount} />
          <input name="merchantAuthType" value="SimpleSignature" />
          <input name="merchantDomainName" value={merchantDomain} />
          <input name="merchantSignature" value={hmacDigest} />
          <input name="orderReference" value={orderReference} />
          <input name="orderDate" value={orderDate} />
          <input name="amount" value={amount} />
          <input name="language" value="UA" />
          <input name="currency" value="UAH" />
          <input name="orderTimeout" value="49000" />
          <input name="returnUrl" value={baseUrlSuccessPage} />
          {paymentSystems && (
            <input name="paymentSystems" value={paymentSystems} />
          )}
          {productNameInputArray}
          {productCountInputArray}
          {productPriceInputArray}
          {defaultPaymentSystem && (
            <input name="defaultPaymentSystem" value={defaultPaymentSystem} />
          )}
        </div>
        <button
          onClick={() => makeOrder(false)}
          disabled={!basketQuantityAll && true}
          className={bas.btnOrder}
          type="submit"
        >
          {buttonPlaceholder}
        </button>
      </form>
    </div>
  );
};
