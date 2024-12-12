const API_KEY =
  "9334a902e0cc9d0ff49c91e2321677dc46bedb2db84907f44cae60fb547edd80";
const tradingPairsElement = document.getElementById("trading-pairs");
const loaderElement = document.getElementById("loader");
const noResultsElement = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const dropdownToggle = document.getElementById("limit-dropdown-toggle");
const dropdown = document.getElementById("limit-dropdown");
const tradingPairElement = document.getElementById("trading-pairs");
let selectedCoin = "BTC";

// Function to fetch trading pairs and their data
async function getTradingPairs() {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?tsym=USDT&api_key=${API_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    displayTradingPairs(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchCandlestickChartData(pair) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/histohour?fsym=${pair}&tsym=USDT&limit=24&aggregate=1&e=CCCAGG`
    );
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error(error);
  }
}

// Function to display trading pairs and their data
function displayTradingPairs(data) {
  const tradingPairsElement = document.getElementById("trading-pairs");
  if (tradingPairsElement) {
    const tradingPairsHtml = data.Data.forEach((pair) => {
      return `
        <div class="order-book__selector-row">
          <div class="order-book__selector-cell">${pair.CoinInfo.Name}</div>
          <div class="order-book__selector-cell">${pair.RAW.USD.PRICE}</div>
          <div class="order-book__selector-cell">${pair.RAW.USD.VOLUME24HOUR}</div>
        </div>
      `;
    });
    tradingPairsElement.innerHTML = tradingPairsHtml;
  }
}

async function fetchCoins() {
  try {
    loaderElement.style.display = "block";
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
    );
    const data = await response.json();
    loaderElement.style.display = "none";
    displayCoinData(data);
    return data.Data;
  } catch (error) {
    console.error(error);
    loaderElement.style.display = "none";
  }
}

// Function to display coins in dropdown
function displayCoinData(data) {
  const coins = data.Data;
  const coinList = document.getElementById("coin-list");
  coinList.innerHTML = "";

  coins.forEach((coin, index) => {
    const coinPair = `${coin.CoinInfo.Name} - USDT`;
    const coinPrice = coin.RAW.USD.PRICE.toFixed(1);
    const coinPercent = coin.RAW.USD.CHANGEPCT24HOUR.toFixed(3);
    const coinHigh = coin.RAW.USD.HIGH24HOUR.toFixed(1);
    const coinLow = coin.RAW.USD.LOW24HOUR.toFixed(1);
    const coinVolume = coin.RAW.USD.VOLUME24HOUR.toFixed(1);

    const coinElement = document.createElement("li");
    coinElement.classList.add("trade-form__dropdown-item");
    coinElement.innerHTML = `
      <div class="trade-form__dropdown-item-pair"> ${coinPair}</div>
      <div class="trade-form__dropdown-item-group">
      <div class="trade-form__dropdown-item-price"> $${coinPrice} </div>
      <div class="trade-form__dropdown-item-percent"> ${coinPercent}% </div>
      </div>
    `;
    coinElement.addEventListener("click", () => {
      fetchOrderBookData(selectedCoin || coin.CoinInfo.Name);
      populateCandlestickChart(selectedCoin || coin.CoinInfo.Name);
      populateColumnChart(selectedCoin || coin.CoinInfo.Name);
      selectedCoin = coin.CoinInfo.Name;
      const selectedCoinPair = coinElement.querySelector(
        ".trade-form__dropdown-item-pair"
      ).textContent;
      const selectedCoinPrice = coinElement.querySelector(
        ".trade-form__dropdown-item-price"
      ).textContent;
      const selectedCoinPercent = coinElement.querySelector(
        ".trade-form__dropdown-item-percent"
      ).textContent;

      document.querySelector(".title-bar__value").textContent =
        selectedCoinPair;
      document.querySelector(".title-bar__price").textContent =
        selectedCoinPrice;
      document.querySelector(
        ".title-bar__change .title-bar__stat"
      ).textContent = `${coinPrice} ${coinPercent}%`;
      document.querySelector(
        ".title-bar__high .title-bar__stat"
      ).textContent = `${coinHigh} ${coinPercent}%`;
      document.querySelector(
        ".title-bar__low .title-bar__stat"
      ).textContent = `${coinLow} ${coinPercent}%`;
      document.querySelector(
        ".title-bar__volume .title-bar__stat"
      ).textContent = `${coinVolume} ${coinPercent}%`;
    });
    coinList.appendChild(coinElement);
  });
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const coinList = document.getElementById("coin-list");
  const coinElements = coinList.children;
  noResultsElement.style.display = "none";

  let resultsFound = false;
  Array.from(coinElements).forEach((coinElement) => {
    const coinPair = coinElement
      .querySelector(".trade-form__dropdown-item-pair")
      .textContent.toLowerCase();
    if (coinPair.includes(searchTerm)) {
      coinElement.style.display = "flex";
      resultsFound = true;
    } else {
      coinElement.style.display = "none";
    }
  });

  if (!resultsFound) {
    noResultsElement.style.display = "block";
  }
});

dropdownToggle.addEventListener("click", () => {
  dropdown.classList.toggle("trade-form__dropdown--active");
});

async function fetchOrderBookData(pair) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/ob/l1/top?fsyms=${pair}&tsyms=USD,EUR&e=coinbase&api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data, "order");
    displayOrderBookData(data);
  } catch (error) {
    console.error(error);
  }
}

// Function to display order book data
function displayOrderBookData(data) {
  const orderBookData = data.Data;
  const asks = orderBookData.RAW[selectedCoin].USD;
  const bids = orderBookData.RAW[selectedCoin].EUR;
  tradingPairElement.innerHTML = "";

  // Display asks
  const askPrice = asks.ASK;
  const askQuantity = 1;
  const askTotal = askPrice * askQuantity;

  const askElement = document.createElement("div");
  askElement.classList.add("order-book__selector-row");
  askElement.innerHTML = `
    <div class="order-book__selector-cell">${askPrice}</div>
    <div class="order-book__selector-cell">${askQuantity}</div>
    <div class="order-book__selector-cell">${askTotal}</div>
  `;
  tradingPairElement.appendChild(askElement);

  // Display bids
  const bidPrice = bids.BID;
  const bidQuantity = 1;
  const bidTotal = bidPrice * bidQuantity;

  const bidElement = document.createElement("div");
  bidElement.classList.add("order-book__selector-row");
  bidElement.innerHTML = `
    <div class="order-book__selector-cell">${bidPrice}</div>
    <div class="order-book__selector-cell">${bidQuantity}</div>
    <div class="order-book__selector-cell">${bidTotal}</div>
  `;
  tradingPairElement.appendChild(bidElement);
}

async function getCandlestickData(symbol) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=60&api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data.Data;
  } catch (error) {
    console.error(error);
  }
}

async function getColumnData(symbol) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=60&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error(error);
  }
}

async function populateCandlestickChart(symbol) {
  const data = await getCandlestickData(symbol);
  const series = [
    {
      name: "candle",
      data: data.map((item) => ({
        x: new Date(item.time * 1000),
        y: [item.open, item.high, item.low, item.close],
      })),
    },
  ];
  var optionsCandlestick = {
    series,
    chart: {
      width: "100%",
      height: 450,
      type: "candlestick",
      id: "candlestick-1",
      group: "synced-charts",
      barWidth: "1px",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "CandleStick Chart - Category X-axis",
      align: "left",
    },
    annotations: {
      xaxis: [
        {
          x: "Oct 06 14:00",
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "#00E396",
            },
            orientation: "horizontal",
            offsetY: 7,
            text: "Annotation Test",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  var chartCandlestick = new ApexCharts(
    document.querySelector("#chart-candlestick"),
    optionsCandlestick
  );
  chartCandlestick.render();
}

async function populateColumnChart(symbol) {
  const data = await getColumnData(symbol);
  const series = [
    {
      name: "Close",
      data: data.map((item) => item.close),
    },
    {
      name: "High",
      data: data.map((item) => item.high),
    },
    {
      name: "Low",
      data: data.map((item) => item.low),
    },
  ];
  var optionsBar = {
    series,
    chart: {
      height: 350,
      width: "100%",
      type: "bar",
      id: "bar-1",
      group: "synced-charts",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%",
        borderRadius: 0,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Column Chart - Category X-axis",
      align: "left",
    },
    annotations: {
      xaxis: [
        {
          x: "Oct 06 14:00",
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "#00E396",
            },
            orientation: "horizontal",
            offsetY: 7,
            text: "Annotation Test",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        show: true,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  var chartBar = new ApexCharts(
    document.querySelector("#chart-bar"),
    optionsBar
  );
  chartBar.render();
}

document.addEventListener("DOMContentLoaded", function () {
  fetchCoins();
  fetchOrderBookData("BTC");
  getTradingPairs();
  populateCandlestickChart("BTC");
  populateColumnChart("BTC");
});
