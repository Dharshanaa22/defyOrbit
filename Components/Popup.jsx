import React, {useState, useEffect } from "react";
import { shortenAddress } from "../Utils/index";

const Popup = ({
  setBuyModel,
    BUY_TOKEN,
    Currency,
    detail,
    account,
    ERC20,
    TOKEN_ADDRESS,
    setLoader}) => {

  const [amount, setAmount] = useState();
  const [transferToken, setTransferToken] = useState();
  const [token, setToken] = useState();

  
  useEffect(()=> {
    setLoader(true);
    ERC20(TOKEN_ADDRESS).then((items) =>{
      setTransferToken(items);
      console.log(items);
    setLoader(false);
  });
  }, []);
  return (
  <section className="new-margin ico-contact pos-rel">
    <div className="container">
      <div className="ico-contact__wrap">
        <h2 className="title">
          BuyToken{" "}
          <strong onClick={()=> setBuyModel (false)}>X</strong>
        </h2>

        <div>
        <div className="row">
          <div className="col-lg-6">
          <input
                type="text"
                placeholder={`Token Balance: ${transferToken?.balance} ${transferToken?.symbol} `}
                onChange={(e)=>
                  setToken( e.target.value)}
                />
          </div>
          <div className="col-lg-6">
          <input
                type="text"
                value={amount ? `${amount * detail?.tokenPrice} ${currency}`
                : "Output value"
                }
                />
          </div>

          <div className="col-lg-12">
          <textarea disabled name="message" cols="30" rows="10" placeholder={`current Price: ${detail?.symbol} Token Address: ${detail?.tokenbal} ${shortenAddress(detail?.tokenAddr)}`}>
          </textarea>
              
          </div>

          <div className="ico-contract__btn text-center mt-10">
            <button onClick={() => BUY_TOKEN(amount)} className="thm-btn" >
              Buy Token
            </button>
          </div>
        </div>
      </div>
    
    <div className="ico-contact__shape-img">
      <div className="shape shape--1">
        <div className="">
        <img src="assets/img/shape/c_shape1.png" alt="" />
        </div>
      </div>
      <div className="shape shape--2">
        <div className="">
        <img src="assets/img/shape/c_shape2.png" alt="" />
        </div>
      </div>
    </div>
    </div>
    </div>

    <div className="ico-contact__shape">
      <div className="shape shape--1">
        <img src="assets/img/shape/c_shape1.png" alt="" />
      </div>
      <div className="shape shape--2">
        <img src="assets/img/shape/c_shape2.png" alt="" />
      </div>
      <div className="shape shape--3">
        <img src="assets/img/shape/c_shape3.png" alt="" />
      </div>
    </div>
  </section>
);
};

export default Popup;
