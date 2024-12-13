import React, { useState } from "react";
import { BuyAndSell, Chart, Header, OrderBook, TitleBar } from "../../components";

const HomePage = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [coinData, setCoinData] = useState({
    price: "",
    percent: "",
    high: "",
    low: "",
    volume: "",
  });

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin.CoinInfo.Name);
    setCoinData({
      price: coin.RAW?.USD.PRICE.toFixed(1),
      percent: coin.RAW?.USD.CHANGEPCT24HOUR.toFixed(3),
      high: coin.RAW?.USD.HIGH24HOUR.toFixed(1),
      low: coin.RAW?.USD.LOW24HOUR.toFixed(1),
      volume: coin.RAW?.USD.VOLUME24HOUR.toFixed(1),
    });
  };

  return (
    <div>
      <Header />
      <TitleBar handleCoinSelect={handleCoinSelect} />
      <div style={{ display: "flex", gap: '1rem' }}>
        <Chart symbol={selectedCoin} />
        <OrderBook selectedCoin={selectedCoin} />
        <BuyAndSell />

      </div>
    </div>
  );
};

export default HomePage;
