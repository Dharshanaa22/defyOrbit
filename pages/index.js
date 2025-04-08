import { useState, useEffect, useContext } from "react";


import {
  Footer,
  Header,
  About,
  Brand,
  Contact,
  Faq,
  Features,
  Hero,
  Loader,
  SideBar,
  Team,
  Token,
  TokenInfo,
  Popup,
  TransferToken,
  Owner,
  TransferCurrency,
  Donate,
  UpdateAddress,
  UpdatePrice,
} from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";
import { shortenAddress } from "../Utils/index";
import { toast } from "react-hot-toast";

const Index = () => {
  const {
    TOKEN_ICO,
    BUY_TOKEN,
    TRANSFER_ETHER,
    DONATE,
    UPDATE_TOKEN,
    UPDATE_TOKEN_PRICE,
    TOKEN_WITHDRAW,
    TRANSFER_TOKEN,
    CONNECT_WALLET,
    ERC20,
    CHECK_ACCOUNT_BALANCE,
    setAccount,
    setLoader,
    addtokenToMetaMask,
    TOKEN_ADDRESS,
    loader,
    account,
    Currency,
  } = useContext(TOKEN_ICO_Context);

  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModel, setTransferModel] = useState(false);
  const [transferCurrency, setTransferCurrency] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    if (TOKEN_ICO) {
      const fetchData = async () => {
        const items = await TOKEN_ICO();
        console.log(items);
        setDetail(items);
      };
      fetchData();
    }
  }, [account]);

  return (
    <div className="body_wrap">
      {loader && <Loader />}
      <Header
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        shortenAddress={shortenAddress}
        detail={detail}
        currency={Currency}
      />
      <Hero setBuyModel={setBuyModel} account={account} />
      <About />
      <Features />
      <Token />
      <TokenInfo details={detail} currency={Currency} />
      <Team />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
