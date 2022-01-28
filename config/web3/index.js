import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

export const Connector = new InjectedConnector({
  supportedChainIds: [56],
});

export const getLibrary = (provider) => {
  const library = new Web3(provider);
  return library;
};
