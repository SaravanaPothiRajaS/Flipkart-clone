import { useState } from 'react';
import './placeOrder.css';
import orderPlaced from "../../../Assets/Images/orderPlaced.gif"

export default function PlaceOrder({viewProduct,close}){

    const[prCount,setPrCount]=useState(1)
    const[pageState,setPageState]=useState(true)
    const actulPrise=(viewProduct?.price / (1 - (viewProduct?.discountPercentage / 100))).toFixed(2)
    function handlePrCount(e,type){
        e.stopPropagation();
        if(type === "sub" && prCount >= 2 ){
            setPrCount(prCount - 1)
        }else if(type === "add" && prCount <10 ){
            setPrCount(prCount + 1)
        }else{
            document.getElementById("onlyten").innerText="* Please select the product 1 to 10"; 
           }
    }

    return(
        <div className="olay-bg" onClick={()=>close(false)}>
        <div className="olay-login-cont animated-overlay" onClick={(e)=>e.stopPropagation()}>
       {pageState ? <div className="price-detail-cont width100 overlay-buy">
            <h4>PRICE DETAILS</h4>
            <section className='how-many-pr'>
                <p>Item <button onClick={(e)=>handlePrCount(e,"sub")}>-</button><span>{prCount}</span><button onClick={(e)=>handlePrCount(e,"add")}>+</button></p>
                <p>$ {(prCount * actulPrise).toFixed(2)}</p> 
            </section>
           {prCount === 10 && <div id="onlyten"></div>}
            <section>
                <p>Discount</p>
                <p className="gr-txt"> - $ {(prCount * (actulPrise - viewProduct?.price)).toFixed(2)}</p>
            </section>
            <section>
                <p>Delivery Charges </p>
                <p className="gr-txt">Free</p>
            </section>
            <section className="total-am">
                <h3>Total Amount</h3>
                <p>$ {(prCount * (viewProduct?.price)).toFixed(2)}</p>
            </section>
            <p className="gr-txt you-save-txt">You will save $ {`${(prCount * (actulPrise - viewProduct?.price)).toFixed(2)}`} on this order</p>
            <button  className="place-order-btn" onClick={()=>setPageState(false)}>Place Order</button>
        </div>
        :
        <div className='op-div'>
            <img src={orderPlaced} alt="orderplaced" />
        </div>
        }
        </div>
    </div>
    )
}