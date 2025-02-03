import pages from './Pages.module.scss'
import {Delivery} from "../blocks/Delivery/Delivery";
import {YouWatched} from "../containers/YouWatched/YouWatched";

export const DeliveryPage = () => {
    return(<div className={`${pages.containerDeliveryPage} ${pages.container}`}>
        <Delivery/>
        <YouWatched/>
    </div>)
}