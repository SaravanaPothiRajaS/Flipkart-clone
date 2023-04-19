
import "./Cart.css"
import star from "../../Assets/Icon/star.png";
import { useContext, useEffect, useState } from "react";
import { Trash } from "../../Assets/Icon/Icon";
import orderPlaced from "../../Assets/Images/orderPlaced.gif"
import FlipContext from "../../Hooks/flipcontext";


export default function Cart(){

    const {cartData,setCartData}=useContext(FlipContext);
    const [actualPrices, setActualPrices] = useState([]);
    const [offerPrices, setOfferPrices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalOfferPrice, setTotalOfferPrice] = useState(0);
    const[placedState,setPlacedState]=useState(false)

    const calculateActualPrice = (offerPrice, discountPercentage) => {
        return offerPrice / (1 - (discountPercentage / 100));
      }
    
      const handleCalculateActualPrices = () => {
        const prices = cartData?.map(item => ({
          ...item,
          actualPrice: calculateActualPrice(item.price, item.discountPercentage)
        }));
        setActualPrices(prices);
        const total = prices.reduce((acc, curr) => acc + curr.actualPrice, 0);
        setTotalPrice(total);
      }
      const handleOfferPrice=(offerPrice,discountPercentage)=>{
        return (offerPrice / (1 - (discountPercentage / 100))) - offerPrice;
      }

      const handleCalculateOfferPrice=()=>{
          const offerPrs= cartData?.map(item=>({
              ...item,
              offerPrice: handleOfferPrice(item.price, item.discountPercentage)
            }));
            setOfferPrices(offerPrs)
            const totalOPrs=offerPrs.reduce((prev,curr)=>prev + curr.offerPrice,0)
            setTotalOfferPrice(totalOPrs)
        }
        useEffect(()=>{
            // if(localStorage.getItem('cart')){
                setCartData(JSON.parse(localStorage.getItem('cart')))
            // }
            if(cartData?.length > 0){
                handleCalculateActualPrices()
                handleCalculateOfferPrice()
            }
        },[cartData])
        
function handleRemove(e,rmProd){
    e.stopPropagation();
    setCartData((prev)=>{
      const  removed = prev.filter(item=>item !== rmProd)
      localStorage.setItem('cart',JSON.stringify(removed))
        return removed
    })
}


    return(
        <div className="cart-main-cont animated">
        <div className="body-cont-cart">
           <h2 className="mw-h3">Cart {`(${cartData?.length})`}</h2>
     {cartData?.map((item,i)=>{
        return(             
           <section className="fac-card-div" key={i}>
            <div className="fav-pr-img">
            <img src={item?.thumbnail} alt="favimg" className="favimg"/>
            </div>
            <div className="fav-cord-desc">
                <p>{item?.title}</p>
                <div className="pr-price-detail">
                    <section className="pr-fassur">
                    <button className="star-btn"><span>{item?.rating}</span><img src={star} alt="" className="star-icon" /></button>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className="f-assur-img" />
                    </section>
                    <div className="fav-price">
                    <h2 className="online-txt">${item?.price}</h2>
                    <p className="pr-price">${(item?.price / (1 - (item?.discountPercentage / 100))).toFixed(2)}</p>
                    <p className="pr-price">{item?.discountPercentage}%</p>
                    </div>
               </div>
            </div>
            <button className="fav-remove-btn" onClick={(e)=>handleRemove(e,item)}>
        <span>Remove</span>
        <Trash className='trash-svg'/>
        </button>
           </section>
           )
         })}
               { cartData?.length <= 0 && <p className="no-add">no added product in cart</p>}
        </div>
{cartData?.length > 0 &&
        <div className="price-detail-cont">
            <h4>PRICE DETAILS</h4>
            <section>
                <p>Price ({cartData.length} item)</p>
                <p>$ {totalPrice.toFixed(2)}</p>
            </section>
            <section>
                <p>Discount</p>
                <p className="gr-txt">- $ {totalOfferPrice.toFixed(2)}</p>
            </section>
            <section>
                <p>Delivery Charges </p>
                <p className="gr-txt">Free</p>
            </section>
            <section className="total-am">
                <h3>Total Amount</h3>
                <p>$ {(totalPrice - totalOfferPrice).toFixed(2)}</p>
            </section>
            <p className="gr-txt you-save-txt">You will save $ {`${totalOfferPrice.toFixed(2)}`} on this order</p>
            <button  className="place-order-btn" onClick={()=>setPlacedState(true)}>Place Order</button>
        </div>
        }
         {placedState && <div className="olay-bg" onClick={()=>setPlacedState(false)}>
        <div className="olay-login-cont animated-overlay" onClick={(e)=>e.stopPropagation()}>
        <div className='op-div'>
            <img src={orderPlaced} alt="orderplaced" />
        </div>
            </div>
            </div>}
        </div>
    )
}
