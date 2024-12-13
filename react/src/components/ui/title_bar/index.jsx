import React, { useState, useEffect } from "react";
import { whiteDropdown } from "../../../constants/images";

const TitleBar = ({ handleCoinSelect }) => {
  const [coins, setCoins] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinData, setCoinData] = useState({
    price: "",
    percent: "",
    high: "",
    low: "",
    volume: "",
  });
  const API_KEY =
    "9334a902e0cc9d0ff49c91e2321677dc46bedb2db84907f44cae60fb547edd80";

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
        );
        const data = await response.json();
        console.log(data);
        setCoins(data.Data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoinData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCoins = coins?.filter((coin) => {
    const coinPair = `${coin.CoinInfo.Name} - USDT`;
    return coinPair.toLowerCase().includes(searchTerm);
  });

  const handleToogleSelect = () => {
    setOpenOptions(!openOptions);
  };
  const handleSelectCoin = (coin) => {
    handleCoinSelect(coin); // Now this line is calling the prop function
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
    <div className="title-bar">
      <div className="title-bar__container">
        <div className="title-bar__select">
          <span className="title-bar__value">
            {selectedCoin ? `${selectedCoin} - USDT` : "BTC/USDT"}
          </span>
          <img src={whiteDropdown} alt="" onClick={handleToogleSelect} />
          <span className="title-bar__price">${coinData.price}</span>
          {openOptions && (
            <div
              className="trade-form__dropdown"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span className="trade-form__dropdown-header">Select Market</span>
              <div className="trade-form__dropdown-search">
                <input
                  type="text"
                  placeholder="Search"
                  className="trade-form__dropdown-search-input"
                  id="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <i className="trade-form__dropdown-search-icon fa-search fa-solid"></i>
              </div>
              <hr className="trade-form__dropdown-divider" color="#a7b1bc" />
              <div className="trade-form__dropdown-filters">
                <div className="trade-form__dropdown-filter-item">All</div>
                <div className="trade-form__dropdown-filter-item">USD</div>
                <div className="trade-form__dropdown-filter-item">BTC</div>
              </div>
              <div id="loader" style={{ display: "none" }}>
                Loading...
              </div>
              <div id="no-results" style={{ display: "none" }}>
                No results found.
              </div>
              <ul className="trade-form__dropdown-list" id="coin-list">
                {filteredCoins.map((coin) => (
                  <li
                    key={coin.CoinInfo.Name}
                    className="trade-form__dropdown-item"
                    onClick={() => handleSelectCoin(coin)}
                  >
                    <div className="trade-form__dropdown-item-pair">{`${coin.CoinInfo.Name} - USDT`}</div>
                    <div className="trade-form__dropdown-item-group">
                      <div className="trade-form__dropdown-item-price">
                        {" "}
                        ${coin.RAW?.USD.PRICE.toFixed(1)}{" "}
                      </div>
                      <div className="trade-form__dropdown-item-percent">
                        {" "}
                        {coin.RAW?.USD.CHANGEPCT24HOUR.toFixed(3)}%{" "}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="title-bar__item title-bar__change">
          <div className="title-bar__stat-block">
            <i className="fa-regular fa-small fa-clock"></i>
            <span className="title-bar__label">24hr change</span>
          </div>
          <span className="title-bar__stat">
            {coinData.price} {coinData.percent}%
          </span>
        </div>
        <div className="title-bar__item title-bar__high">
          <div className="title-bar__stat-block">
            <i className="fa-solid fa-small fa-arrow-up"></i>
            <span className="title-bar__label">24hr high</span>
          </div>
          <span className="title-bar__stat">
            {coinData.high} {coinData.percent}%
          </span>
        </div>
        <div className="title-bar__item title-bar__low">
          <div className="title-bar__stat-block">
            <i className="fa-solid fa-small fa-arrow-down"></i>
            <span className="title-bar__label">24hr low</span>
          </div>
          <span className="title-bar__stat">
            {coinData.low} {coinData.percent}%
          </span>
        </div>
        <div className="title-bar__item title-bar__volume">
          <div className="title-bar__stat-block">
            <i className="fa-solid fa-small fa-chart-column"></i>
            <span className="title-bar__label">24hr volume</span>
          </div>
          <span className="title-bar__stat">
            {coinData.volume} {coinData.percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
