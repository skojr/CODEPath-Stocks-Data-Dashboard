import { useState } from "react";
import "./App.css";

const StockTable = ({ stockMap, std, avgHigh, numOfStocks }) => {
  const [minHigh, setMinHigh] = useState(0);

  return (
    <div>
      <h2 className="stock-table-title">
        Number of Stocks: {numOfStocks} | Average High: ${avgHigh} | Volatility:
        ${std}
      </h2>

      <div className="filter-row">
        <label>
          Filter By Min High Price:
          <input
            type="number"
            value={minHigh}
            onChange={(e) => setMinHigh(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(stockMap.entries())
            .filter(([_, data]) => parseFloat(data["2. high"]) > minHigh)
            .map(([timestamp, data]) => (
              <tr key={timestamp}>
                <td>{timestamp}</td>
                <td>{data["1. open"]}</td>
                <td>{data["2. high"]}</td>
                <td>{data["3. low"]}</td>
                <td>{data["4. close"]}</td>
                <td>{data["5. volume"]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
