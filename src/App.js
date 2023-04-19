import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Main,Route,Routes} from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';
import Headers from './Pages/Header/Header';
import ProductType from './Pages/ProductType/ProductType';
import FlipContext from './Hooks/flipcontext';
import RoutePath from './Utils/RoutePath';
import ViewProduct from './Pages/ViewProduct/ViewProduct';
import Favorites from './Pages/Favorites/Favorites';
import Cart from './Pages/Cart/Cart';

function App() {



  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [favList,setFavList]=useState([])
  const [cartData,setCartData]=useState([]);
  const[clickCatogery,setClickCAtogery]=useState()



  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => {
        let cat = [];
        for (let i = 0; i < res.data.products.length; i++) {
          if (!cat.length) {
            cat.push(res.data.products[i])
          } else {
            const isPresent = cat.find(cat => cat.category === res.data.products[i].category)
            if (!isPresent) {
              cat.push(res.data.products[i])
            }
          }
        }
        setProducts(res.data.products)
        setCategories(cat)
      })
  }, [])
 
  return (
    <div>
<FlipContext.Provider
value={{categories,clickCatogery,setClickCAtogery,products,favList,setFavList,cartData,setCartData}}
>
  <Main>
      <Headers />
      <Routes>
      <Route path='/' element={<Dashboard  />} />
      <Route path={RoutePath.viewCat} element={<ProductType />} />
      <Route path={RoutePath.viewprod} element={<ViewProduct/>} />
      <Route path={RoutePath.favorites} element={<Favorites/>} />
      <Route path={RoutePath.cart} element={<Cart/>} />
      </Routes>
      </Main>
      </FlipContext.Provider>
    </div>
  );
}

export default App;
