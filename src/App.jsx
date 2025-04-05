import { useEffect, useState } from "react";
import "./App.css";
import StockTable from "./StockTable";
import Stats from "./Stats";
import axios from "axios";
// import { mockStockMap } from "./mockStockData";

function App() {
  const [stockMap, setStockMap] = useState(new Map());
  const [inputValue, setInputValue] = useState("");
  const [symbol, setSymbol] = useState("IBM");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `https://api.twelvedata.com/time_series?apikey=${API_KEY}&interval=1h&symbol=${symbol}&country=US&type=stock&timezone=utc`;

  const getAverage = (map, key) => {
    const entries = Array.from(map.values());

    if (entries.length === 0) return 0;

    const sum = entries.reduce((acc, data) => acc + parseFloat(data[key]), 0);
    return (sum / entries.length).toFixed(2);
  };

  const getVolatility = (map) => {
    const closes = Array.from(map.values()).map((d) =>
      parseFloat(d["4. close"])
    );
    const mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    const variance =
      closes.reduce((sum, price) => sum + (price - mean) ** 2, 0) /
      closes.length;
    const stdDev = Math.sqrt(variance);
    return stdDev.toFixed(2);
  };

  // Get stats
  const std = getVolatility(stockMap);
  const avgHigh = getAverage(stockMap, "2. high");
  const numOfStocks = stockMap.size;

  const fetchData = async (symbolToFetch) => {
    try {
      const URL = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1h&apikey=${API_KEY}`;
      const response = await axios.get(URL);
      const values = response.data.values;

      if (values) {
        const dataMap = new Map(
          values.map((entry) => [
            entry.datetime,
            {
              "1. open": entry.open,
              "2. high": entry.high,
              "3. low": entry.low,
              "4. close": entry.close,
              "5. volume": entry.volume,
            },
          ])
        );
        setStockMap(dataMap);
      } else {
        console.error("Stock data not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const updateSymbol = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    const newSymbol = inputValue.toUpperCase();
    setSymbol(newSymbol);
    await fetchData(newSymbol);
    setInputValue("");
  };

  useEffect(() => {
    fetchData().catch(console.error);
    setStockMap(stockMap);
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>{symbol} Stocks</h1>

        <form onSubmit={updateSymbol} className="symbol-form">
          <input
            type="text"
            placeholder="Enter stock symbol (e.g. AAPL)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          />
          <button type="submit">Update</button>
        </form>

        <Stats
          symbol={symbol}
          stockMap={stockMap}
          std={std}
          avgHigh={avgHigh}
          numOfStocks={numOfStocks}
        />
      </div>

      {/* Main content */}
      <div className="main-content">
        <StockTable
          stockMap={stockMap}
          std={std}
          avgHigh={avgHigh}
          numOfStocks={numOfStocks}
        />
      </div>
    </div>
  );
}

export default App;
