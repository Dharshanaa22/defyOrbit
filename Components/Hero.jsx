import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Hero = ({
  setBuyModel,
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  detail,
  addtokenToMetaMask,
}) => {
  const notifySuccess = (msg)=> toast.success(msg, {duration: 2000});
  const notifyError = (msg)=> toast.error(msg, {duration: 2000});

  const connectWallet = async () => {
    setLoader(true);
    const address = await CONNECT_WALLET();
    setAccount(address);
  };

  const [percentage, setPercentage] = useState();

  useEffect(() => {
    const calculatePercentage= () => {
      const tokenSold = detail?.soldTokens ?? 0;
      const tokenTotalSupply =
      (detail?.soldTokens) + (Number(detail?.tokenBal) ?? 1);

      const percentageNew = (tokenSold / tokenTotalSupply) * 100;

      if(tokenTotalSupply == 0) {
        console.log("Token sale balance is zero, cannot calculate percentage");
      } else {
        setPercentage(percentageNew);
      }
    };
      const timer = setTimeout(calculatePercentage, 1000);

      return () => clearTimeout(timer);
 
  }, [detail]);

  const ADD_TOKEN_METAMASK = async () => {
    setLoader(true);
    const response = await addtokenToMetaMask();
    setLoader(false);
    notifySuccess(response);
  };

  console.log(detail); 
  return (
    <section
      className="hero hero__ico pos-rel"
      style={{
        background: "linear-gradient(135deg,#2c2c2c,rgb(255, 255, 255))", // Gradient applied here
      }}
    >
      <div className="hero__bg" data-background="assets/img/bg/hero_bg.png" />

      <div className="container">
  <div className="row">
    <div className="col-lg-7">
      <div className="hero__content">
        <h1 className="title mb-45" style={{ color: "black" }}>Participate in the
          <span> Ongoing ICO Token </span> Sale
        </h1>

              <div className="btns">
                {
                  account ? (
                    <a className="thm-btn" onClick={()=> setBuyModel(true)}>
                      PURCHASE TOKEN
                    </a>
                  ) : ( 
                    <a className="thm-btn" onClick={()=> connectWallet()}>
                      Connect Wallet
                    </a>
                  )}
                <a
                  className="thm-btn thm-btn--dark"
                  onClick={()=> ADD_TOKEN_METAMASK()}
                >
                  Add MetaMask
                </a>
              </div>

              <div className="hero__progress mt-50">
                <div className="progress-title ul_li_between">
                  <span>
                    <span>Raised -</span>{detail?.soldTokens} Tokens
                  </span>
                  <span>
                    <span>Total ICO -</span>{" "}
                    {detail?.soldTokens + Number (detail?.tokenBal)}{" "}
                    {detail?.symbol}
                  </span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <ul className="ul_li_between">
                  <li>Pre Sell</li>
                  <li>Soft Cap</li>
                  <li>Bonus</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero__explore-wrap text-center">
              <div className="hero__explore text-ceter">
                <div className="scroll-down" />
                <span>Explore Causes</span>
              </div>

              <div className="hero__countdown">
                <h6 className="text-center">ICO will Start in...</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__shape">
        <div className="shape shape--1">
          <img src="assets/img/shape/h_shape1.png" alt="" srcSet="" />
        </div>
        <div className="shape shape--2">
          <img src="assets/img/shape/h_shape2.png" alt="" srcSet="" />
        </div>
        <div className="shape shape--3">
          <img src="assets/img/shape/h_shape3.png" alt="" srcSet="" />
        </div>
      </div>

      <div className="hero__coin">
        <div className="coin coin--1">
          <img src="assets/img/icon/coin1.png" alt="" srcSet="" />
        </div>
        <div className="coin coin--2">
          <img src="assets/img/icon/coin2.png" alt="" srcSet="" />
        </div>
        <div className="coin coin--3">
          <img src="assets/img/icon/coin3.png" alt="" srcSet="" />
        </div>
        <div className="coin coin--4">
          <img src="assets/img/icon/coin4.png" alt="" srcSet="" />
        </div>
        <div className="coin coin--5">
          <img src="assets/img/icon/coin5.png" alt="" srcSet="" />
        </div>
        <div className="coin coin--6">
          <img src="assets/img/icon/coin6.png" alt="" srcSet="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
