import React, { useState } from "react";

const BuyAndSell = () => {
  const [duration, setDuration] = useState("Good till cancelled");
  const [currency, setCurrency] = useState("NGN");
  const [isDurationOptionsOpen, setIsDurationOptionsOpen] = useState(false);
  const [isCurrencyOptionsOpen, setIsCurrencyOptionsOpen] = useState(false);

  const handleOpenDurationOptions = () => {
    setIsDurationOptionsOpen(!isDurationOptionsOpen);
  };

  const handleUpdateDuration = (text) => {
    setDuration(text);
    setIsDurationOptionsOpen(false);
  };

  const handleOpenCurrencyOptions = () => {
    setIsCurrencyOptionsOpen(!isCurrencyOptionsOpen);
  };

  const handleUpdateCurrency = (text) => {
    setCurrency(text);
    setIsCurrencyOptionsOpen(false);
  };

  return (
    <div className="trade-form" style={{ width: "40%" }}>
      <div class="trade-form__tab">
        <span class="trade-form__tab-item">Order Book</span>
        <span class="trade-form__tab-item order-book__tab-active">
          Recent trades
        </span>
      </div>
      <div class="trade-form__select">
        <div class="trade-form__select-item">
          <span class="trade-form__select-item-text">Limit</span>
        </div>
        <div class="trade-form__select-item">
          <span class="trade-form__select-item-text">Market</span>
        </div>
        <div class="trade-form__select-item">
          <span class="trade-form__select-item-text">Stop</span>
        </div>
      </div>
      <div class="trade-form__input-group">
        <input
          type="text"
          name="limit_price"
          placeholder="0.00"
          class="trade-form__input"
        />
        <div class="trade-form__label">
          <span>Limit</span>
          <i class="fa-solid fa-small fa-chevron-down"></i>
        </div>
      </div>
      <div class="trade-form__input-group">
        <input
          type="text"
          name="limit_price"
          placeholder="0.00"
          class="trade-form__input"
        />
        <div class="trade-form__label">
          <span>Amount</span>
          <i class="fa-solid fa-small fa-chevron-down"></i>
        </div>
      </div>

      <div className="trade-form__header">
        <div className="trade-form__header-type">
          <span className="trade-form__header-type-text">Type</span>
          <i className="trade-form__header-type-icon fa-solid fa-small fa-chevron-down"></i>
        </div>
        <div className="trade-form__header-type">
          <span className="trade-form__header-duration-text" id="duration-text">
            {duration}
          </span>
          <i
            className="trade-form__header-duration-icon fa-solid fa-small fa-chevron-down"
            onClick={handleOpenDurationOptions}
          ></i>
          {isDurationOptionsOpen && (
            <div className="trade-form__header-duration">
              <div className="trade-form__header-duration-selector">
                <div className="trade-form__header-duration-selector-content">
                  <div
                    className="trade-form__header-duration-selector-content-text"
                    onClick={() => handleUpdateDuration("Fill or Kill")}
                  >
                    Fill or Kill
                  </div>
                  <div
                    className="trade-form__header-duration-selector-content-text"
                    onClick={() => handleUpdateDuration("Good till cancelled")}
                  >
                    Good till cancelled
                  </div>
                  <div
                    className="trade-form__header-duration-selector-content-text"
                    onClick={() => handleUpdateDuration("Good till date")}
                  >
                    Good till date
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="trade-form__account-value">
        <div className="trade-form__account-value-label">
          <span>Total account value</span>
          <div className="trade-form__currency-selector">
            <span id="currency-value">{currency}</span>
            <i
              className="fa-solid fa-small fa-chevron-down"
              onClick={handleOpenCurrencyOptions}
            ></i>
            {isCurrencyOptionsOpen && (
              <div className="trade-form__currency-select">
                <div className="trade-form__header-duration-selector">
                  <div className="trade-form__header-currency-selector-content">
                    <div
                      className="trade-form__header-currency-selector-content-item"
                      onClick={() => handleUpdateCurrency("NGN")}
                    >
                      <img
                        className="trade-form__header-currency-selector-content-item-icon"
                        src=""
                        alt=""
                      />
                      <div className="trade-form__header-currency-selector-content-item-info">
                        <span className="trade-form__header-currency-selector-content-item-info-name">
                          Nigeria
                        </span>
                        <span className="trade-form__header-currency-selector-content-item-info-code">
                          NGN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="trade-form__balance">0.00</span>
        </div>
        <div class="trade-form__open-orders">
          <div class="trade-form__open-orders-label">
            <span>Open orders</span>
            <div class="trade-form__open-orders-type">
              <span>Available</span>
            </div>
          </div>
          <div class="trade-form__open-orders-values">
            <span>0.00</span>
            <span>0.00</span>
          </div>
        </div>
        <div class="trade-form__deposit-button">
          <button>Deposit</button>
        </div>
      </div>
    </div>
  );
};

export default BuyAndSell;
