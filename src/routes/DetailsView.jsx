import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StockCard from "../components/StockCard";
import StockTable from "../StockTable";
import StockDetail from "../components/StockDetail";
import axios from "axios";
import "../App.css";

const DetailsView = () => {
  const { symbol: paramSymbol } = useParams(); // URL param e.g. /details/IBM
  const [symbol, setSymbol] = useState(paramSymbol);
  const [stockMap, setStockMap] = useState(new Map());

  const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;

  const fetchData = async (sym) => {
    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${sym}&interval=1h&apikey=${API_KEY}`
      );
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
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleSymbolUpdate = async (newSymbol) => {
    setSymbol(newSymbol);
    await fetchData(newSymbol);
  };

  useEffect(() => {
    fetchData(symbol);
  }, [symbol]);

  return (
    <div className="app-layout">
      <Sidebar
        symbol={symbol}
        stockMap={stockMap}
        onSymbolUpdate={handleSymbolUpdate}
      />
      <div className="main-content">
        <StockDetail symbol={symbol} />
      </div>
    </div>
  );
};

export default DetailsView;
