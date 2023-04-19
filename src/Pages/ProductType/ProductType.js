import { useContext, useEffect, useState } from "react";
import FlipContext from "../../Hooks/flipcontext";
import "./ProductType.css";
import star from "../../Assets/Icon/star.png"
import heart from "../../Assets/Icon/heart.png"
import { useNavigate } from "react-router-dom";
import RoutePath from "../../Utils/RoutePath";
import disheart from "../../Assets/Icon/disheart.png"

export default function ProductType() {

    const navigateTo = useNavigate();
    const { products } = useContext(FlipContext)
    const clickCatogery = localStorage.getItem("clickCAtogery")
    const [favorites, setFavorites] = useState([]);
     
    useEffect(() => {
        if (localStorage.getItem('favorites')) {
            setFavorites(JSON.parse(localStorage.getItem('favorites')))
        }
    }, [])


    function handleViewProduct(e,viewProduct) {
        e.stopPropagation();
        localStorage.setItem('viewProduct',JSON.stringify(viewProduct))
        navigateTo(RoutePath.viewprod)
    }
    function handleFavorites(e, favProd) {
        e.stopPropagation();
        if (!favorites?.find(favoritesElem => favoritesElem.id === favProd.id)) {
            setFavorites((prev) => {
                const merged = [...prev, favProd];

                localStorage.setItem('favorites', JSON.stringify(merged))

                return merged
            })
        } else {
            setFavorites((prev) => {
                const removed = prev.filter(item => item.id !== favProd.id)
                localStorage.setItem('favorites', JSON.stringify(removed))
                return removed
            })

        }
    }

    return (
        <div className="vc-cont">
            <div className="view-cat-cont" >
                {products?.filter((item) => item.category === clickCatogery)?.map((item, i) => {
                  
                    return (
                        <>
                            <div className="vc-right-cont animated" key={i} onClick={(e)=>handleViewProduct(e,item)}>
                                <div className="thump-fav">
                                    <img src={item?.thumbnail} alt="" className="vc-l-img" />
                                    <button className="add-fav-btn" onClick={(e) => handleFavorites(e, item)}><img
                                     src={favorites.includes(item) ? heart : disheart}
                                     alt="" className="add-fav-icon" /></button>
                                </div>

                                <div className="pr-spcs-deat">
                                    <h2>{item.title}</h2>
                                    <button className="star-btn"><span>{item.rating}</span><img src={star} alt="" className="star-icon" /></button>
                                    <ul className="offer-specs">
                                        <li>{item.description}</li>
                                        {/* <li>{"Bank Offer?15 off on UPI Txns upto 5 times per userT&C"}</li>
                                        <li>{"Bank Offer5% Cashback on Flipkart Axis Bank CardT&C"}</li>
                                        <li>{"Special PriceGet at flat ?149T&C"}</li>
                                        <li>{"Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ?500*"}</li>
                                        <li>{"Partner OfferPurchase now & get 1 surprise cashback coupon till November 2023"}</li> */}
                                    </ul>

                                </div>

                                <div className="pr-price-detail">
                                    <section className="pr-fassur">
                                        <h2>$ {item.price}</h2><img src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className="f-assur-img" />
                                    </section>
                                    <p className="pr-price">${(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}</p>
                                    <p className="pr-price">{item.discountPercentage}%</p>
                                    <p className="free-dtxt">free Delivery</p>
                                    <p className="bank-offer-txt">Bank Offer</p>
                                    <p>Available Exange Offer</p>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>


            {/* {products.filter((item)=>item.category === clickCatogery).map((item,i)=>{
    return(
<p key={i}>{item.title}</p>

    )
})} */}
        </div>
    )
}