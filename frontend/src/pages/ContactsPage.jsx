import pages from './Pages.module.scss'
import {Contacts} from "../blocks/Contacts/Contacts";
import {YouWatched} from "../containers/YouWatched/YouWatched";
export const ContactsPage = () => {
    return(<div className={`${pages.containerContactsPage} ${pages.container}`}>
        <Contacts/>
        <YouWatched/>
    </div>)
}