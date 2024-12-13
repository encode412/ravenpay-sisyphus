import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart = ({ symbol }) => {
  const API_KEY =
    "9334a902e0cc9d0ff49c91e2321677dc46bedb2db84907f44cae60fb547edd80";

  useEffect(() => {
    populateCandlestickChart(symbol);
    populateColumnChart(symbol);
  }, [symbol]);
  console.log(symbol);
  
  const getCandlestickData = async (symbol) => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=60&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.Data;
    } catch (error) {
      console.error(error);
    }
  };

  const getColumnData = async (symbol) => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=60&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.Data;
    } catch (error) {
      console.error(error);
    }
  };

  const populateCandlestickChart = async (symbol) => {
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
    const optionsCandlestick = {
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
    const chartCandlestick = new ApexCharts(
      document.querySelector("#chart-candlestick"),
      optionsCandlestick
    );
    chartCandlestick.render();
  };

  const populateColumnChart = async (symbol) => {
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
    const optionsBar = {
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
  };
  return (
    <div class="chart-section">
      <div id="synced-charts" class="synced-charts" style={{ width: '100%'}}>
        <div id="chart-candlestick"></div>
        <div id="chart-bar"></div>
      </div>
    </div>
  );
};

export default Chart;
