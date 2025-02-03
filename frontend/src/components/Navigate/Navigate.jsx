import nav from './Navigate.module.scss';

import homeIcon from './../../assets/image/icons/home.png';

import arrow from './../../assets/image/icons/arrow.png';

export const Navigate = () => {
    return(
        <div className={nav.wrapper}>
            <div className={nav.container}>
                <div className={nav.home}>
                    <img src={homeIcon} alt="home"/>
                </div>
                <div className={nav.arrow}>
                    <img src={arrow} alt="home"/>
                </div>
                <div>Навігація</div>
            </div>
        </div>
    )
}