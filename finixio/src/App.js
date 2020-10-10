import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyTable from "./currencyTable/CurrencyTable";
import * as coinService from "./utils/coinService";

const App = ({ apiKey, ...props }) => {
  let [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      let coins = await coinService.getCoinInfo();
      setCoins(coins);
    };

    getCoins();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Currency Pal</h1>
      </header>
      <main>
        <CurrencyTable coins={coins} />
      </main>
    </div>
  );
};

export default App;
