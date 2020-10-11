import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import CurrencyTable from "./currencyTable/CurrencyTable";
import * as coinService from "./utils/coinService";

const App = ({ apiKey, ...props }) => {
  let [coins, setCoins] = useState([]);
  let [btcPrice, setBtcPrice] = useState([]);

  const webSocket = useRef(null);

  useEffect(() => {
    const getCoins = async () => {
      let coins = await coinService.getCoinInfo();
      setCoins(coins);
    };

    getCoins();
  }, []);

  useEffect(() => {
    webSocket.current = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
    );
    webSocket.current.onmessage = (message) => {
      // we will disregard any web socket messages that we do not care about (heartbeats etc)
      var payload = JSON.parse(message.data);
      if (payload?.TYPE == 2) {
        setBtcPrice(payload);
      }
    };

    webSocket.current.onopen = () => {
      var subRequest = {
        action: "SubAdd",
        subs: ["2~Coinbase~BTC~USD"],
      };
      webSocket.current.send(JSON.stringify(subRequest));
    };

    return () => webSocket.current.close();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Currency Pal</h1>
      </header>
      <main>
        {
          //little issue with the data I get back as it doesnt always have a price
        }
        <small>Live BTC Price: $ {btcPrice?.PRICE || "pondering..."}</small>
        <CurrencyTable coins={coins} />
      </main>
    </div>
  );
};

export default App;
