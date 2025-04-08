import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  CHECK_WALLET_CONNECTED,
  CONNECT_WALLET,
  GET_BALANCE,
  CHECK_ACCOUNT_BALANCE,
  TOKEN_ICO_CONTRACT,
  ERC20,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
  addtokenToMetaMask,
} from "./constants";

const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const Currency = "ETH";
  const [loader, setLoader] = useState(false);
  const [account, setAccount] = useState(null);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const TOKEN_ICO = async () => {
    try {
      const address = await CHECK_WALLET_CONNECTED();
      if (!address) return;
      setLoader(true);
      setAccount(address);

      const contract = await TOKEN_ICO_CONTRACT();
      const tokenDetails = await contract.getTokenDetails();
      const contractOwner = await contract.owner();
      const soldTokens = await contract.soldTokens();
      const ethBal = await GET_BALANCE();

      const token = {
        tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
        name: tokenDetails.name,
        Symbol: tokenDetails.symbol,
        supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
        tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
        tokenAddr: tokenDetails.tokenAddr,
        maticBal: ethBal,
        address: address.toLowerCase(),
        owner: contractOwner.toLowerCase(),
        soldTokens: soldTokens.toNumber(),
      };

      return token;
    } catch (error) {
      console.error(error);
      notifyError("Error. Try again later.");
    } finally {
      setLoader(false);
    }
  };

  const BUY_TOKEN = async (amount) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      const contract = await TOKEN_ICO_CONTRACT();
      const tokenDetails = await contract.getTokenDetails();

      const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());
      if (parseFloat(availableToken) > 1) {
        const price = ethers.utils.formatEther(tokenDetails.tokenPrice.toString());
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const transaction = await contract.buyToken(address, {
          value: payAmount,
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Transaction failed");
    } finally {
      setLoader(false);
    }
  };

  const TOKEN_WITHDRAW = async () => {
    try {
      setLoader(true);
      const contract = await TOKEN_ICO_CONTRACT();
      const transaction = await contract.withdrawAllTokens();
      await transaction.wait();
      notifySuccess("Withdraw successful");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Withdraw failed");
    } finally {
      setLoader(false);
    }
  };

  const UPDATE_TOKEN = async (_address) => {
    try {
      setLoader(true);
      const contract = await TOKEN_ICO_CONTRACT();
      const transaction = await contract.updateToken(_address);
      await transaction.wait();
      notifySuccess("Token address updated");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Update failed");
    } finally {
      setLoader(false);
    }
  };

  const UPDATE_TOKEN_PRICE = async (price) => {
    try {
      setLoader(true);
      const contract = await TOKEN_ICO_CONTRACT();
      const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
      const transaction = await contract.updateTokenSalePrice(payAmount);
      await transaction.wait();
      notifySuccess("Token price updated");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Update price failed");
    } finally {
      setLoader(false);
    }
  };

  const DONATE = async (AMOUNT) => {
    try {
      setLoader(true);
      const contract = await TOKEN_ICO_CONTRACT();
      const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");

      const transaction = await contract.transferToOwner(payAmount, {
        value: payAmount,
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();
      notifySuccess("Donation sent");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Donation failed");
    } finally {
      setLoader(false);
    }
  };

  const TRANSFER_ETHER = async ({ _receiver, _amount }) => {
    try {
      setLoader(true);
      const contract = await TOKEN_ICO_CONTRACT();
      const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

      const transaction = await contract.transferEther(_receiver, payAmount, {
        value: payAmount,
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();
      notifySuccess("Ether transferred");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Transfer failed");
    } finally {
      setLoader(false);
    }
  };

  const TRANSFER_TOKEN = async ({ _tokenAddress, _sendTo, _amount }) => {
    try {
      setLoader(true);
      const contract = await ERC20_CONTRACT(_tokenAddress);
      const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

      const transaction = await contract.transfer(_sendTo, payAmount);
      await transaction.wait();
      notifySuccess("Token transferred");
      window.location.reload();
    } catch (error) {
      console.error(error);
      notifyError("Token transfer failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <TOKEN_ICO_Context.Provider
      value={{
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
      }}
    >
      {children}
    </TOKEN_ICO_Context.Provider>
  );
};

export default TOKEN_ICO_Context;
