import pages from "./Pages.module.scss";
import { OrderDataForm } from "../containers/OrderDataForm/OrderDataForm";

export const OrderPage = () => {
  return (
    <div className={pages.wrapperOrderPage}>
      <div className={`${pages.containerOrderPage} ${pages.container}`}>
        <OrderDataForm />
      </div>
    </div>
  );
};
