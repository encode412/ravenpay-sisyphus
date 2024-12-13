import React, { useState, useEffect } from "react";
import { firstTag, secondTag, thirdTag } from "../../../constants/images";

const OrderBook = ({ selectedCoin }) => {
  const [orderBookData, setOrderBookData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY =
    "9334a902e0cc9d0ff49c91e2321677dc46bedb2db84907f44cae60fb547edd80";
  const pair = "BTC";

  useEffect(() => {
    const fetchOrderBookData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/ob/l1/top?fsyms=${selectedCoin}&tsyms=USD,EUR&e=coinbase&api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        setOrderBookData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchOrderBookData();
  }, [selectedCoin]);

  const displayOrderBookData = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    const asks = orderBookData.Data.RAW[selectedCoin]?.USD;
    const bids = orderBookData.Data.RAW[selectedCoin]?.EUR;

    return (
      <div>
        <div className="order-book__selector-row" >
          <div className="order-book__selector-cell">
            <span className="order-book__selector-label">Price</span>
            <span className="order-book__selector-unit">(USDT)</span>
          </div>
          <div className="order-book__selector-cell">
            <span className="order-book__selector-label">Amount</span>
            <span className="order-book__selector-unit">(BTC)</span>
          </div>
          <div className="order-book__selector-cell">Total</div>
        </div>
        <div className="order-book__selector-row-group">
          <div
            className="order-book__selector-row order-book__selector-value"
            style={{ flexDirection: "row" }}
          >
            <div className="order-book__selector-cell">{asks?.ASK}</div>
            <div className="order-book__selector-cell">1</div>
            <div className="order-book__selector-cell">{asks?.ASK * 1}</div>
          </div>
          <div
            className="order-book__selector-row order-book__selector-value"
            style={{ flexDirection: "row" }}
          >
            <div className="order-book__selector-cell">
              {asks?.ASK !== null && asks?.ASK !== undefined
                ? asks?.ASK * 1
                : 0}
            </div>
            <div className="order-book__selector-cell">1</div>
            <div className="order-book__selector-cell">
              {bids?.BID !== null && bids?.BID !== undefined
                ? bids?.BID * 1
                : 0}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="order-book__container" style={{ width: '40%'}}>
      <div className="order-book__header">
        <div className="order-book__tabs">
          <span className="order-book__tab order-book__tab-active">
            Order Book
          </span>
          <span className="order-book__tab">Recent trades</span>
        </div>
        <div className="order-book__actions">
          <div className="order-book__icons">
            <img src={firstTag} alt="click" className="order-book__icon" />
            <img src={secondTag} alt="click" className="order-book__icon" />
            <img src={thirdTag} alt="click" className="order-book__icon" />
          </div>
          <div className="order-book__selector-header">
            <span className="order-book__selector-text">10</span>
            <i className="fa-solid fa-small fa-chevron-down"></i>
          </div>
        </div>

        <div className="order-book__selector">
          <div className="order-book__selector-body">
            {displayOrderBookData()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
