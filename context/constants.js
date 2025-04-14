import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";

//INTERNAL IMPORT
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0x10D36102e37410dbE0Ea2bd00fe2186917F1f081";

export const CONTRACT_ADDRESS = "0x7b96aF9Bd211cBf6BA5b0dd53aa61Dc5806b6AcE";
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async({networkName}) => {
  try{
    if(!window.ethereum) throw new Error("No Crypto wallet found.");
    await window.ethereum.request({
    method:"wallet_addEthereumChain",
    params: [
      {
      ...networks[networkName],
    },
  ],
  });
}
catch (error){
  console.error(error.message);
}
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await changeNetwork({networkName});
};

export const CHECK_WALLET_CONNECTED = async () => {
  if(!window.ethereum) return console.log("Please install metamask");
  await handleNetworkSwitch();


const account = await window.ethereum.request({ method:"eth_accounts"});
if(account.length){
  return account[0];
} else{
  console.log("Please Install MetaMask & connect, Reload");
}
};
export const CONNECT_WALLET = async()=>{
  try{
    if(!window.ethereum) return console.log("Please install metamask");
    await handleNetworkSwitch();
  const account = await window.ethereum.request({ method:"eth_requestAccounts"});
  window.location.reload();
    return account[0];
}
catch (error){
  console.log(error);
}
};

const fetchContract = (address, abi, singer) =>
  new ethers.Contract(address, abi, singer);

export const TOKEN_ICO_CONTRACT = async()=>{
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const singer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, singer);
    return contract;
  }
catch (error){
  console.log(error);
}
};

export const ERC20 = async (ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const network = await provider.getNetwork();
    const singer = provider.getSigner();

    const contract = fetchContract(ADDRESS, ERC20_ABI, singer);
    const userAddress = await signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const address = contract.address;

    const token = {
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(totalSupply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    };

    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};


export const ERC20_CONTRACT = async(CONTRACT_ADDRESS)=>{
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const singer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, singer);
    return contract;
  }
catch (error){
  console.log(error);
}
};

export const GET_BALANCE = async()=>{
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const singer = provider.getSigner();

    const maticBal =  await singer.getBalance();
    return ethers.utils.formatEther(maticBal.toString());
  }
catch (error){
  console.log(error);
}
};

export const CHECK_ACCOUNT_BALANCE = async(ADDRESS)=>{
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);


    const maticBal =  await provider.getBalance(ADDRESS);
    return ethers.utils.formatEther(maticBal.toString());
  }
catch (error){
  console.log(error);
}
};

export const addtokenToMetaMask = async() => {
  try {
    if(!window.ethereum) {
      return "Please install MetaMask extension";
    }

    // Verify and switch network
    try {
      await handleNetworkSwitch();
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x4268') { // Holesky chainId
        return "Please switch to Holesky network in MetaMask";
      }
    } catch(networkError) {
      console.error("Network switch failed:", networkError);
      return "Failed to switch network. Please try again";
    }

    // Get token details with retry
    let tokenDetails;
    let retries = 3;
    
    while(retries > 0) {
      try {
        tokenDetails = await ERC20(TOKEN_ADDRESS);
        if(tokenDetails) break;
      } catch(erc20Error) {
        console.error(`ERC20 fetch attempt ${4-retries} failed:`, erc20Error);
        retries--;
        if(retries === 0) {
          return "Failed to get token details after multiple attempts";
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between retries
      }
    }

    const tokenImage = "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

    try {
      const result = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: tokenDetails.symbol,
            decimals: tokenDetails.decimals,
            image: tokenImage,
          },
        },
      });

      if(result) {
        return "Token successfully added to your wallet!";
      }
      return "Token addition was cancelled";
    } catch(apiError) {
      console.error("MetaMask API error:", apiError);
      return "MetaMask error. Please try again or check console for details";
    }

  } catch(error) {
    console.error("Unexpected error in addtokenToMetaMask:", error);
    return "An unexpected error occurred. Please try again later";
  }
};
