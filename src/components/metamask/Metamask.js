import React, { useState } from "react";
import { ethers } from "ethers";

const Metamask = () => {
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setError("Please install Metamask.");
    }
  };

  const accountChanged = (accountName) => {
    setAccount(accountName);
    getBalance(accountName);
  };

  const getBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setBalance(ethers.formatEther(balance));
      });
  };

  return (
    <>
      <button
        onClick={connectWallet}
        className="btn btn-primary md:w-64 w-full"
      >
        Connect Metamask
      </button>
      <p>{error}</p>
      <p>
        <strong>Wallet address:</strong> {account}
      </p>
      <p>
        <strong>Wallet balance:</strong> ETH {balance}
      </p>
    </>
  );
};

export default Metamask;
