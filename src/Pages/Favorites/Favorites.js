
import "./Favorites.css";
import star from "../../Assets/Icon/star.png";
import { useContext, useEffect, useState } from "react";
import { Trash } from "../../Assets/Icon/Icon";
import FlipContext from "../../Hooks/flipcontext";


export default function Favorites(){

    const {favList,setFavList}=useContext(FlipContext)
useEffect(()=>{
     setFavList(JSON.parse(localStorage.getItem('favorites')))
},[favList])


function handleRemove(e,rmFav){
    e.stopPropagation();
    setFavList((prev)=>{
        const removedFav=prev.filter(item=>item.id !== rmFav.id) 
        localStorage.setItem('favorites',JSON.stringify(removedFav))
        return removedFav;
    })
}

    return(
        <div className="body-cont-fav animated">
         
         <div className="fav-big-card">
         <h2 className="mw-h3">My Wishlist ({favList.length})</h2>
{favList.map((item,i)=>{
    return(
        <section className="fac-card-div" key={i}>
        <div className="fav-pr-img">
        <img src={item.thumbnail} alt="favimg" className="favimg" />
        </div>
        <div className="fav-cord-desc">
            <p>{item.title}</p>
            <div className="pr-price-detail">
                <section className="pr-fassur">
                <button className="star-btn"><span>{item.rating}</span><img src={star} alt="" className="star-icon" /></button>
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className="f-assur-img" />
                </section>
                <div className="fav-price">
                <h2 className="online-txt">$ {item.price}</h2>
                <p className="pr-price">${(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}</p>
                <p className="pr-price"> {item.discountPercentage}%</p>
                </div>
           </div>
        </div>
        <button className="fav-remove-btn" onClick={(e)=>handleRemove(e,item)}>
        <span>Remove</span>
        <Trash className='trash-svg'/>
        </button>
       </section>
    )
})
         
}
{ favList.length <= 0 && <p className="no-add">no added product in Wishlist</p>}
         </div>
        </div>
    )
}
