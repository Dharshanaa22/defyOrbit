import React, { useState, useEffect } from "react";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  shortenAddress,
  detail,
  currency,
  ownerModel,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null); // MetaMask disconnected
    }
  };

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <header className="site-header header--transparent ico-header">
      <div className="header__main-wrap">
        <div className="container mxw_1640">
          <div className="header__main ul_li_between">
            <div className="header__left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img src="assets/img/logo/logo.svg" alt="Logo" />
                </a>
              </div>
            </div>

            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li className="active has-mega-menu">
                    <a href="/" style={{ color: "white" }}>Home</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about" style={{ color: "white" }}>About</a>
                  </li>
                  {/* <li>
                    <a className="scrollspy-btn" href="#roadmap" style={{ color: "white" }}>RoadMap</a>
                  </li> */}
                  {/* <li>
                    <a className="scrollspy-btn" href="#team" style={{ color: "white" }}>Team</a>
                  </li> */}
                  <li>
                    <a className="scrollspy-btn" href="#faq" style={{ color: "white" }}>Faq</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#contact" style={{ color: "white" }}>Contact</a>
                  </li>
                  <li className="scrollspy-btn">
                    <a
                      style={{
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => setOwnerModel(!ownerModel)}
                    >
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header__bar hamburger_menu">
                  <div className="header__bar-icon">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </a>
              </div>

              {account ? (
                <div className="header__account">
                  <a
                    onClick={() =>
                      navigator.clipboard.writeText(detail?.address || account)
                    }
                  >
                    {shortenAddress(detail?.address || account)}:{" "}
                    {detail?.maticBal?.slice(0, 6) || "0.00"}
                    {currency}
                  </a>
                </div>
              ) : (
                <div className="header__account">
                  <a
                    onClick={connectMetamask}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      textDecoration: "none",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                  >
                    Connect Wallet
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
