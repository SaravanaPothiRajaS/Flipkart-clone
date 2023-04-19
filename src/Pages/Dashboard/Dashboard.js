import "./Dashboard.css"
import { aboutList, helpList, policyList, productsCatogery, socialList } from "../../Components/JSON/JSON"
import { useContext, useState } from "react"
import FlipContext from "../../Hooks/flipcontext"
import {useNavigate} from "react-router-dom"
import RoutePath from "../../Utils/RoutePath"
//
import img1 from "../../Assets/Images/CorosalImg/cimg1.jpg"
import img2 from "../../Assets/Images/CorosalImg/cimg2.jpg"
import img3 from "../../Assets/Images/CorosalImg/cimg3.jpg"
import img4 from "../../Assets/Images/CorosalImg/cimg4.jpg"
import img5 from "../../Assets/Images/CorosalImg/cimg5.jpg"
import Loder from "../Loader/Loder"

//

export default function Dashboard() {
    const navigateTo=useNavigate();
    const {categories,}=useContext(FlipContext);
    const[hsImageIndex,setHsImageIndex]=useState(0)


const hsImages= [img1,img2,img3,img4,img5];

function handleClickCatogery(category){
    localStorage.setItem('clickCAtogery',category);
    navigateTo(RoutePath.viewCat);
}

function handleImgIndex(e,type){
    if(type === "left" && hsImageIndex >= 1){
        setHsImageIndex((prev)=>prev-1)
    }else if(type === "right" && hsImageIndex <= 3){
        setHsImageIndex((prev)=>prev+1)
    }else{
        if(type === "left"){
            setHsImageIndex(4)
        }else{
            setHsImageIndex(0)
        }
    }
}

    return (
        <div>
           
            <div className="p-catogery">
                {productsCatogery.map((item, i) => {
                    return (
                        <div key={i} className="prc-cat animated">
                            <img src={item.pr_img} alt="" className="prc-imgs" />
                            <p className="prc-images-name">{item.pr_name}</p>

                        </div>
                    )
                })
                }
            </div>
                {categories.length === 0 ?  
                 <div className="loader-ani">
                <Loder />
            </div>
            :
            <>
            <div className="hs-imgdiv">
                {hsImages.map((item,i)=>{
                    return(
                        <>
                        <img src={item} alt="" key={i} className="hs-imgtag" style={{transform:`translateX(-${100 * hsImageIndex}%)`}}/>
                        <button className="left-arrow" onClick={(e)=>handleImgIndex(e,"left")}>{"<"}</button>
                        <button className="right-arrow" onClick={(e)=>handleImgIndex(e,"right")}>{">"}</button>
                        </>
                    )
                })}
            </div>
            <div className="dash-pr-container">
                {
                    categories.map((item, i) => (
                        <div className="dash-pr-card animated"  key={i} onClick={()=>handleClickCatogery(item.category)}>
                        <div className="prc-cat">
                        <img src={item?.thumbnail} alt="" className="pr-img-catgorised" />
                        <p className="pr-basic-h1">{item?.category}</p>
                        <p className="pr-basic-h2">{item?.discountPercentage}%</p>
                        <p className="pr-basic-h3">{item?.brand}</p>
                  </div>
                    </div>)
                    )
                }

            </div>
            </>
                }


            <footer>
                <div className="footer-cont1">
                    <section>
                        <h3>ABOUT</h3>
                        {aboutList.map((item, i) => {
                            return (
                                <div className="foot-contend" key={i}>
                                    <p>{item.list}</p>
                                </div>
                            )
                        })}
                    </section>
                    <section>
                        <h3>HELP</h3>
                        {helpList.map((item, i) => {
                            return (
                                <div className="foot-contend" key={i}>
                                    <p>{item.list}</p>
                                </div>
                            )
                        })}
                    </section>
                    <section>
                        <h3>POLICY</h3>
                        {policyList.map((item, i) => {
                            return (
                                <div className="foot-contend" key={i}>
                                    <p>{item.list}</p>
                                </div>
                            )
                        })}
                    </section>
                    <section>
                        <h3>SOCIAL</h3>
                        {socialList.map((item, i) => {
                            return (
                                <div className="foot-contend" key={i}>
                                    <p>{item.list}</p>
                                </div>
                            )
                        })}
                    </section>

                </div>
            </footer>
        </div>

    )
}