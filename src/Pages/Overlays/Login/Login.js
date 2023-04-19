import "../Overlays.css";
import "./Login.css";
import login_img from "../../../Assets/Images/loginImg.jpg";
import { useState } from "react";
export default function Login({close}){

     // eslint-disable-next-line 
    const [otpInput,setOtpInput]=useState(true)
    const [mobNo,setMobIn]=useState("")

    
const handleChange=(type,e)=>{
    if(e.keyCode===8 ){
        if(e.keyCode===8){
            type='backward'
        }
    }
          const selected= type === 'forward' ? e.target.nextSibling :e.target.previousSibling;

    selected.focus()
} 
function handleMbile(){
    if(mobNo.length === 10){
        setOtpInput(false)
    }else{
        document.getElementById("err-msg-mn").innerText="*Pls enter 10 digit mobile number"
    }
}
function handleOnlyNum(e){
    const {target:{value,pattern}}=e;
    const regex=new RegExp(pattern)
    if(value === "" || regex.test(value)){
        setMobIn(value)
    }
}
    return(
        <div className="olay-bg" onClick={close}>
            <div className="olay-login-cont animated-overlay" onClick={(e)=>e.stopPropagation()}>
                <div className="login-l">
                    <section>
                    <h2>Login</h2>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                    </section>
                    <img src={login_img} alt="" />
                </div>
                <div className="login-r">
                  <div className="input-mob">          
                {otpInput ?    <>
                    <input type={"text"} id="mob-in" 
                    className="login-mob-in"
                    placeholder="Enter Email/Moile number"
                    pattern="^\d+$"
                    value={mobNo}
                    maxLength={10} onChange={(e)=>handleOnlyNum(e)}/>
                    <p id="err-msg-mn"></p>
                    </>
                    :
                    <>
                      <div className="dflex">
                      <div className="otpses">
                          <input id="one" maxLength={1}  onKeyUp={(e)=>handleChange('forward',e)}/>
                          <input id="two" maxLength={1}   onKeyUp={(e)=>handleChange('forward',e)}/>
                          <input id="three" maxLength={1}   onKeyUp={(e)=>handleChange('forward',e)} />
                          <input id="four" maxLength={1}   onKeyUp={(e)=>handleChange('forward',e)} />
                          <input id="five" maxLength={1}   onKeyUp={(e)=>handleChange('forward',e)}/>
                          <input id="six" maxLength={1}  onKeyUp={(e)=>handleChange('forward',e)} />
                       </div>
                       </div>
                    </>    
                }
                    <p className="tc-pp">By continuing, you agree to Flipkart's <span>Terms of Use</span> and <span>Privacy Policy.</span></p>
                  {otpInput ? <button className="req-otp" onClick={handleMbile}>Request OTP</button>
                   :<button className="req-otp" onClick={close}>Verify OTP</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}