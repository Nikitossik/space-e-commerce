import product from './ProductItemSlider.module.scss'
import {NavLink} from "react-router-dom";

type ProductItemSliderPropsType = {
    image: string
    title:string
    oldPrice: string | null
    relevantPrice:string
    categoryNav: string
    id: string
}




export const ItemOfSlider = ({image, title, oldPrice, relevantPrice, categoryNav, id}  : ProductItemSliderPropsType) => {


    const addProductToLocalStorage = () => {
        if (product) {
            const prod = {
                title: title,
                id: id,
                oldPrice: oldPrice,
                relevantPrice: relevantPrice,
                image: image,
                category: categoryNav
            }
            // localStorage.clear()
            //@ts-ignore
            if (JSON.parse(localStorage.getItem('arr')) === null) {
                //@ts-ignore
                localStorage.setItem('arr', JSON.stringify([]))
            }
            //@ts-ignore
            if (JSON.parse(localStorage.getItem('arr'))) {
                //@ts-ignore
                const arr = JSON.parse(localStorage.getItem('arr'))
                //@ts-ignore
                const filteredArr = arr.filter(el => el.id !== prod.id).slice(0,12)
                const newArr = [prod, ...filteredArr]
                //@ts-ignore
                localStorage.setItem(`arr`, JSON.stringify(newArr))
            }
            // console.log(JSON.parse(localStorage.getItem('arr')))
        }

    }

    return (

        <NavLink
            to={`/product_list/${categoryNav}/${id}/${title}`}
            className={product.item}
            onClick={addProductToLocalStorage}
        >
            <div className={product.image}>
                <img src={image} alt={title}/>
            </div>
            <h4 className={product.title}>{title}</h4>
            <div className={product.prices}>
                {
                    oldPrice
                        ? <>
                            <div style={{color: '#c13', fontSize: '16px'}}>{relevantPrice} ₴</div>
                            <div style={{
                                opacity: '0.85',
                                textDecoration: 'line-through',
                                fontSize: '14px',
                                fontWeight: '400'
                            }}>{!!oldPrice && `${oldPrice} ₴`}</div>
                        </>
                        : <div style={{color: '#333333', fontSize: '16px'}}>{relevantPrice} ₴</div>
                }
            </div>

        </NavLink>
    )
}