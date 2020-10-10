import React from "react";

const CurrencyTable = ({ coins, ...props }) => {
  return (
    <>
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Current Price (USD)</th>
            <th>Opening Price (USD)</th>
            <th>Change &#8615;</th>
          </tr>
        </thead>
        <tbody>
          {!coins && (
            <tr>
              <td colSpan={4}>No Coins Found</td>
            </tr>
          )}
          {coins &&
            coins.map((coin) => (
              <tr key={coin.coin}>
                <td>{coin.coin}</td>
                <td>${coin.current.toFixed(2)}</td>
                <td>${coin.open.toFixed(2)}</td>
                <td>{coin.differenceDisplay}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

//Todo: Prop Types

export default CurrencyTable;
