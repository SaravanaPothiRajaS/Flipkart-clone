import "./ViewProduct.css";
import star from "../../Assets/Icon/star.png"
import { useEffect, useState } from "react";
import PlaceOrder from "../Overlays/placeOrder/placeOrder";

function ViewProduct() {

    const [viewProduct, setViewProduct] = useState()
    const [viewBigImg, setViewBigImg] = useState(0)
    const [placedorder,setPlacedOrder]=useState(false)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setViewProduct(JSON.parse(localStorage.getItem('viewProduct')))
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    function handleCart() {
        setCart((prev) => {
            const addCart = [...prev, viewProduct]
            localStorage.setItem('cart', JSON.stringify(addCart))
            return addCart
        })
        alert("Add to card Successfully")
    }
    return (
        <>
            {
                <div className="view-prod animated">
                    <div className="view-prod-left">
                        <div className="images-cont">
                            <div className="small-imgs">
                                {viewProduct?.images?.map((img, i) => {
                                    return (
                                        <img src={img} alt="" className="select-sm-img" key={i} onMouseOver={() => setViewBigImg(i)} />
                                    )
                                })
                                }
                            </div>

                            <div className="big-img">
                                {viewProduct?.images?.map((img, i) => {
                                    return (
                                        <img src={img} alt="" key={i} className="select-big-img" style={{ transform: `translateX(-${100 * viewBigImg}%)` }} />
                                    )
                                })
                                }
                            </div>

                        </div>
                        <section className="add-buy-btns">
                            <button className="card-addbtn" onClick={handleCart}><i className="fas fa-shopping-cart cardbt"></i>Add to Card</button>
                            <button className="buy-btn" onClick={()=>setPlacedOrder(true)} ><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMHY3LjdoMi4xVjE0TDcgNS42SDQuMkw3IDAiIGZpbGw9IiNGRkYiLz48L3N2Zz4="alt="" />
                              <p>Buy Now</p></button>
                        </section>
                    </div>
                    <div className="view-prod-right">
                        <div className="pr-spcs-deat  width100">
                            <h2>{viewProduct?.title}</h2>
                            <section className="title-rat-star">
                                <button className="star-btn"><span>{viewProduct?.rating}</span><img src={star} alt="" className="star-icon" /></button>
                                <p className="nowraptxt">3,489 Ratings {"&"} 430 Reviews</p>
                                <img src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className="f-assur-img2" />
                            </section>

                            <p>Special price</p>
                            <section className="vp-prdeta">
                                <h1 className="vp-selling-price">$ {viewProduct?.price}</h1>
                                <span className="vp-actual-price">$ {(viewProduct?.price / (1 - (viewProduct?.discountPercentage / 100))).toFixed(2)}</span>
                                <span className="vp-offer">{viewProduct?.discountPercentage}% off</span>
                            </section>


                            <ul className="offer-specs2">
                                <li>{viewProduct?.description}</li>
                                <li>{"Bank Offer?15 off on UPI Txns upto 5 times per userT&C"}</li>
                                <li>{"Bank Offer5% Cashback on Flipkart Axis Bank CardT&C"}</li>
                                <li>{"Special PriceGet at flat ?149T&C"}</li>
                                <li>{"Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ?500*"}</li>
                                <li>{"Partner OfferPurchase now & get 1 surprise cashback coupon till November 2023"}</li>
                            </ul>

                        </div>
                    </div>
                </div>
            }
           {placedorder && <PlaceOrder viewProduct={viewProduct} close={setPlacedOrder}/>}
        </>

    )
}

export default ViewProduct;