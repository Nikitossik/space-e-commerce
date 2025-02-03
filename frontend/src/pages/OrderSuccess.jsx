import {SuccessOrder} from "../blocks/SuccessOrder/SuccessOrder";
import pages from "./Pages.module.scss";

export const OrderSuccess = () => {
    return(
        <div className={`${pages.containerOrderSuccess} ${pages.container}`}>
            <SuccessOrder/>
        </div>)
}