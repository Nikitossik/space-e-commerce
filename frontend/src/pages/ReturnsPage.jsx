import pages from './Pages.module.scss'
import {Returns} from "../blocks/Returns/Returns";
import {YouWatched} from "../containers/YouWatched/YouWatched";
export const ReturnsPage = () => {
    return(
        <div className={`${pages.containerReturnsPage} ${pages.container}`}>
            <Returns/>
            <YouWatched/>
        </div>
    )
}