import Head from "next/head";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "../config/web3";

export default function Home() {
  const { activate, active, error, account, deactivate, chainId } =
    useWeb3React();

  const Connect = useCallback(() => {
    activate(Connector);
    localStorage.setItem("previouslyConnected", true);
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") {
      Connect();
    }
  }, [Connect]);

  const Disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Meta Mask Login </title>
        <meta name="description" content="Meta Mask Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {active ? (
          <>
            Account: {account}
            <br />
            Wallet Red Network : {chainId === 56 && "Binance Smart Chain"}
            <button onClick={Disconnect}>Disconect Wallet</button>
          </>
        ) : (
          <button onClick={Connect}>Connect Wallet</button>
        )}
      </main>
    </div>
  );
}
