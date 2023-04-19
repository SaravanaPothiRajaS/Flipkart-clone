import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FlipContext from "../../Hooks/flipcontext";
import RoutePath from "../../Utils/RoutePath";
import Login from "../Overlays/Login/Login"
import "./Header.css"

export default function Headers() {

    const navigateTo = useNavigate();
    const [login, setLogin] = useState(false)
    const {favList,setFavList,cartData,setCartData}=useContext(FlipContext)
useEffect(()=>{
     setFavList(JSON.parse(localStorage.getItem('favorites')))
     setCartData(JSON.parse(localStorage.getItem('cart')))
},[favList,cartData])
    function handleLogin() {
        setLogin((prev) => !(prev))
    }
    return (
        <div className="h-parant">
<div class="nav">
  <input type="checkbox" id="nav-check" />
  <div class="nav-header">
    <h3 className="fk-head" onClick={() => navigateTo("/")} >
    Flipkart
    </h3>
    <section className="search-section">
                    <input type={"text"} className="search-in" placeholder="Search Products..." />
                    <i className="fas fa-search d-search"></i>
                </section>
  </div>
  
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
  <button className="header-btn login-btn" onClick={handleLogin}>Login</button>
                <section className="notify-div">
                    <a className="header-btn more-btn" onClick={() => navigateTo(RoutePath.favorites)}>Wishlist</a>
                    <a className="notify-button">{favList?.length}</a>
                </section>
                <section className="notify-div">
                <a className="header-btn cart-btn" onClick={() => navigateTo(RoutePath.cart)}><i className="fas fa-shopping-cart"></i><span>Cart</span></a>
                <a className="notify-button">{cartData?.length}</a>
                </section>
  </div>
</div>
  <div>{login && <Login close={handleLogin} />}</div>


        {/* <div className="h-parant">
            <header className="fk-header">
                <h3 className="fk-head" onClick={() => navigateTo("/")}>Flipkart</h3>
                <section className="search-section">
                    <input type={"text"} className="search-in" placeholder="Search Products..." />
                    <i className="fas fa-search d-search"></i>
                </section>
                <button className="header-btn login-btn" onClick={handleLogin}>Login</button>
                <button className="header-btn baseller-btn">Become a seller</button>
                <section className="notify-div">
                    <button className="header-btn more-btn" onClick={() => navigateTo(RoutePath.favorites)}>Wishlist</button>
                    <button className="notify-button">{favList?.length}</button>
                </section>
                <section className="notify-div">
                <button className="header-btn cart-btn" onClick={() => navigateTo(RoutePath.cart)}><i className="fas fa-shopping-cart"></i><span>Cart</span></button>
                <button className="notify-button">{cartData?.length}</button>
                </section>
            </header>
            <div>{login && <Login close={handleLogin} />}</div>
        </div> */}
        </div>
    )
}