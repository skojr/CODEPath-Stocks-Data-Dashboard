import { useState } from "react";
import Stats from "../Stats";

const Sidebar = ({ symbol, stockMap, onSymbolUpdate }) => {
  const [inputValue, setInputValue] = useState("");

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
    return Math.sqrt(variance).toFixed(2);
  };

  const std = getVolatility(stockMap);
  const avgHigh = getAverage(stockMap, "2. high");
  const numOfStocks = stockMap.size;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    onSymbolUpdate(inputValue.toUpperCase());
    setInputValue("");
  };

  return (
    <div className="sidebar">
      <h1>{symbol} Stocks</h1>
      <form onSubmit={handleSubmit} className="symbol-form">
        <input
          type="text"
          placeholder="Enter stock symbol"
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
  );
};

export default Sidebar;
