import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

/**
  Web3 modal helps us "connect" external wallets:
**/
const web3ModalSetup = () =>
  new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org", // bsc

            // 56: "https://bsc-dataseed.binance.org",
            // 97: "https://data-seed-prebsc-1-s1.binance.org:8545",
          },
        },
      },
    },
  });

export default web3ModalSetup;
